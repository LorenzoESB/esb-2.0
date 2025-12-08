import { Controller, Get, Param, Query } from '@nestjs/common';
import { BlogService } from './blog.service';

@Controller('blog')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @Get('posts')
  async getPosts(
    @Query('perPage') perPage?: string,
    @Query('page') page?: string,
    @Query('search') search?: string,
    @Query('categoryId') categoryId?: string,
  ) {
    return this.blogService.getPosts({
      perPage: perPage ? Number(perPage) : undefined,
      page: page ? Number(page) : undefined,
      search,
      categoryId: categoryId ? Number(categoryId) : undefined,
    });
  }

  @Get('posts/:slug')
  getPostBySlug(@Param('slug') slug: string) {
    return this.blogService.getPostBySlug(slug);
  }

  @Get('pages/:slug')
  getPageBySlug(@Param('slug') slug: string) {
    return this.blogService.getPageBySlug(slug);
  }

  @Get('categories')
  getCategories() {
    return this.blogService.getCategories();
  }

  @Get('media')
  getMedia() {
    return this.blogService.getMedia();
  }
}
