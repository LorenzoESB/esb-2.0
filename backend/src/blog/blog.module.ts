import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { BlogController } from './blog.controller';
import { BlogService } from './blog.service';
import { ContentModule } from '../content/content.module';

@Module({
  imports: [
    ConfigModule,
    HttpModule.register({
      timeout: 10000,
    }),
    ContentModule,
  ],
  controllers: [BlogController],
  providers: [BlogService],
})
export class BlogModule {}
