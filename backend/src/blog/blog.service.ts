import { HttpService } from '@nestjs/axios';
import {
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AxiosError, AxiosResponse } from 'axios';
import { lastValueFrom } from 'rxjs';

import {
  BlogCategoryDto,
  BlogMediaDto,
  BlogPostListResponseDto,
} from './dto/blog-response.dto';
import { GetPostsQueryDto } from './dto/get-posts-query.dto';

@Injectable()
export class BlogService {
  private readonly logger = new Logger(BlogService.name);
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
    const url = `${this.apiUrl}${path}`;
    try {
      const response = await lastValueFrom(
        this.http.get<T>(url, {
          params,
          validateStatus: () => true,
        }),
      );

      if (response.status >= 400) {
        this.logger.warn(
          `WordPress responded ${response.status} ${response.statusText} for ${url}`,
        );
        throw new HttpException(
          `WordPress request failed: ${response.status} ${response.statusText}`,
          HttpStatus.BAD_GATEWAY,
        );
      }

      return response;
    } catch (error) {
      const axiosError = error as AxiosError;
      const status = axiosError.response?.status;
      const statusText = axiosError.response?.statusText;
      const message =
        status && statusText
          ? `WordPress request failed: ${status} ${statusText}`
          : 'WordPress request failed';

      this.logger.error(
        `Error calling WordPress: ${message} - ${(error as Error).message}`,
      );

      if (error instanceof HttpException) {
        throw error;
      }

      throw new HttpException(message, HttpStatus.BAD_GATEWAY);
    }
  }

  async getPosts(options: GetPostsQueryDto): Promise<BlogPostListResponseDto> {
    const perPage =
      options.perPage && options.perPage > 0 ? options.perPage : 10;
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
    const totalPosts = parseInt(
      (res.headers['x-wp-total'] as string) || '0',
      10,
    );

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

  async getCategories(): Promise<BlogCategoryDto[]> {
    const res = await this.request<BlogCategoryDto[]>('/categories');
    return res.data;
  }

  async getMedia(): Promise<BlogMediaDto[]> {
    const res = await this.request<BlogMediaDto[]>('/media');
    return res.data;
  }
}
