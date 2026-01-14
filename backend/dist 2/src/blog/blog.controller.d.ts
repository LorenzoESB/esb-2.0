import { BlogService } from './blog.service';
import { BlogCategoryDto, BlogMediaDto, BlogPostListResponseDto } from './dto/blog-response.dto';
import { GetPostsQueryDto } from './dto/get-posts-query.dto';
export declare class BlogController {
    private readonly blogService;
    private readonly logger;
    constructor(blogService: BlogService);
    getPosts(query: GetPostsQueryDto): Promise<BlogPostListResponseDto>;
    getPostBySlug(slug: string): Promise<any>;
    getPageBySlug(slug: string): Promise<any>;
    getCategories(): Promise<BlogCategoryDto[]>;
    getMedia(): Promise<BlogMediaDto[]>;
}
