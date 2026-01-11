
import { HttpService } from '@nestjs/axios';
import { Injectable, Logger, HttpException, HttpStatus } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AxiosError, AxiosResponse } from 'axios';
import { lastValueFrom } from 'rxjs';
import { StrapiResponse, StrapiSingleResponse } from './strapi.types';

@Injectable()
export class StrapiClient {
  private readonly logger = new Logger(StrapiClient.name);
  private readonly apiUrl: string;
  private readonly apiToken: string;

  constructor(
    private readonly http: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.apiUrl = this.configService.get<string>('STRAPI_API_URL') || 'http://localhost:1337/api';
    this.apiToken = this.configService.get<string>('STRAPI_API_TOKEN') || '';

    if (!this.apiToken) {
      this.logger.warn('STRAPI_API_TOKEN is not set. Requests may fail if authentication is required.');
    }
  }

  private getHeaders() {
    return {
      Authorization: `Bearer ${this.apiToken}`,
      'Content-Type': 'application/json',
    };
  }

  async get<T>(endpoint: string, params: Record<string, any> = {}): Promise<StrapiResponse<T> | StrapiSingleResponse<T>> {
    const url = `${this.apiUrl}${endpoint}`;
    
    try {
      const response = await lastValueFrom(
        this.http.get(url, {
          headers: this.getHeaders(),
          params,
        }),
      );
      return response.data;
    } catch (error) {
      this.handleError(error, endpoint);
      throw error; // Should be unreachable due to handleError throwing
    }
  }

  private handleError(error: any, endpoint: string) {
    if (error instanceof AxiosError) {
      const status = error.response?.status;
      const data = error.response?.data;
      this.logger.error(
        `Strapi Request Failed [${endpoint}]: ${status} - ${JSON.stringify(data)}`,
      );
      
      throw new HttpException(
        data?.error?.message || 'Error communicating with Strapi',
        status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    
    this.logger.error(`Strapi Request Error [${endpoint}]: ${error.message}`);
    throw new HttpException('Internal Server Error', HttpStatus.INTERNAL_SERVER_ERROR);
  }
}
