import { StrapiComment } from '../strapi.types';
export interface WordPressComment {
    id: number;
    post: number;
    parent: number;
    author: number;
    author_name: string;
    author_email: string;
    author_url: string;
    date: string;
    content: {
        rendered: string;
    };
    link: string;
    status: string;
    type: string;
    is_author_reply?: boolean;
}
export declare class CommentAdapter {
    static toWordPress(item: {
        id: number;
        attributes: StrapiComment;
    }): WordPressComment;
}
