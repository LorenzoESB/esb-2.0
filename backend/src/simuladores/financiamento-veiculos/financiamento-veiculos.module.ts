import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { FinanciamentoVeiculosController } from './financiamento-veiculos.controller';
import { FinanciamentoVeiculosService } from './financiamento-veiculos.service';
import { PrismaModule } from '../../prisma/prisma.module';
import { TaxasVeiculosData } from './data/taxas-veiculos.data';
import { SimulatorMetadataModule } from '../metadata/simulator-metadata.module';
import { SimulatorRegistryModule } from '../registry/simulator-registry.module';

/**
 * Módulo de simulação de financiamento de veículos
 *
 * Fornece simulações de financiamento usando:
 * - Sistema PRICE (Sistema Francês - parcelas fixas)
 * - Taxas do Banco Central
 * - Cálculo de IOF (Imposto sobre Operações Financeiras)
 * - Cálculos de comprometimento de renda
 */
@Module({
  imports: [
    PrismaModule,
    HttpModule.register({
      timeout: 5000, // 5 seconds default timeout
      maxRedirects: 5,
    }),
    SimulatorMetadataModule,
    SimulatorRegistryModule,
  ],
  controllers: [FinanciamentoVeiculosController],
  providers: [FinanciamentoVeiculosService, TaxasVeiculosData],
  exports: [FinanciamentoVeiculosService],
})
export class FinanciamentoVeiculosModule {}
