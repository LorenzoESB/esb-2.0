import { StrapiService } from '../integrations/strapi/strapi.service';
export declare class CommentService {
    private readonly strapiService;
    constructor(strapiService: StrapiService);
    getCommentsByArticleId(articleId: number): Promise<import("../integrations/strapi/adapters/comment.adapter").WordPressComment[]>;
}
