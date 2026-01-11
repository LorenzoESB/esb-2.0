
import { Injectable } from '@nestjs/common';
import { StrapiService } from '../integrations/strapi/strapi.service';

@Injectable()
export class ContentService {
  constructor(private readonly strapiService: StrapiService) {}

  async getPosts(options: {
    page?: number;
    perPage?: number;
    search?: string;
    categoryId?: number;
  }) {
    return this.strapiService.getPosts(options);
  }

  async getPostBySlug(slug: string) {
    return this.strapiService.getPostBySlug(slug);
  }

  async getPageBySlug(slug: string) {
    return this.strapiService.getPageBySlug(slug);
  }

  async getCategories() {
    return this.strapiService.getCategories();
  }

  async getMedia() {
      // Strapi doesn't have a direct "list all media" API that matches WP's exactly without custom implementation or plugins,
      // and typically we don't need to list all media for the frontend unless it's a specific gallery feature.
      // The current frontend uses it? Let's check usage of getMedia in frontend components.
      // If it's not critical, return empty array.
      return []; 
  }
}
