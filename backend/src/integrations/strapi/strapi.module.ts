
import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { StrapiClient } from './strapi.client';
import { StrapiService } from './strapi.service';

@Module({
  imports: [HttpModule, ConfigModule],
  providers: [StrapiClient, StrapiService],
  exports: [StrapiService],
})
export class StrapiModule {}
