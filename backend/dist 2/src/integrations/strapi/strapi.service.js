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
var StrapiService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.StrapiService = void 0;
const common_1 = require("@nestjs/common");
const strapi_client_1 = require("./strapi.client");
const content_adapter_1 = require("./adapters/content.adapter");
const comment_adapter_1 = require("./adapters/comment.adapter");
const simulator_adapter_1 = require("./adapters/simulator.adapter");
let StrapiService = StrapiService_1 = class StrapiService {
    client;
    logger = new common_1.Logger(StrapiService_1.name);
    constructor(client) {
        this.client = client;
    }
    async getPosts(options) {
        const { page = 1, perPage = 10, search, categoryId } = options;
        const params = {
            'pagination[page]': page,
            'pagination[pageSize]': perPage,
            sort: ['publishedAt:desc'],
            populate: {
                author: true,
                featuredImage: true,
                categories: true,
                seo: true,
                aeoBlocks: {
                    populate: '*',
                },
            },
        };
        if (search) {
            params['filters[$or][0][title][$containsi]'] = search;
            params['filters[$or][1][content][$containsi]'] = search;
            params['filters[$or][2][excerpt][$containsi]'] = search;
        }
        if (categoryId) {
            params['filters[categories][originalId][$eq]'] = categoryId;
        }
        const response = await this.client.get('/articles', params);
        const posts = response.data.map((item) => content_adapter_1.ArticleAdapter.toWordPress(item));
        const { total, pageCount } = response.meta.pagination;
        return {
            posts,
            total,
            totalPages: pageCount,
        };
    }
    async getPostBySlug(slug) {
        const params = {
            'filters[slug][$eq]': slug,
            populate: {
                author: true,
                featuredImage: true,
                categories: true,
                seo: true,
                aeoBlocks: {
                    populate: '*'
                },
                comments: {
                    populate: '*'
                }
            },
        };
        const response = await this.client.get('/articles', params);
        if (!response.data || response.data.length === 0) {
            throw new common_1.NotFoundException(`Post with slug ${slug} not found`);
        }
        return content_adapter_1.ArticleAdapter.toWordPress(response.data[0]);
    }
    async getCategories() {
        const params = {
            'pagination[pageSize]': 100,
            populate: ['seo', 'parent'],
        };
        const response = await this.client.get('/categories', params);
        const banned = new Set([
            'teste_ad', 'sem categoria', 'uncategorized',
        ]);
        return response.data
            .map((item) => content_adapter_1.CategoryAdapter.toWordPress(item))
            .filter(c => !banned.has(c.name.toLowerCase()) && !banned.has(c.slug.toLowerCase()));
    }
    async getPageBySlug(slug) {
        const params = {
            'filters[slug][$eq]': slug,
            populate: {
                seo: true,
                aeoBlocks: {
                    populate: '*'
                }
            },
        };
        const response = await this.client.get('/pages', params);
        if (!response.data || response.data.length === 0) {
            throw new common_1.NotFoundException(`Page with slug ${slug} not found`);
        }
        return content_adapter_1.PageAdapter.toWordPress(response.data[0]);
    }
    async getComments(articleId) {
        const params = {
            'filters[article][id][$eq]': articleId,
            'filters[status][$eq]': 'approved',
            populate: ['parent'],
        };
        const response = await this.client.get('/comments', params);
        return response.data.map(item => comment_adapter_1.CommentAdapter.toWordPress(item));
    }
    async getSimulatorMetadata(slug) {
        const params = {
            'filters[slug][$eq]': slug,
            populate: ['seo', 'aeoBlocks']
        };
        const response = await this.client.get('/simulators', params);
        if (!response.data || response.data.length === 0) {
            return null;
        }
        return simulator_adapter_1.SimulatorAdapter.toDomain(response.data[0]);
    }
    async getSimulatorsByType(type) {
        const params = {
            'filters[type][$eq]': type,
            populate: ['seo', 'aeoBlocks']
        };
        const response = await this.client.get('/simulators', params);
        return response.data.map(item => simulator_adapter_1.SimulatorAdapter.toDomain(item));
    }
};
exports.StrapiService = StrapiService;
exports.StrapiService = StrapiService = StrapiService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [strapi_client_1.StrapiClient])
], StrapiService);
//# sourceMappingURL=strapi.service.js.map