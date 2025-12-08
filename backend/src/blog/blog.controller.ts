import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Logger,
  Param,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BlogService } from './blog.service';
import {
  BlogCategoryDto,
  BlogMediaDto,
  BlogPostListResponseDto,
} from './dto/blog-response.dto';
import { GetPostsQueryDto } from './dto/get-posts-query.dto';

@ApiTags('Blog')
@Controller('blog')
export class BlogController {
  private readonly logger = new Logger(BlogController.name);

  constructor(private readonly blogService: BlogService) {}

  @Get('posts')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Get blog posts',
    description:
      'Proxies WordPress posts with pagination, search, category filtering, and embedded resources.',
  })
  @ApiQuery({ name: 'perPage', required: false, type: Number })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'search', required: false, type: String })
  @ApiQuery({ name: 'categoryId', required: false, type: Number })
  @ApiResponse({
    status: 200,
    description: 'Posts retrieved successfully',
    type: BlogPostListResponseDto,
  })
  async getPosts(
    @Query(new ValidationPipe({ transform: true, whitelist: true }))
    query: GetPostsQueryDto,
  ): Promise<BlogPostListResponseDto> {
    this.logger.log(
      `Fetching posts page=${query.page ?? 1} perPage=${query.perPage ?? 10} search="${query.search ?? ''}" categoryId=${query.categoryId ?? 'none'}`,
    );
    return this.blogService.getPosts(query);
  }

  @Get('posts/:slug')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get a single post by slug' })
  getPostBySlug(@Param('slug') slug: string) {
    this.logger.log(`Fetching post by slug ${slug}`);
    return this.blogService.getPostBySlug(slug);
  }

  @Get('pages/:slug')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get a static page by slug' })
  getPageBySlug(@Param('slug') slug: string) {
    this.logger.log(`Fetching page by slug ${slug}`);
    return this.blogService.getPageBySlug(slug);
  }

  @Get('categories')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'List categories' })
  @ApiResponse({
    status: 200,
    description: 'Categories retrieved successfully',
    type: [BlogCategoryDto],
  })
  getCategories(): Promise<BlogCategoryDto[]> {
    this.logger.log('Fetching categories');
    return this.blogService.getCategories();
  }

  @Get('media')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'List media items' })
  @ApiResponse({
    status: 200,
    description: 'Media retrieved successfully',
    type: [BlogMediaDto],
  })
  getMedia(): Promise<BlogMediaDto[]> {
    this.logger.log('Fetching media');
    return this.blogService.getMedia();
  }
}
