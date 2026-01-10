import { Module } from '@nestjs/common';
import { AmortizacaoModule } from './amortizacao/amortizacao.module';
import { AposentadoriaModule } from './aposentadoria/aposentadoria.module';
import { CombustivelModule } from './combustivel/combustivel.module';
import { ComparadorAssinaturaCarroModule } from './comparador-assinatura-carro/comparador-assinatura-carro.module';
import { ComparadorMaquininhaModule } from './comparador-maquininha/comparador-maquininha.module';
import { ContasDigitaisModule } from './contas-digitais/contas-digitais.module';
import { EmprestimoModule } from './emprestimo/emprestimo.module';
import { FinanciamentoImovelModule } from './financiamento-imovel/financiamento-imovel.module';
import { FinanciamentoVeiculosModule } from './financiamento-veiculos/financiamento-veiculos.module';
import { InvestimentosModule } from './investimentos/investimentos.module';
import { JurosCompostosModule } from './juros-composts/juros-compostos.module';
import { RendaFixaModule } from './renda-fixa/renda-fixa.module';
import { TaxaMaquininhaModule } from './taxa-maquininha/taxa-maquininha.module';
import { SimulatorMetadataModule } from './metadata/simulator-metadata.module';
import { SimulatorResolverModule } from './resolver/simulator-resolver.module';

@Module({
  imports: [
    SimulatorMetadataModule,
    SimulatorResolverModule,
    AmortizacaoModule,
    AposentadoriaModule,
    CombustivelModule,
    ComparadorAssinaturaCarroModule,
    ComparadorMaquininhaModule,
    ContasDigitaisModule,
    EmprestimoModule,
    FinanciamentoImovelModule,
    FinanciamentoVeiculosModule,
    InvestimentosModule,
    JurosCompostosModule,
    RendaFixaModule,
    TaxaMaquininhaModule,
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class SimuladoresModule {}
