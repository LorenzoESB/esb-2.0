
import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { StrapiClient } from './strapi.client';
import {
  StrapiArticle,
  StrapiCategory,
  StrapiComment,
  StrapiPage,
  StrapiResponse,
  StrapiSimulator,
  StrapiSingleResponse,
} from './strapi.types';
import { ArticleAdapter, CategoryAdapter, PageAdapter, WordPressPost, WordPressCategory } from './adapters/content.adapter';
import { CommentAdapter, WordPressComment } from './adapters/comment.adapter';
import { SimulatorAdapter } from './adapters/simulator.adapter';

@Injectable()
export class StrapiService {
  private readonly logger = new Logger(StrapiService.name);

  constructor(private readonly client: StrapiClient) {}

  async getPosts(options: {
    page?: number;
    perPage?: number;
    search?: string;
    categoryId?: number;
  }): Promise<{ posts: WordPressPost[]; total: number; totalPages: number }> {
    const { page = 1, perPage = 10, search, categoryId } = options;

    const params: any = {
      'pagination[page]': page,
      'pagination[pageSize]': perPage,
      sort: ['publishedAt:desc'],
      populate: {
        author: true,
        featuredImage: true,
        categories: true,
        seo: true,
        aeoBlocks: {
          populate: '*', // For components within dynamic zone, often need full populate or specific deep populate
        },
      },
    };

    if (search) {
      params['filters[$or][0][title][$containsi]'] = search;
      params['filters[$or][1][content][$containsi]'] = search;
      params['filters[$or][2][excerpt][$containsi]'] = search;
    }

    if (categoryId) {
        // Assuming the frontend sends the 'originalId' or 'id' that matches what is in Strapi.
        // If we are migrating, we might check both 'id' and 'originalId' if needed, 
        // but typically relation filtering uses the internal ID. 
        // If the frontend sends an ID that corresponds to 'originalId', we might need to find the internal ID first or filter by originalId.
        // Let's assume for now we filter by the relation's ID or originalId field in the category.
        
        // Try filtering by relation's internal ID first (standard Strapi)
        // params['filters[categories][id][$eq]'] = categoryId;
        
        // OR if the ID passed is actually the 'originalId' from WP:
         params['filters[categories][originalId][$eq]'] = categoryId;
         // Note: If both exist, this might be ambiguous. 
         // Given the migration context, matching originalId is safer if we are keeping WP IDs in frontend.
    }

    const response = await this.client.get<StrapiArticle>('/articles', params) as StrapiResponse<StrapiArticle>;

    const posts = response.data.map((item) => ArticleAdapter.toWordPress(item));
    const { total, pageCount } = response.meta.pagination;

    return {
      posts,
      total,
      totalPages: pageCount,
    };
  }

  async getPostBySlug(slug: string): Promise<WordPressPost> {
    const params = {
      'filters[slug][$eq]': slug,
      populate: {
        author: true,
        featuredImage: true,
        categories: true,
        seo: true,
        aeoBlocks: {
            populate: '*'
        },
        comments: {
            populate: '*'
        }
      },
    };

    const response = await this.client.get<StrapiArticle>('/articles', params) as StrapiResponse<StrapiArticle>;

    if (!response.data || response.data.length === 0) {
      throw new NotFoundException(`Post with slug ${slug} not found`);
    }

    return ArticleAdapter.toWordPress(response.data[0]);
  }

  async getCategories(): Promise<WordPressCategory[]> {
    const params = {
      'pagination[pageSize]': 100,
      populate: ['seo', 'parent'], // minimal populate
    };

    const response = await this.client.get<StrapiCategory>('/categories', params) as StrapiResponse<StrapiCategory>;
    
    // Filter out unwanted categories if needed, similar to existing service
    const banned = new Set([
      'teste_ad', 'sem categoria', 'uncategorized', // ... same list as before
    ]);

    return response.data
      .map((item) => CategoryAdapter.toWordPress(item))
      .filter(c => !banned.has(c.name.toLowerCase()) && !banned.has(c.slug.toLowerCase()));
  }

  async getPageBySlug(slug: string): Promise<WordPressPost> {
    const params = {
      'filters[slug][$eq]': slug,
      populate: {
        seo: true,
        aeoBlocks: {
            populate: '*'
        }
      },
    };

    const response = await this.client.get<StrapiPage>('/pages', params) as StrapiResponse<StrapiPage>;

    if (!response.data || response.data.length === 0) {
      throw new NotFoundException(`Page with slug ${slug} not found`);
    }

    return PageAdapter.toWordPress(response.data[0]);
  }

  async getComments(articleId: number): Promise<WordPressComment[]> {
      // Assuming articleId is the internal ID. 
      const params = {
          'filters[article][id][$eq]': articleId,
          'filters[status][$eq]': 'approved', // Only approved comments
           populate: ['parent'],
      };

      const response = await this.client.get<StrapiComment>('/comments', params) as StrapiResponse<StrapiComment>;
      return response.data.map(item => CommentAdapter.toWordPress(item));
  }
  
  async getSimulatorMetadata(slug: string) {
      const params = {
          'filters[slug][$eq]': slug,
          populate: ['seo', 'aeoBlocks']
      };
      
      const response = await this.client.get<StrapiSimulator>('/simulators', params) as StrapiResponse<StrapiSimulator>;
      
      if (!response.data || response.data.length === 0) {
          return null;
      }
      
      return SimulatorAdapter.toDomain(response.data[0]);
  }

  async getSimulatorsByType(type: string) {
      const params = {
          'filters[type][$eq]': type,
          populate: ['seo', 'aeoBlocks']
      };
      
      const response = await this.client.get<StrapiSimulator>('/simulators', params) as StrapiResponse<StrapiSimulator>;
      return response.data.map(item => SimulatorAdapter.toDomain(item));
  }
}
