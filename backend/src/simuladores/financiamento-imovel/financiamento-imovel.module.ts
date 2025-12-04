import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { FinanciamentoImovelController } from './financiamento-imovel.controller';
import { FinanciamentoImovelService } from './financiamento-imovel.service';
import { TaxasFinanciamentoData } from './data/taxas-financiamento.data';

/**
 * Módulo de simulação de financiamento imobiliário
 *
 * Fornece simulações de financiamento usando:
 * - Sistema SAC (Sistema de Amortização Constante)
 * - Taxas TR-indexed do Banco Central
 * - Cálculos de comprometimento de renda
 */
@Module({
  imports: [
    HttpModule.register({
      timeout: 5000, // 5 seconds default timeout
      maxRedirects: 5,
    }),
  ],
  controllers: [FinanciamentoImovelController],
  providers: [FinanciamentoImovelService, TaxasFinanciamentoData],
  exports: [FinanciamentoImovelService],
})
export class FinanciamentoImovelModule {}
