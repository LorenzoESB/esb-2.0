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
var StrapiClient_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.StrapiClient = void 0;
const axios_1 = require("@nestjs/axios");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const axios_2 = require("axios");
const rxjs_1 = require("rxjs");
let StrapiClient = StrapiClient_1 = class StrapiClient {
    http;
    configService;
    logger = new common_1.Logger(StrapiClient_1.name);
    apiUrl;
    apiToken;
    constructor(http, configService) {
        this.http = http;
        this.configService = configService;
        this.apiUrl = this.configService.get('STRAPI_API_URL') || 'http://localhost:1337/api';
        this.apiToken = this.configService.get('STRAPI_API_TOKEN') || '';
        if (!this.apiToken) {
            this.logger.warn('STRAPI_API_TOKEN is not set. Requests may fail if authentication is required.');
        }
    }
    getHeaders() {
        return {
            Authorization: `Bearer ${this.apiToken}`,
            'Content-Type': 'application/json',
        };
    }
    async get(endpoint, params = {}) {
        const url = `${this.apiUrl}${endpoint}`;
        try {
            const response = await (0, rxjs_1.lastValueFrom)(this.http.get(url, {
                headers: this.getHeaders(),
                params,
            }));
            return response.data;
        }
        catch (error) {
            this.handleError(error, endpoint);
            throw error;
        }
    }
    handleError(error, endpoint) {
        if (error instanceof axios_2.AxiosError) {
            const status = error.response?.status;
            const data = error.response?.data;
            this.logger.error(`Strapi Request Failed [${endpoint}]: ${status} - ${JSON.stringify(data)}`);
            throw new common_1.HttpException(data?.error?.message || 'Error communicating with Strapi', status || common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
        this.logger.error(`Strapi Request Error [${endpoint}]: ${error.message}`);
        throw new common_1.HttpException('Internal Server Error', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
    }
};
exports.StrapiClient = StrapiClient;
exports.StrapiClient = StrapiClient = StrapiClient_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [axios_1.HttpService,
        config_1.ConfigService])
], StrapiClient);
//# sourceMappingURL=strapi.client.js.map