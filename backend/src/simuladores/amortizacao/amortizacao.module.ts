import { Module } from '@nestjs/common';
import { AmortizacaoController } from './amortizacao.controller';
import { AmortizacaoService } from './amortizacao.service';

@Module({
  controllers: [AmortizacaoController],
  providers: [AmortizacaoService],
  exports: [AmortizacaoService],
})
export class AmortizacaoModule {}
