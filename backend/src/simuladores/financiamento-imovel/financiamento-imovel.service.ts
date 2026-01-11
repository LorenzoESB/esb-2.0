import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { SimulatorType } from '@prisma/client';
import { SimularFinanciamentoImovelDto } from './dto/simular-financiamento-imovel.dto';
import { ResultadoFinanciamentoImovelDto } from './dto/resultado-financiamento-imovel.dto';
import { calcularFinanciamentoSAC } from './calc/financiamento-imovel.calc';
import {
  TaxasFinanciamentoData,
  TaxaFinanciamentoImovel,
} from './data/taxas-financiamento.data';
import { SimulatorMetadataService } from '../metadata/simulator-metadata.service';
import { ISimulatorStrategy } from '../interfaces/simulator-strategy.interface';
import { SimulatorRegistry } from '../registry/simulator.registry';

@Injectable()
export class FinanciamentoImovelService implements ISimulatorStrategy, OnModuleInit {
  private readonly logger = new Logger(FinanciamentoImovelService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly taxasFinanciamentoData: TaxasFinanciamentoData,
    private readonly metadataService: SimulatorMetadataService,
    private readonly registry: SimulatorRegistry,
  ) {}

  onModuleInit() {
    this.registry.register(this);
  }

  getSimulatorType(): string {
    return 'real-estate-financing'; // Must match Strapi type/slug
  }

  async execute(input: any, metadata?: any): Promise<any> {
    return this.simular(input, metadata);
  }

