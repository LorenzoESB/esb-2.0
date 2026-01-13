import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { FinanciamentoImovelController } from './financiamento-imovel.controller';
import { FinanciamentoImovelService } from './financiamento-imovel.service';
import { PrismaModule } from '../../prisma/prisma.module';
import { TaxasFinanciamentoData } from './data/taxas-financiamento.data';
import { SimulatorMetadataModule } from '../metadata/simulator-metadata.module';
import { SimulatorRegistryModule } from '../registry/simulator-registry.module';
import { EmailModule } from '../../email/email.module';

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
    PrismaModule,
    SimulatorMetadataModule,
    SimulatorRegistryModule,
    EmailModule,
  ],
  controllers: [FinanciamentoImovelController],
  providers: [FinanciamentoImovelService, TaxasFinanciamentoData],
  exports: [FinanciamentoImovelService],
})
export class FinanciamentoImovelModule {}
