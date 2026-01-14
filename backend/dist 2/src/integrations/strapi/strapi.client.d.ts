import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { StrapiResponse, StrapiSingleResponse } from './strapi.types';
export declare class StrapiClient {
    private readonly http;
    private readonly configService;
    private readonly logger;
    private readonly apiUrl;
    private readonly apiToken;
    constructor(http: HttpService, configService: ConfigService);
    private getHeaders;
    get<T>(endpoint: string, params?: Record<string, any>): Promise<StrapiResponse<T> | StrapiSingleResponse<T>>;
    private handleError;
}
