import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { RendaFixaController } from './renda-fixa.controller';
import { RendaFixaService } from './renda-fixa.service';
import { RendaFixaApiClient } from './clients/renda-fixa-api.client';

@Module({
  imports: [
    HttpModule.register({
      timeout: 5000, // 5 seconds default timeout
      maxRedirects: 5,
    }),
  ],
  controllers: [RendaFixaController],
  providers: [RendaFixaService, RendaFixaApiClient],
  exports: [RendaFixaService],
})
export class RendaFixaModule {}
