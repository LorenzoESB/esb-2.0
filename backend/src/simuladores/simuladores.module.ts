import { Module } from '@nestjs/common';
import { AmortizacaoModule } from './amortizacao/amortizacao.module';
import { EmprestimoModule } from './emprestimo/emprestimo.module';
import { InvestimentosModule } from './investimentos/investimentos.module';
import { JurosCompostosModule } from './juros-composts/juros-compostos.module';

@Module({
  imports: [
    InvestimentosModule,
    EmprestimoModule,
    AmortizacaoModule,
    JurosCompostosModule,
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class SimuladoresModule {}
