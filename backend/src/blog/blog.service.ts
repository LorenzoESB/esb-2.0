import { HttpService } from '@nestjs/axios';
import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AxiosResponse } from 'axios';
import { lastValueFrom } from 'rxjs';

type PostsResponse = {
  posts: any[];
  totalPages: number;
  totalPosts: number;
};

@Injectable()
export class BlogService {
  private readonly apiUrl: string;

  constructor(
    private readonly http: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.apiUrl = this.configService.get<string>('WORDPRESS_API_URL') || '';
    if (!this.apiUrl) {
      throw new Error('WORDPRESS_API_URL is not set');
    }
  }

  private async request<T = any>(
    path: string,
    params?: Record<string, any>,
  ): Promise<AxiosResponse<T>> {
    const response = await lastValueFrom(
      this.http.get<T>(`${this.apiUrl}${path}`, {
        params,
        validateStatus: () => true,
      }),
    );

    if (response.status >= 400) {
      throw new HttpException(
        `WordPress request failed: ${response.status} ${response.statusText}`,
        HttpStatus.BAD_GATEWAY,
      );
    }

    return response;
  }

  async getPosts(options: {
    perPage?: number;
    page?: number;
    search?: string;
    categoryId?: number;
  }): Promise<PostsResponse> {
    const perPage = options.perPage && options.perPage > 0 ? options.perPage : 10;
    const page = options.page && options.page > 0 ? options.page : 1;

    const params: Record<string, any> = {
      _embed: true,
      per_page: perPage,
      page,
    };

    if (options.search) {
      params.search = options.search;
    }
    if (options.categoryId && options.categoryId > 0) {
      params.categories = options.categoryId;
    }

    const res = await this.request<any[]>('/posts', params);

    const totalPages = parseInt(
      (res.headers['x-wp-totalpages'] as string) || '1',
      10,
    );
    const totalPosts = parseInt((res.headers['x-wp-total'] as string) || '0', 10);

    return {
      posts: res.data,
      totalPages,
      totalPosts,
    };
  }

  async getPostBySlug(slug: string) {
    const res = await this.request<any[]>('/posts', {
      slug,
      _embed: true,
    });

    const post = res.data?.[0];
    if (!post) {
      throw new NotFoundException('Post not found');
    }

    return post;
  }

  async getPageBySlug(slug: string) {
    const res = await this.request<any[]>('/pages', {
      slug,
      _embed: true,
    });

    const page = res.data?.[0];
    if (!page) {
      throw new NotFoundException('Page not found');
    }

    return page;
  }

  async getCategories() {
    const res = await this.request<any[]>('/categories');
    return res.data;
  }

  async getMedia() {
    const res = await this.request<any[]>('/media');
    return res.data;
  }
}