  /**
   * Simula ofertas de financiamento imobiliário usando sistema SAC
   *
   * Processo:
   * 1. Valida entrada (valor entrada deve ser menor que valor do imóvel)
   * 2. Busca taxas atualizadas do Banco Central (TR-indexed)
   * 3. Calcula valor a ser financiado (imóvel - entrada)
   * 4. Para cada taxa disponível:
   *    - Calcula primeira parcela (maior no SAC)
   *    - Calcula última parcela (menor no SAC)
   *    - Calcula total a pagar
   *    - Calcula comprometimento de renda
   * 5. Ordena por primeira parcela (menor para maior)
   * 6. Salva simulação no banco de dados
   *
   * @param dto - Dados da simulação de financiamento
   * @param metadata - Metadados opcionais
   * @returns Lista de ofertas disponíveis ordenadas
   */
  async simular(
    dto: SimularFinanciamentoImovelDto,
    metadata?: any,
  ): Promise<ResultadoFinanciamentoImovelDto[]> {
    try {
      this.logger.log('Starting real estate financing simulation');
      this.logger.debug(`Input: ${JSON.stringify(dto)}`);

      // Validar entrada
      this.validarDados(dto);

      // Calcular valor a ser financiado
      const valorFinanciado = dto.valorImovel - dto.valorEntrada;
      this.logger.debug(
        `Financing amount: R$ ${valorFinanciado.toFixed(2)} (Property: R$ ${dto.valorImovel.toFixed(2)}, Down payment: R$ ${dto.valorEntrada.toFixed(2)})`,
      );

      let taxas: TaxaFinanciamentoImovel[] = [];

      // Check metadata first
      const params = metadata;
      if (params) {
        if (params.realEstateRates && Array.isArray(params.realEstateRates) && params.realEstateRates.length > 0) {
           taxas = params.realEstateRates;
           this.logger.debug(`Using ${taxas.length} rates from metadata`);
        } else if (params.rates && Array.isArray(params.rates) && params.rates.length > 0) {
             taxas = params.rates.filter((r: any) => r.type === 'real_estate' || !r.type);
        }
      } else {
        // Fallback fetch
        const fetchedMetadata = await this.metadataService.getMetadataByType('financing');
        if (fetchedMetadata && fetchedMetadata.length > 0 && fetchedMetadata[0].attributes.parameters) {
            const fetchedParams = fetchedMetadata[0].attributes.parameters;
            if (fetchedParams.realEstateRates && Array.isArray(fetchedParams.realEstateRates) && fetchedParams.realEstateRates.length > 0) {
               taxas = fetchedParams.realEstateRates;
            } else if (fetchedParams.rates && Array.isArray(fetchedParams.rates) && fetchedParams.rates.length > 0) {
                 taxas = fetchedParams.rates.filter((r: any) => r.type === 'real_estate' || !r.type);
            }
        }
      }

      if (taxas.length === 0) {
        // Buscar taxas atualizadas do Banco Central (com fallback automático)
        taxas = await this.taxasFinanciamentoData.obterTaxasImovel();
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
      this.logger.error(
        'Error in real estate financing simulation',
        error.stack,
      );
      throw error;
    }
  }

  /**
   * Valida os dados de entrada da simulação
   *
   * Regras de validação:
   * - Valor da entrada deve ser menor que valor do imóvel
   * - Valor financiado deve ser maior que zero
   * - Renda mensal deve ser maior que zero
   *
   * @param dto - Dados da simulação
   * @throws Error se alguma validação falhar
   */
  private validarDados(dto: SimularFinanciamentoImovelDto): void {
    if (dto.valorEntrada >= dto.valorImovel) {
      throw new Error('Down payment must be less than property value');
    }

    const valorFinanciado = dto.valorImovel - dto.valorEntrada;
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
   * @returns Lista de ofertas calculadas e ordenadas por primeira parcela
   */
  private calcularOfertas(
    taxas: TaxaFinanciamentoImovel[],
    valorFinanciado: number,
    prazoMeses: number,
    rendaMensal: number,
  ): ResultadoFinanciamentoImovelDto[] {
    const ofertas: ResultadoFinanciamentoImovelDto[] = [];

    for (const taxa of taxas) {
      try {
        // Calcular todos os valores do financiamento usando SAC
        const calculo = calcularFinanciamentoSAC(
          valorFinanciado,
          prazoMeses,
          taxa.taxaJurosAnual,
          rendaMensal,
        );

        // Criar oferta
        const oferta: ResultadoFinanciamentoImovelDto = {
          nomeBanco: taxa.instituicaoFinanceira,
          modalidade: taxa.modalidade,
          parcelaInicial: calculo.parcelaInicial,
          parcelaFinal: calculo.parcelaFinal,
          valorTotal: calculo.valorTotal,
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

    // Ordenar por primeira parcela (menor para maior)
    ofertas.sort((a, b) => a.parcelaInicial - b.parcelaInicial);

    return ofertas;
  }

  /**
   * Salva a simulação no banco de dados
   *
   * @param dto - Dados de entrada da simulação
   * @param ofertas - Ofertas calculadas
   */
  private async salvarSimulacao(
    dto: SimularFinanciamentoImovelDto,
    ofertas: ResultadoFinanciamentoImovelDto[],
  ): Promise<void> {
    try {
      const melhorOferta = ofertas[0];

      await this.prisma.simulation.create({
        data: {
          simulatorType: SimulatorType.FINANCIAMENTO_IMOVEL,
          nome: dto.nome,
          email: dto.email,
          inputData: {
            valorImovel: dto.valorImovel,
            valorEntrada: dto.valorEntrada,
            prazoMeses: dto.prazoMeses,
            rendaMensal: dto.rendaMensal,
          },
          outputData: {
            totalOfertas: ofertas.length,
            melhorOferta: melhorOferta
              ? {
                  nomeBanco: melhorOferta.nomeBanco,
                  modalidade: melhorOferta.modalidade,
                  parcelaInicial: melhorOferta.parcelaInicial,
                  parcelaFinal: melhorOferta.parcelaFinal,
                  valorTotal: melhorOferta.valorTotal,
                  taxaJurosAnual: melhorOferta.taxaJurosAnual,
                  taxaJurosMensal: melhorOferta.taxaJurosMensal,
                  comprometimentoRenda: melhorOferta.comprometimentoRenda,
                }
              : null,
            ofertas: ofertas.slice(0, 10).map((o) => ({
              nomeBanco: o.nomeBanco,
              modalidade: o.modalidade,
              parcelaInicial: o.parcelaInicial,
              parcelaFinal: o.parcelaFinal,
              valorTotal: o.valorTotal,
              taxaJurosAnual: o.taxaJurosAnual,
              taxaJurosMensal: o.taxaJurosMensal,
              comprometimentoRenda: o.comprometimentoRenda,
            })),
          },
        },
      });

      this.logger.log(
        `Simulation saved successfully for ${dto.email} (Property: R$ ${dto.valorImovel})`,
      );
    } catch (error) {
      // Não falhar a simulação se o salvamento falhar
      this.logger.error('Failed to save simulation to database', error.stack);
    }
  }
}
