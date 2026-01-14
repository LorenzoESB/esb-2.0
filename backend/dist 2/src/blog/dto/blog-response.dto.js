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
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogMediaDto = exports.BlogCategoryDto = exports.BlogPostListResponseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class BlogPostListResponseDto {
    posts;
    totalPages;
    totalPosts;
}
exports.BlogPostListResponseDto = BlogPostListResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Array of WordPress posts (as returned by the WordPress API)',
        type: [Object],
    }),
    __metadata("design:type", Array)
], BlogPostListResponseDto.prototype, "posts", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Total number of pages available on WordPress',
        example: 12,
    }),
    __metadata("design:type", Number)
], BlogPostListResponseDto.prototype, "totalPages", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Total number of posts available on WordPress',
        example: 234,
    }),
    __metadata("design:type", Number)
], BlogPostListResponseDto.prototype, "totalPosts", void 0);
class BlogCategoryDto {
    id;
    name;
    slug;
    description;
    count;
    link;
}
exports.BlogCategoryDto = BlogCategoryDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 12 }),
    __metadata("design:type", Number)
], BlogCategoryDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Investimentos' }),
    __metadata("design:type", String)
], BlogCategoryDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'investimentos' }),
    __metadata("design:type", String)
], BlogCategoryDto.prototype, "slug", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Artigos sobre investimentos' }),
    __metadata("design:type", String)
], BlogCategoryDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 42 }),
    __metadata("design:type", Number)
], BlogCategoryDto.prototype, "count", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'https://educandoseubolso.blog.br/categoria/investimentos',
    }),
    __metadata("design:type", String)
], BlogCategoryDto.prototype, "link", void 0);
class BlogMediaDto {
    id;
    source_url;
    alt_text;
}
exports.BlogMediaDto = BlogMediaDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1234 }),
    __metadata("design:type", Number)
], BlogMediaDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'https://educandoseubolso.blog.br/wp-content/uploads/hero.jpg',
    }),
    __metadata("design:type", String)
], BlogMediaDto.prototype, "source_url", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Hero image' }),
    __metadata("design:type", String)
], BlogMediaDto.prototype, "alt_text", void 0);
//# sourceMappingURL=blog-response.dto.js.map