import { StrapiService } from '../integrations/strapi/strapi.service';
export declare class ContentService {
    private readonly strapiService;
    constructor(strapiService: StrapiService);
    getPosts(options: {
        page?: number;
        perPage?: number;
        search?: string;
        categoryId?: number;
    }): Promise<{
        posts: import("../integrations/strapi/adapters/content.adapter").WordPressPost[];
        total: number;
        totalPages: number;
    }>;
    getPostBySlug(slug: string): Promise<import("../integrations/strapi/adapters/content.adapter").WordPressPost>;
    getPageBySlug(slug: string): Promise<import("../integrations/strapi/adapters/content.adapter").WordPressPost>;
    getCategories(): Promise<import("../integrations/strapi/adapters/content.adapter").WordPressCategory[]>;
    getMedia(): Promise<never[]>;
}
