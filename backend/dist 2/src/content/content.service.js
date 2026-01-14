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
exports.ContentService = void 0;
const common_1 = require("@nestjs/common");
const strapi_service_1 = require("../integrations/strapi/strapi.service");
let ContentService = class ContentService {
    strapiService;
    constructor(strapiService) {
        this.strapiService = strapiService;
    }
    async getPosts(options) {
        return this.strapiService.getPosts(options);
    }
    async getPostBySlug(slug) {
        return this.strapiService.getPostBySlug(slug);
    }
    async getPageBySlug(slug) {
        return this.strapiService.getPageBySlug(slug);
    }
    async getCategories() {
        return this.strapiService.getCategories();
    }
    async getMedia() {
        return [];
    }
};
exports.ContentService = ContentService;
exports.ContentService = ContentService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [strapi_service_1.StrapiService])
], ContentService);
//# sourceMappingURL=content.service.js.map