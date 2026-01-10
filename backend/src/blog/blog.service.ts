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
import { ContentService } from '../content/content.service';

@Injectable()
export class BlogService {
  private readonly logger = new Logger(BlogService.name);
  private readonly apiUrl: string;
  private readonly useStrapi: boolean;

  constructor(
    private readonly http: HttpService,
    private readonly configService: ConfigService,
    private readonly contentService: ContentService,
  ) {
    this.useStrapi = this.configService.get<string>('USE_STRAPI') === 'true';
    this.apiUrl = this.configService.get<string>('WORDPRESS_API_URL') || '';
    
    if (!this.useStrapi && !this.apiUrl) {
      this.logger.warn('WORDPRESS_API_URL is not set and USE_STRAPI is false');
    }
  }

  private async request<T = any>(
    path: string,
    params?: Record<string, any>,
  ): Promise<AxiosResponse<T>> {
    const url = `${this.apiUrl}${path}`;
    let attempts = 0;
    let lastError: any;
    while (attempts < 2) {
      attempts++;
      try {
        const response = await lastValueFrom(
          this.http.get<T>(url, {
            params,
            timeout: 5000,
            validateStatus: () => true,
          }),
        );

        if (response.status >= 400) {
          this.logger.warn(
            `WordPress responded ${response.status} ${response.statusText} for ${url}`,
          );
          if (response.status === 404) {
            throw new NotFoundException(
              `WordPress request failed: ${response.status} ${response.statusText}`,
            );
          }
          if (response.status >= 500) {
            throw new HttpException(
              `WordPress request failed: ${response.status} ${response.statusText}`,
              HttpStatus.BAD_GATEWAY,
            );
          }
          throw new HttpException(
            `WordPress request failed: ${response.status} ${response.statusText}`,
            HttpStatus.BAD_REQUEST,
          );
        }

        return response;
      } catch (error) {
        lastError = error;
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
        if (axiosError.code || (status && status >= 500)) {
          if (attempts < 2) {
            continue;
          }
        }
        if (error instanceof HttpException) {
          throw error;
        }
        throw new HttpException(message, HttpStatus.BAD_GATEWAY);
      }
    }
    throw lastError;
  }

  async getPosts(options: GetPostsQueryDto): Promise<BlogPostListResponseDto> {
    if (this.useStrapi) {
      return this.contentService.getPosts(options);
    }

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

    try {
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
    } catch (error) {
      if (error instanceof HttpException && error.getStatus() === HttpStatus.BAD_REQUEST) {
        return {
          posts: [],
          totalPages: 1,
          totalPosts: 0,
        };
      }
      throw error;
    }
  }

  async getPostBySlug(slug: string) {
    if (this.useStrapi) {
      return this.contentService.getPostBySlug(slug);
    }

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
    if (this.useStrapi) {
      return this.contentService.getPageBySlug(slug);
    }

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
    if (this.useStrapi) {
        const categories = await this.contentService.getCategories();
        return categories.map(c => ({
            id: c.id,
            name: c.name,
            slug: c.slug,
            description: c.description,
            count: c.count,
            link: c.link
        }));
    }

    const res = await this.request<BlogCategoryDto[]>('/categories', {
      per_page: 100,
    });
    const banned = new Set([
      'teste_ad',
      'sem categoria',
      'sem-categoria',
      'uncategorized',
      'ads',
      'ad',
      'advertising',
      'anuncio',
    ]);
    return (res.data || []).filter((c: any) => {
      const name = String(c?.name || '').toLowerCase().trim();
      const slug = String(c?.slug || '').toLowerCase().trim();
      const count = Number(c?.count || 0);
      if (count <= 0) return false;
      if (banned.has(name)) return false;
      if (banned.has(slug)) return false;
      return true;
    });
  }

  async getMedia(): Promise<BlogMediaDto[]> {
    if (this.useStrapi) {
        // Strapi implementation doesn't return media list yet, returning empty or could throw
        return [];
    }

    const res = await this.request<BlogMediaDto[]>('/media');
    return res.data;
  }
}
