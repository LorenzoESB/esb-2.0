import { Module } from '@nestjs/common';
import { InvestimentosController } from './investimentos.controller';
import { InvestimentosService } from './investimentos.service';

@Module({
  imports: [],
  controllers: [InvestimentosController],
  providers: [InvestimentosService],
  exports: [InvestimentosService],
})
export class InvestimentosModule {}
