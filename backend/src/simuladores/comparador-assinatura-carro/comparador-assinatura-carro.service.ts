import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { SimulatorType } from '@prisma/client';
import { SimularComparadorDto } from './dto/simular-comparador.dto';
import {
  ResultadoComparadorDto,
  CenarioComparador,
} from './dto/resultado-comparador.dto';
import { compararCenarios } from './calc/comparador.calc';
import { URLS_REDIRECIONAMENTO } from './constants/comparador.constants';

@Injectable()
export class ComparadorAssinaturaCarroService {
  private readonly logger = new Logger(ComparadorAssinaturaCarroService.name);

  constructor(private readonly prisma: PrismaService) {}

  /**
   * Compara três cenários de aquisição de veículo
   *
   * Processo:
   * 1. Valida entrada
   * 2. Converte tempo de uso de meses para anos
   * 3. Calcula cenário de compra à vista
   * 4. Calcula cenário de financiamento
   * 5. Calcula cenário de assinatura
   * 6. Determina melhor opção (menor custo líquido)
   * 7. Salva simulação no banco de dados
   *
   * @param dto - Dados da simulação de comparação
   * @returns Resultado da comparação com os três cenários
   */
  async simular(dto: SimularComparadorDto): Promise<ResultadoComparadorDto> {
    try {
      this.logger.log('Starting car subscription comparator simulation');
      this.logger.debug(`Input: ${JSON.stringify(dto)}`);

      // Validar entrada
      this.validarDados(dto);

      // Converter tempo de uso de meses para anos
      const tempoUsoAnos = dto.tempoUsoCarroMeses / 12;

      // Executar comparação
      const resultado = compararCenarios(
        dto.valorVeiculo,
        dto.entradaFinanciamento,
        dto.prazoFinanciamentoMeses,
        dto.valorAssinaturaMensal,
        dto.prazoAssinaturaMeses,
        tempoUsoAnos,
      );

      // Formatar resultado
      const resultadoDto: ResultadoComparadorDto = {
        compraVista: this.formatarCenario(resultado.compraVista),
        financiamento: this.formatarCenario(resultado.financiamento),
        assinatura: this.formatarCenario(resultado.assinatura),
        melhorOpcao: resultado.melhorOpcao,
        economiaMaxima: resultado.economiaMaxima,
        periodoAnos: tempoUsoAnos,
        urls: {
          assinatura: URLS_REDIRECIONAMENTO.ASSINATURA_URL,
          financiamento: URLS_REDIRECIONAMENTO.FINANCIAMENTO_URL,
        },
      };

      this.logger.log(
        `Comparison completed. Best option: ${resultado.melhorOpcao}, savings: R$ ${resultado.economiaMaxima.toFixed(2)}`,
      );

      // Salvar simulação no banco
      await this.salvarSimulacao(dto, resultadoDto);

      return resultadoDto;
    } catch (error) {
      this.logger.error(
        'Error in car subscription comparator simulation',
        error.stack,
      );
      throw error;
    }
  }

  /**
   * Valida os dados de entrada da simulação
   *
   * @param dto - Dados da simulação
   * @throws Error se alguma validação falhar
   */
  private validarDados(dto: SimularComparadorDto): void {
    if (dto.valorVeiculo <= 0) {
      throw new Error('Vehicle value must be greater than zero');
    }

    if (dto.entradaFinanciamento >= dto.valorVeiculo) {
      throw new Error('Down payment must be less than vehicle value');
    }

    if (dto.valorAssinaturaMensal <= 0) {
      throw new Error('Subscription cost must be greater than zero');
    }

    if (dto.tempoUsoCarroMeses < 12 || dto.tempoUsoCarroMeses > 60) {
      throw new Error('Car usage time must be between 12 and 60 months');
    }
  }

  /**
   * Formata resultado de cenário para DTO
   *
   * @param cenario - Resultado do cálculo
   * @returns Cenário formatado
   */
  private formatarCenario(cenario: any): CenarioComparador {
    return {
      nome: cenario.nome,
      custoTotal: cenario.custoTotal,
      valorRevenda: cenario.valorRevenda,
      custoLiquido: cenario.custoLiquido,
      breakdown: cenario.breakdown,
    };
  }

  /**
   * Salva a simulação no banco de dados
   *
   * @param dto - Dados de entrada da simulação
   * @param resultado - Resultado da comparação
   */
  private async salvarSimulacao(
    dto: SimularComparadorDto,
    resultado: ResultadoComparadorDto,
  ): Promise<void> {
    try {
      await this.prisma.simulation.create({
        data: {
          simulatorType: SimulatorType.COMPARADOR_ASSINATURA_CARRO,
          nome: dto.nome,
          email: dto.email,
          inputData: {
            valorVeiculo: dto.valorVeiculo,
            entradaFinanciamento: dto.entradaFinanciamento,
            prazoFinanciamentoMeses: dto.prazoFinanciamentoMeses,
            valorAssinaturaMensal: dto.valorAssinaturaMensal,
            prazoAssinaturaMeses: dto.prazoAssinaturaMeses,
            tempoUsoCarroMeses: dto.tempoUsoCarroMeses,
          },
          outputData: {
            melhorOpcao: resultado.melhorOpcao,
            economiaMaxima: resultado.economiaMaxima,
            compraVista: {
              custoTotal: resultado.compraVista.custoTotal,
              custoLiquido: resultado.compraVista.custoLiquido,
              valorRevenda: resultado.compraVista.valorRevenda,
            },
            financiamento: {
              custoTotal: resultado.financiamento.custoTotal,
              custoLiquido: resultado.financiamento.custoLiquido,
              valorRevenda: resultado.financiamento.valorRevenda,
            },
            assinatura: {
              custoTotal: resultado.assinatura.custoTotal,
              custoLiquido: resultado.assinatura.custoLiquido,
              valorRevenda: resultado.assinatura.valorRevenda,
            },
          },
        },
      });

      this.logger.log(
        `Simulation saved successfully for ${dto.email} (Vehicle: R$ ${dto.valorVeiculo})`,
      );
    } catch (error) {
      // Não falhar a simulação se o salvamento falhar
      this.logger.error('Failed to save simulation to database', error.stack);
    }
  }
}
