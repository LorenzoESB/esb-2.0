"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var BlogController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const blog_service_1 = require("./blog.service");
const blog_response_dto_1 = require("./dto/blog-response.dto");
const get_posts_query_dto_1 = require("./dto/get-posts-query.dto");
let BlogController = BlogController_1 = class BlogController {
    blogService;
    logger = new common_1.Logger(BlogController_1.name);
    constructor(blogService) {
        this.blogService = blogService;
    }
    async getPosts(query) {
        this.logger.log(`Fetching posts page=${query.page ?? 1} perPage=${query.perPage ?? 10} search="${query.search ?? ''}" categoryId=${query.categoryId ?? 'none'}`);
        return this.blogService.getPosts(query);
    }
    getPostBySlug(slug) {
        this.logger.log(`Fetching post by slug ${slug}`);
        return this.blogService.getPostBySlug(slug);
    }
    getPageBySlug(slug) {
        this.logger.log(`Fetching page by slug ${slug}`);
        return this.blogService.getPageBySlug(slug);
    }
    getCategories() {
        this.logger.log('Fetching categories');
        return this.blogService.getCategories();
    }
    getMedia() {
        this.logger.log('Fetching media');
        return this.blogService.getMedia();
    }
};
exports.BlogController = BlogController;
__decorate([
    (0, common_1.Get)('posts'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({
        summary: 'Get blog posts',
        description: 'Proxies WordPress posts with pagination, search, category filtering, and embedded resources.',
    }),
    (0, swagger_1.ApiQuery)({ name: 'perPage', required: false, type: Number }),
    (0, swagger_1.ApiQuery)({ name: 'page', required: false, type: Number }),
    (0, swagger_1.ApiQuery)({ name: 'search', required: false, type: String }),
    (0, swagger_1.ApiQuery)({ name: 'categoryId', required: false, type: Number }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Posts retrieved successfully',
        type: blog_response_dto_1.BlogPostListResponseDto,
    }),
    __param(0, (0, common_1.Query)(new common_1.ValidationPipe({ transform: true, whitelist: true }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [get_posts_query_dto_1.GetPostsQueryDto]),
    __metadata("design:returntype", Promise)
], BlogController.prototype, "getPosts", null);
__decorate([
    (0, common_1.Get)('posts/:slug'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Get a single post by slug' }),
    __param(0, (0, common_1.Param)('slug')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], BlogController.prototype, "getPostBySlug", null);
__decorate([
    (0, common_1.Get)('pages/:slug'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Get a static page by slug' }),
    __param(0, (0, common_1.Param)('slug')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], BlogController.prototype, "getPageBySlug", null);
__decorate([
    (0, common_1.Get)('categories'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'List categories' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Categories retrieved successfully',
        type: [blog_response_dto_1.BlogCategoryDto],
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BlogController.prototype, "getCategories", null);
__decorate([
    (0, common_1.Get)('media'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'List media items' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Media retrieved successfully',
        type: [blog_response_dto_1.BlogMediaDto],
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BlogController.prototype, "getMedia", null);
exports.BlogController = BlogController = BlogController_1 = __decorate([
    (0, swagger_1.ApiTags)('Blog'),
    (0, common_1.Controller)('blog'),
    __metadata("design:paramtypes", [blog_service_1.BlogService])
], BlogController);
//# sourceMappingURL=blog.controller.js.map