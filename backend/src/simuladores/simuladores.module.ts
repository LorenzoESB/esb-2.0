import { Module } from '@nestjs/common';
import { AmortizacaoModule } from './amortizacao/amortizacao.module';
import { AposentadoriaModule } from './aposentadoria/aposentadoria.module';
import { CombustivelModule } from './combustivel/combustivel.module';
import { EmprestimoModule } from './emprestimo/emprestimo.module';
import { InvestimentosModule } from './investimentos/investimentos.module';
import { JurosCompostosModule } from './juros-composts/juros-compostos.module';

@Module({
  imports: [
    AmortizacaoModule,
    AposentadoriaModule,
    CombustivelModule,
    EmprestimoModule,
    InvestimentosModule,
    JurosCompostosModule,
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class SimuladoresModule { }
