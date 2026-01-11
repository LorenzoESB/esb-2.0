import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { SimulatorType } from '@prisma/client';
import { SimularFinanciamentoVeiculosDto } from './dto/simular-financiamento-veiculos.dto';
import { ResultadoFinanciamentoVeiculosDto } from './dto/resultado-financiamento-veiculos.dto';
import { calcularFinanciamentoPRICE } from './calc/financiamento-veiculos.calc';
import {
  TaxasVeiculosData,
  TaxaFinanciamentoVeiculos,
} from './data/taxas-veiculos.data';
import { SimulatorMetadataService } from '../metadata/simulator-metadata.service';
import { ISimulatorStrategy } from '../interfaces/simulator-strategy.interface';
import { SimulatorRegistry } from '../registry/simulator.registry';

@Injectable()
export class FinanciamentoVeiculosService implements ISimulatorStrategy, OnModuleInit {
  private readonly logger = new Logger(FinanciamentoVeiculosService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly taxasVeiculosData: TaxasVeiculosData,
    private readonly metadataService: SimulatorMetadataService,
    private readonly registry: SimulatorRegistry,
  ) {}

  onModuleInit() {
    this.registry.register(this);
  }

  getSimulatorType(): string {
    return 'vehicle-financing'; // Must match Strapi type/slug
  }

  async execute(input: any, metadata?: any): Promise<any> {
    return this.simular(input, metadata);
  }

  /**
   * Simula ofertas de financiamento de veículos usando sistema PRICE
   *
   * Processo:
   * 1. Valida entrada (valor entrada deve ser menor que valor do veículo)
   * 2. Busca taxas atualizadas do Banco Central (por tipo de veículo)
   * 3. Calcula valor a ser financiado (veículo - entrada)
   * 4. Para cada taxa disponível:
   *    - Calcula parcela mensal fixa (sistema PRICE)
   *    - Calcula IOF (Imposto sobre Operações Financeiras)
   *    - Calcula total a pagar
   *    - Calcula comprometimento de renda
   * 5. Ordena por parcela mensal (menor para maior)
   * 6. Salva simulação no banco de dados
   *
   * @param dto - Dados da simulação de financiamento
   * @param metadata - Metadados opcionais
   * @returns Lista de ofertas disponíveis ordenadas
   */
  async simular(
    dto: SimularFinanciamentoVeiculosDto,
    metadata?: any,
  ): Promise<ResultadoFinanciamentoVeiculosDto[]> {
    try {
      this.logger.log('Starting vehicle financing simulation');
      this.logger.debug(`Input: ${JSON.stringify(dto)}`);

      // Validar entrada
      this.validarDados(dto);

      // Calcular valor a ser financiado
      const valorFinanciado = dto.valorVeiculo - dto.valorEntrada;
      this.logger.debug(
        `Financing amount: R$ ${valorFinanciado.toFixed(2)} (Vehicle: R$ ${dto.valorVeiculo.toFixed(2)}, Down payment: R$ ${dto.valorEntrada.toFixed(2)})`,
      );

      let taxas: TaxaFinanciamentoVeiculos[] = [];

      // Check metadata first
      const params = metadata;
      if (params) {
        if (params.rates && Array.isArray(params.rates) && params.rates.length > 0) {
           const allRates: TaxaFinanciamentoVeiculos[] = params.rates;
           taxas = allRates.filter(r => r.tipoVeiculo === dto.tipoVeiculo);
           this.logger.debug(`Using ${taxas.length} rates from metadata`);
        }
      } else {
        // Fallback fetch
        const fetchedMetadata = await this.metadataService.getMetadataByType('financing');
        if (fetchedMetadata && fetchedMetadata.length > 0 && fetchedMetadata[0].attributes.parameters) {
             const fetchedParams = fetchedMetadata[0].attributes.parameters;
             if (fetchedParams.rates && Array.isArray(fetchedParams.rates) && fetchedParams.rates.length > 0) {
                 const allRates: TaxaFinanciamentoVeiculos[] = fetchedParams.rates;
                 taxas = allRates.filter(r => r.tipoVeiculo === dto.tipoVeiculo);
             }
        }
      }

      // If no rates from metadata, use BCB
      if (taxas.length === 0) {
        // Buscar taxas atualizadas do Banco Central (com fallback automático)
        taxas = await this.taxasVeiculosData.obterTaxasVeiculos(
          dto.tipoVeiculo,
        );
      }

      this.logger.debug(`Found ${taxas.length} financing rates`);

      // Calcular ofertas para cada taxa disponível
      const ofertas = this.calcularOfertas(
        taxas,
        valorFinanciado,
        dto.prazoMeses,
        dto.rendaMensal,
      );

      this.logger.log(
        `Generated ${ofertas.length} financing offers, best rate: ${ofertas[0]?.taxaJurosAnual}% per year`,
      );

      // Salvar simulação no banco
      await this.salvarSimulacao(dto, ofertas);

      return ofertas;
    } catch (error) {
      this.logger.error('Error in vehicle financing simulation', error.stack);
      throw error;
    }
  }

