import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { BlogCategoryDto, BlogMediaDto, BlogPostListResponseDto } from './dto/blog-response.dto';
import { GetPostsQueryDto } from './dto/get-posts-query.dto';
import { ContentService } from '../content/content.service';
export declare class BlogService {
    private readonly http;
    private readonly configService;
    private readonly contentService;
    private readonly logger;
    private readonly apiUrl;
    private readonly useStrapi;
    constructor(http: HttpService, configService: ConfigService, contentService: ContentService);
    private request;
    getPosts(options: GetPostsQueryDto): Promise<BlogPostListResponseDto>;
    getPostBySlug(slug: string): Promise<any>;
    getPageBySlug(slug: string): Promise<any>;
    getCategories(): Promise<BlogCategoryDto[]>;
    getMedia(): Promise<BlogMediaDto[]>;
}
