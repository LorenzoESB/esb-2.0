
import { Injectable } from '@nestjs/common';
import { StrapiService } from '../integrations/strapi/strapi.service';

@Injectable()
export class CommentService {
  constructor(private readonly strapiService: StrapiService) {}

  async getCommentsByArticleId(articleId: number) {
    return this.strapiService.getComments(articleId);
  }
}
