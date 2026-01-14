import { StrapiClient } from './strapi.client';
import { WordPressPost, WordPressCategory } from './adapters/content.adapter';
import { WordPressComment } from './adapters/comment.adapter';
export declare class StrapiService {
    private readonly client;
    private readonly logger;
    constructor(client: StrapiClient);
    getPosts(options: {
        page?: number;
        perPage?: number;
        search?: string;
        categoryId?: number;
    }): Promise<{
        posts: WordPressPost[];
        total: number;
        totalPages: number;
    }>;
    getPostBySlug(slug: string): Promise<WordPressPost>;
    getCategories(): Promise<WordPressCategory[]>;
    getPageBySlug(slug: string): Promise<WordPressPost>;
    getComments(articleId: number): Promise<WordPressComment[]>;
    getSimulatorMetadata(slug: string): Promise<{
        id: number;
        title: string;
        slug: string;
        description: string;
        type: "loan" | "investment" | "financing" | "other";
        parameters: any;
        seo: any;
        aeoBlocks: any[];
    } | null>;
    getSimulatorsByType(type: string): Promise<{
        id: number;
        title: string;
        slug: string;
        description: string;
        type: "loan" | "investment" | "financing" | "other";
        parameters: any;
        seo: any;
        aeoBlocks: any[];
    }[]>;
}
