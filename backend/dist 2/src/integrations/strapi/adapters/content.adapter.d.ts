import { StrapiArticle, StrapiCategory, StrapiPage } from '../strapi.types';
export interface WordPressPost {
    id: number;
    date: string;
    slug: string;
    type: string;
    link: string;
    title: {
        rendered: string;
    };
    excerpt: {
        rendered: string;
    };
    content: {
        rendered: string;
    };
    author: number;
    featured_media: number;
    categories: number[];
    _embedded?: {
        author?: Array<{
            id: number;
            name: string;
            description?: string;
            link?: string;
        }>;
        'wp:featuredmedia'?: Array<{
            id: number;
            source_url: string;
            alt_text?: string;
            media_details?: {
                width: number;
                height: number;
                sizes: Record<string, {
                    source_url: string;
                    width: number;
                    height: number;
                }>;
            };
        }>;
        'wp:term'?: Array<Array<{
            id: number;
            name: string;
            slug: string;
            taxonomy: string;
        }>>;
    };
    original_id?: number;
    aeo_blocks?: any[];
    seo?: any;
}
export interface WordPressCategory {
    id: number;
    count: number;
    description: string;
    link: string;
    name: string;
    slug: string;
    taxonomy: 'category';
    parent: number;
}
export declare class ArticleAdapter {
    static toWordPress(item: {
        id: number;
        attributes: StrapiArticle;
    }): WordPressPost;
}
export declare class CategoryAdapter {
    static toWordPress(item: {
        id: number;
        attributes: StrapiCategory;
    }): WordPressCategory;
}
export declare class PageAdapter {
    static toWordPress(item: {
        id: number;
        attributes: StrapiPage;
    }): WordPressPost;
}
export declare class GenericAdapter {
    static toStandard(item: {
        id: number;
        attributes: any;
    }): any;
}
