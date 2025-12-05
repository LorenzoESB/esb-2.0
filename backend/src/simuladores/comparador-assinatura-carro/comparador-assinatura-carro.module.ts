import { Module } from '@nestjs/common';
import { ComparadorAssinaturaCarroController } from './comparador-assinatura-carro.controller';
import { ComparadorAssinaturaCarroService } from './comparador-assinatura-carro.service';

/**
 * Módulo de comparação entre compra, financiamento e assinatura de veículos
 *
 * Fornece análise comparativa incluindo:
 * - Custos de propriedade (manutenção, IPVA, seguro, licenciamento)
 * - Depreciação do veículo
 * - Custo de oportunidade do capital
 * - Custos de financiamento (juros, IOF)
 * - Custos de assinatura com reajuste anual
 */
@Module({
  controllers: [ComparadorAssinaturaCarroController],
  providers: [ComparadorAssinaturaCarroService],
  exports: [ComparadorAssinaturaCarroService],
})
export class ComparadorAssinaturaCarroModule {}
