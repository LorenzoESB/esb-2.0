import { Module } from '@nestjs/common';
import { ContasDigitaisController } from './contas-digitais.controller';
import { ContasDigitaisService } from './contas-digitais.service';
import { ContasDigitaisData } from './data/contas-digitais.data';

/**
 * Módulo de simulação de contas digitais
 *
 * Fornece simulações de comparação de contas digitais brasileiras:
 * - Pessoa Física: Compara contas com base em uso mensal de transações
 * - Pessoa Jurídica: Compara contas PJ incluindo boletos e maquininhas
 * - Calcula tarifa total mensal (mensalidade + transações)
 * - Calcula economia em relação à conta atual
 * - Filtra por funcionalidades requeridas
 */
@Module({
  controllers: [ContasDigitaisController],
  providers: [ContasDigitaisService, ContasDigitaisData],
  exports: [ContasDigitaisService],
})
export class ContasDigitaisModule {}
