import { Module } from '@nestjs/common';
import { AmortizacaoModule } from './amortizacao/amortizacao.module';
import { AposentadoriaModule } from './aposentadoria/aposentadoria.module';
import { CombustivelModule } from './combustivel/combustivel.module';
import { ComparadorAssinaturaCarroModule } from './comparador-assinatura-carro/comparador-assinatura-carro.module';
import { EmprestimoModule } from './emprestimo/emprestimo.module';
import { FinanciamentoImovelModule } from './financiamento-imovel/financiamento-imovel.module';
import { FinanciamentoVeiculosModule } from './financiamento-veiculos/financiamento-veiculos.module';
import { InvestimentosModule } from './investimentos/investimentos.module';
import { JurosCompostosModule } from './juros-composts/juros-compostos.module';
import { RendaFixaModule } from './renda-fixa/renda-fixa.module';

@Module({
  imports: [
    AmortizacaoModule,
    AposentadoriaModule,
    CombustivelModule,
    ComparadorAssinaturaCarroModule,
    EmprestimoModule,
    FinanciamentoImovelModule,
    FinanciamentoVeiculosModule,
    InvestimentosModule,
    JurosCompostosModule,
    RendaFixaModule,
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class SimuladoresModule { }
