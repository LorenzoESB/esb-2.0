
import { Module } from '@nestjs/common';
import { StrapiModule } from '../integrations/strapi/strapi.module';
import { ContentService } from './content.service';
import { CommentService } from './comment.service';

@Module({
  imports: [StrapiModule],
  providers: [ContentService, CommentService],
  exports: [ContentService, CommentService],
})
export class ContentModule {}
