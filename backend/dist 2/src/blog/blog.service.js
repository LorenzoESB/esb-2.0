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
var BlogService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogService = void 0;
const axios_1 = require("@nestjs/axios");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const rxjs_1 = require("rxjs");
const content_service_1 = require("../content/content.service");
let BlogService = BlogService_1 = class BlogService {
    http;
    configService;
    contentService;
    logger = new common_1.Logger(BlogService_1.name);
    apiUrl;
    useStrapi;
    constructor(http, configService, contentService) {
        this.http = http;
        this.configService = configService;
        this.contentService = contentService;
        this.useStrapi = this.configService.get('USE_STRAPI') === 'true';
        this.apiUrl = this.configService.get('WORDPRESS_API_URL') || '';
        if (!this.useStrapi && !this.apiUrl) {
            this.logger.warn('WORDPRESS_API_URL is not set and USE_STRAPI is false');
        }
    }
    async request(path, params) {
        const url = `${this.apiUrl}${path}`;
        let attempts = 0;
        let lastError;
        while (attempts < 2) {
            attempts++;
            try {
                const response = await (0, rxjs_1.lastValueFrom)(this.http.get(url, {
                    params,
                    timeout: 5000,
                    validateStatus: () => true,
                }));
                if (response.status >= 400) {
                    this.logger.warn(`WordPress responded ${response.status} ${response.statusText} for ${url}`);
                    if (response.status === 404) {
                        throw new common_1.NotFoundException(`WordPress request failed: ${response.status} ${response.statusText}`);
                    }
                    if (response.status >= 500) {
                        throw new common_1.HttpException(`WordPress request failed: ${response.status} ${response.statusText}`, common_1.HttpStatus.BAD_GATEWAY);
                    }
                    throw new common_1.HttpException(`WordPress request failed: ${response.status} ${response.statusText}`, common_1.HttpStatus.BAD_REQUEST);
                }
                return response;
            }
            catch (error) {
                lastError = error;
                const axiosError = error;
                const status = axiosError.response?.status;
                const statusText = axiosError.response?.statusText;
                const message = status && statusText
                    ? `WordPress request failed: ${status} ${statusText}`
                    : 'WordPress request failed';
                this.logger.error(`Error calling WordPress: ${message} - ${error.message}`);
                if (axiosError.code || (status && status >= 500)) {
                    if (attempts < 2) {
                        continue;
                    }
                }
                if (error instanceof common_1.HttpException) {
                    throw error;
                }
                throw new common_1.HttpException(message, common_1.HttpStatus.BAD_GATEWAY);
            }
        }
        throw lastError;
    }
    async getPosts(options) {
        if (this.useStrapi) {
            const result = await this.contentService.getPosts(options);
            return {
                posts: result.posts,
                totalPosts: result.total,
                totalPages: result.totalPages,
            };
        }
        const perPage = options.perPage && options.perPage > 0 ? options.perPage : 10;
        const page = options.page && options.page > 0 ? options.page : 1;
        const params = {
            _embed: true,
            per_page: perPage,
            page,
        };
        if (options.search) {
            params.search = options.search;
        }
        if (options.categoryId && options.categoryId > 0) {
            params.categories = options.categoryId;
        }
        try {
            const res = await this.request('/posts', params);
            const totalPages = parseInt(res.headers['x-wp-totalpages'] || '1', 10);
            const totalPosts = parseInt(res.headers['x-wp-total'] || '0', 10);
            return {
                posts: res.data,
                totalPages,
                totalPosts,
            };
        }
        catch (error) {
            if (error instanceof common_1.HttpException && error.getStatus() === common_1.HttpStatus.BAD_REQUEST) {
                return {
                    posts: [],
                    totalPages: 1,
                    totalPosts: 0,
                };
            }
            throw error;
        }
    }
    async getPostBySlug(slug) {
        if (this.useStrapi) {
            return this.contentService.getPostBySlug(slug);
        }
        const res = await this.request('/posts', {
            slug,
            _embed: true,
        });
        const post = res.data?.[0];
        if (!post) {
            throw new common_1.NotFoundException('Post not found');
        }
        return post;
    }
    async getPageBySlug(slug) {
        if (this.useStrapi) {
            return this.contentService.getPageBySlug(slug);
        }
        const res = await this.request('/pages', {
            slug,
            _embed: true,
        });
        const page = res.data?.[0];
        if (!page) {
            throw new common_1.NotFoundException('Page not found');
        }
        return page;
    }
    async getCategories() {
        if (this.useStrapi) {
            const categories = await this.contentService.getCategories();
            return categories.map(c => ({
                id: c.id,
                name: c.name,
                slug: c.slug,
                description: c.description,
                count: c.count,
                link: c.link
            }));
        }
        const res = await this.request('/categories', {
            per_page: 100,
        });
        const banned = new Set([
            'teste_ad',
            'sem categoria',
            'sem-categoria',
            'uncategorized',
            'ads',
            'ad',
            'advertising',
            'anuncio',
        ]);
        return (res.data || []).filter((c) => {
            const name = String(c?.name || '').toLowerCase().trim();
            const slug = String(c?.slug || '').toLowerCase().trim();
            const count = Number(c?.count || 0);
            if (count <= 0)
                return false;
            if (banned.has(name))
                return false;
            if (banned.has(slug))
                return false;
            return true;
        });
    }
    async getMedia() {
        if (this.useStrapi) {
            return [];
        }
        const res = await this.request('/media');
        return res.data;
    }
};
exports.BlogService = BlogService;
exports.BlogService = BlogService = BlogService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [axios_1.HttpService,
        config_1.ConfigService,
        content_service_1.ContentService])
], BlogService);
//# sourceMappingURL=blog.service.js.map