  /**
   * Valida os dados de entrada da simulação
   *
   * Regras de validação:
   * - Valor da entrada deve ser menor que valor do veículo
   * - Valor financiado deve ser maior que zero
   * - Renda mensal deve ser maior que zero
   *
   * @param dto - Dados da simulação
   * @throws Error se alguma validação falhar
   */
  private validarDados(dto: SimularFinanciamentoVeiculosDto): void {
    if (dto.valorEntrada >= dto.valorVeiculo) {
      throw new Error('Down payment must be less than vehicle value');
    }

    const valorFinanciado = dto.valorVeiculo - dto.valorEntrada;
    if (valorFinanciado <= 0) {
      throw new Error('Financing amount must be greater than zero');
    }

    if (dto.rendaMensal <= 0) {
      throw new Error('Monthly income must be greater than zero');
    }

    if (dto.prazoMeses <= 0) {
      throw new Error('Term must be greater than zero months');
    }
  }

  /**
   * Calcula ofertas de financiamento para cada taxa disponível
   *
   * @param taxas - Lista de taxas de juros do BCB
   * @param valorFinanciado - Valor a ser financiado
   * @param prazoMeses - Prazo em meses
   * @param rendaMensal - Renda mensal do solicitante
   * @returns Lista de ofertas calculadas e ordenadas por parcela mensal
   */
  private calcularOfertas(
    taxas: TaxaFinanciamentoVeiculos[],
    valorFinanciado: number,
    prazoMeses: number,
    rendaMensal: number,
  ): ResultadoFinanciamentoVeiculosDto[] {
    const ofertas: ResultadoFinanciamentoVeiculosDto[] = [];

    for (const taxa of taxas) {
      try {
        // Calcular todos os valores do financiamento usando PRICE
        const calculo = calcularFinanciamentoPRICE(
          valorFinanciado,
          prazoMeses,
          taxa.taxaJurosAnual,
          rendaMensal,
        );

        // Criar oferta
        const oferta: ResultadoFinanciamentoVeiculosDto = {
          nomeBanco: taxa.instituicaoFinanceira,
          modalidade: taxa.modalidade,
          parcelaMensal: calculo.parcelaMensal,
          valorTotal: calculo.valorTotal,
          valorIOF: calculo.valorIOF,
          taxaJurosAnual: calculo.taxaJurosAnual,
          taxaJurosMensal: calculo.taxaJurosMensal,
          comprometimentoRenda: calculo.comprometimentoRenda,
          logo: undefined, // Can be added later with bank logo mapping
        };

        ofertas.push(oferta);
      } catch (error) {
        this.logger.warn(
          `Failed to calculate offer for ${taxa.instituicaoFinanceira}: ${error.message}`,
        );
        // Continue com as próximas ofertas
      }
    }

    // Ordenar por parcela mensal (menor para maior)
    ofertas.sort((a, b) => a.parcelaMensal - b.parcelaMensal);

    return ofertas;
  }

  /**
   * Salva a simulação no banco de dados
   *
   * @param dto - Dados de entrada da simulação
   * @param ofertas - Ofertas calculadas
   */
  private async salvarSimulacao(
    dto: SimularFinanciamentoVeiculosDto,
    ofertas: ResultadoFinanciamentoVeiculosDto[],
  ): Promise<void> {
    try {
      const melhorOferta = ofertas[0];

      await this.prisma.simulation.create({
        data: {
          simulatorType: SimulatorType.FINANCIAMENTO_VEICULOS,
          nome: dto.nome,
          email: dto.email,
          inputData: {
            valorVeiculo: dto.valorVeiculo,
            valorEntrada: dto.valorEntrada,
            prazoMeses: dto.prazoMeses,
            rendaMensal: dto.rendaMensal,
            tipoVeiculo: dto.tipoVeiculo,
          },
          outputData: {
            totalOfertas: ofertas.length,
            melhorOferta: melhorOferta
              ? {
                  nomeBanco: melhorOferta.nomeBanco,
                  modalidade: melhorOferta.modalidade,
                  parcelaMensal: melhorOferta.parcelaMensal,
                  valorTotal: melhorOferta.valorTotal,
                  valorIOF: melhorOferta.valorIOF,
                  taxaJurosAnual: melhorOferta.taxaJurosAnual,
                  taxaJurosMensal: melhorOferta.taxaJurosMensal,
                  comprometimentoRenda: melhorOferta.comprometimentoRenda,
                }
              : null,
            ofertas: ofertas.slice(0, 10).map((o) => ({
              nomeBanco: o.nomeBanco,
              modalidade: o.modalidade,
              parcelaMensal: o.parcelaMensal,
              valorTotal: o.valorTotal,
              valorIOF: o.valorIOF,
              taxaJurosAnual: o.taxaJurosAnual,
              taxaJurosMensal: o.taxaJurosMensal,
              comprometimentoRenda: o.comprometimentoRenda,
            })),
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
