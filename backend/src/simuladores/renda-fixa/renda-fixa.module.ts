import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { RendaFixaController } from './renda-fixa.controller';
import { RendaFixaService } from './renda-fixa.service';

@Module({
  imports: [HttpModule],
  controllers: [RendaFixaController],
  providers: [RendaFixaService],
  exports: [RendaFixaService],
})
export class RendaFixaModule {}
