import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { SimulatorType } from '@prisma/client';
import { SimulatorMetadataService } from '../metadata/simulator-metadata.service';
import { ISimulatorStrategy } from '../interfaces/simulator-strategy.interface';
import { SimulatorRegistry } from '../registry/simulator.registry';
import {
  SimularEmprestimoDto,
  TipoPessoa,
  TipoEmprego,
} from './dto/simular-emprestimo.dto';
import {
  ResultadoEmprestimoDto,
  OfertaEmprestimoDto,
} from './dto/resultado-emprestimo.dto';
import {
  calcularEmprestimoPRICE,
  calcularComprometimentoRenda,
  arredondar2Decimais,
} from './calc/emprestimo.calc';
import {
  TAXAS_PF,
  TAXAS_PJ,
  MODALIDADES_EXCLUIDAS_POR_TIPO,
  TaxaEmprestimo,
} from './data/taxas-emprestimo.data';
import { EmailService } from '../../email/email.service';

@Injectable()
export class EmprestimoService implements ISimulatorStrategy, OnModuleInit {
  private readonly logger = new Logger(EmprestimoService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly metadataService: SimulatorMetadataService,
    private readonly registry: SimulatorRegistry,
    private readonly emailService: EmailService,
  ) {}

  onModuleInit() {
    this.registry.register(this);
  }

  getSimulatorType(): string {
    return 'loan'; // Must match Strapi type/slug for loan simulator
  }

  /**
   * Wrapper implementation for generic execution
   */
  async execute(input: any, metadata?: any): Promise<any> {
    // Validate or cast input if necessary. Assuming input matches SimularEmprestimoDto structure.
    // Ideally, validation should happen before, or we use class-transformer/validator here.
    return this.simular(input, metadata);
  }

  /**
   * Simula ofertas de empréstimo pessoal com base nos dados fornecidos
   *
   * Processo:
   * 1. Busca taxas de juros disponíveis (PF ou PJ)
   * 2. Filtra modalidades incompatíveis com o tipo de emprego
   * 3. Calcula parcela, total pago, juros e outras métricas para cada oferta
   * 4. Ordena ofertas pela menor taxa de juros
   * 5. Salva a simulação no banco de dados
   *
   * @param dto - Dados da simulação de empréstimo
   * @param metadata - Metadados opcionais passados diretamente (evita busca redundante)
   * @returns Resultado com todas as ofertas disponíveis
   */
  async simular(dto: SimularEmprestimoDto, metadata?: any): Promise<ResultadoEmprestimoDto> {
    try {
      this.logger.log('Starting personal loan simulation');
      const redactedDto = { ...dto, email: '***', nome: '***' };
      this.logger.debug(`Input: ${JSON.stringify(redactedDto)}`);

      let taxasPf = TAXAS_PF;
      let taxasPj = TAXAS_PJ;
      let modalidadesExcluidas = MODALIDADES_EXCLUIDAS_POR_TIPO;

      // Use provided metadata or fetch if missing (though resolving usually provides it)
      const params = metadata;
      
      if (params) {
        if (params.taxasPf) {
          taxasPf = params.taxasPf;
          this.logger.debug('Using taxasPf from metadata');
        }
        if (params.taxasPj) {
          taxasPj = params.taxasPj;
          this.logger.debug('Using taxasPj from metadata');
        }
        if (params.modalidadesExcluidasPorTipo) {
          modalidadesExcluidas = params.modalidadesExcluidasPorTipo;
          this.logger.debug('Using modalidadesExcluidasPorTipo from metadata');
        }
      } else {
        // Fallback fetch if not provided via execute()
        this.logger.debug('Metadata not provided in arguments, fetching...');
        const fetchedMetadata = await this.metadataService.getMetadataByType('loan');
        if (fetchedMetadata && fetchedMetadata.length > 0 && fetchedMetadata[0].parameters) {
             const fetchedParams = fetchedMetadata[0].parameters;
             if (fetchedParams.taxasPf) taxasPf = fetchedParams.taxasPf;
             if (fetchedParams.taxasPj) taxasPj = fetchedParams.taxasPj;
             if (fetchedParams.modalidadesExcluidasPorTipo) modalidadesExcluidas = fetchedParams.modalidadesExcluidasPorTipo;
         }
      }

      // Buscar taxas de juros apropriadas (PF ou PJ)
      const taxasDisponiveis = this.buscarTaxasDisponiveis(
        dto.tipoPessoa,
        dto.tipoEmprego,
        taxasPf,
        taxasPj,
        modalidadesExcluidas,
      );

      this.logger.debug(
        `Found ${taxasDisponiveis.length} available rates for ${dto.tipoPessoa}`,
      );

      // Calcular ofertas para cada taxa disponível
      const ofertas = this.calcularOfertas(
        taxasDisponiveis,
        dto.valorDesejado,
        dto.prazoMeses,
        dto.renda,
      );

      this.logger.log(
        `Generated ${ofertas.length} loan offers, best rate: ${ofertas[0]?.taxaMensal}%`,
      );

      // Montar resultado
      const resultado: ResultadoEmprestimoDto = {
        ofertas,
        totalOfertas: ofertas.length,
        melhorOferta: ofertas[0], // Já ordenado por menor taxa
        tipoPessoa: dto.tipoPessoa,
        tipoEmprego: dto.tipoEmprego,
        inputData: {
          valorDesejado: dto.valorDesejado,
          prazoMeses: dto.prazoMeses,
          renda: dto.renda,
        },
      };

      // Salvar simulação no banco
      await this.salvarSimulacao(dto, resultado);

      return resultado;
    } catch (error) {
      this.logger.error('Error in personal loan simulation', error.stack);
      throw error;
    }
  }

  /**
   * Busca taxas disponíveis baseado no tipo de pessoa e emprego
   *
   * Para PF com tipo de emprego específico, filtra modalidades incompatíveis:
   * - aposentado: exclui consignado privado e público
   * - clt: exclui consignado INSS e público
   * - servidor_publico: exclui consignado INSS e privado
   *
   * @param tipoPessoa - PF ou PJ
   * @param tipoEmprego - Tipo de emprego (apenas para PF)
   * @param taxasPf - Lista de taxas PF
   * @param taxasPj - Lista de taxas PJ
   * @param modalidadesExcluidasPorTipo - Mapa de modalidades excluídas
   * @returns Lista de taxas disponíveis
   */
  private buscarTaxasDisponiveis(
    tipoPessoa: TipoPessoa,
    tipoEmprego: TipoEmprego | undefined,
    taxasPf: TaxaEmprestimo[],
    taxasPj: TaxaEmprestimo[],
    modalidadesExcluidasPorTipo: Record<string, string[]>,
  ): TaxaEmprestimo[] {
    // Selecionar base de taxas (PF ou PJ)
    const taxasBase =
      tipoPessoa === TipoPessoa.PF
        ? taxasPf.filter((t) => t.ativo)
        : taxasPj.filter((t) => t.ativo);

    // Para PF com tipo de emprego, filtrar modalidades excluídas
    if (tipoPessoa === TipoPessoa.PF && tipoEmprego) {
      const modalidadesExcluidas =
        modalidadesExcluidasPorTipo[tipoEmprego] || [];

      if (modalidadesExcluidas.length > 0) {
        this.logger.debug(
          `Excluding modalities for ${tipoEmprego}: ${modalidadesExcluidas.join(', ')}`,
        );

        return taxasBase.filter(
          (taxa) => !modalidadesExcluidas.includes(taxa.modalidade),
        );
      }
    }

    return taxasBase;
  }

  /**
   * Calcula ofertas de empréstimo para cada taxa disponível
   *
   * @param taxas - Lista de taxas de juros
   * @param valorEmprestimo - Valor desejado do empréstimo
   * @param prazoMeses - Prazo em meses
   * @param renda - Renda mensal (opcional, para calcular comprometimento)
   * @returns Lista de ofertas calculadas e ordenadas por taxa mensal
   */
  private calcularOfertas(
    taxas: TaxaEmprestimo[],
    valorEmprestimo: number,
    prazoMeses: number,
    renda?: number,
  ): OfertaEmprestimoDto[] {
    const ofertas: OfertaEmprestimoDto[] = [];

    for (const taxa of taxas) {
      try {
        // Calcular todos os valores do empréstimo
        const calculo = calcularEmprestimoPRICE(
          valorEmprestimo,
          prazoMeses,
          taxa.taxaMensal,
        );

        // Calcular comprometimento de renda (se renda foi fornecida)
        let comprometimentoRenda: number | undefined;
        if (renda && renda > 0) {
          const comprometimento = calcularComprometimentoRenda(
            calculo.parcelaMensal,
            renda,
          );
          comprometimentoRenda = arredondar2Decimais(comprometimento);
        }

        // Criar oferta
        const oferta: OfertaEmprestimoDto = {
          nomeBanco: taxa.instituicao,
          modalidade: taxa.modalidade,
          valorEmprestimo: calculo.valorEmprestimo,
          prazoMeses: calculo.prazoMeses,
          parcelaMensal: calculo.parcelaMensal,
          taxaMensal: calculo.taxaJurosMensal,
          taxaAnual: calculo.taxaJurosAnual,
          totalPago: calculo.totalPago,
          totalJuros: calculo.totalJuros,
          taxaEfetivaAnual: calculo.taxaEfetivaAnual,
          logo: taxa.logo,
          comprometimentoRenda,
        };

        ofertas.push(oferta);
      } catch (error) {
        this.logger.warn(
          `Failed to calculate offer for ${taxa.instituicao}: ${error.message}`,
        );
        // Continue com as próximas ofertas
      }
    }

    // Ordenar por taxa mensal (menor para maior)
    ofertas.sort((a, b) => a.taxaMensal - b.taxaMensal);

    return ofertas;
  }

  /**
   * Salva a simulação no banco de dados
   *
   * @param dto - Dados de entrada da simulação
   * @param resultado - Resultado calculado
   */
  private async salvarSimulacao(
    dto: SimularEmprestimoDto,
    resultado: ResultadoEmprestimoDto,
  ): Promise<void> {
    try {
      const simulationData = {
        simulatorType: SimulatorType.EMPRESTIMO,
        nome: dto.nome,
        email: dto.email,
        inputData: {
          tipoPessoa: dto.tipoPessoa,
          tipoEmprego: dto.tipoEmprego || null,
          valorDesejado: dto.valorDesejado,
          prazoMeses: dto.prazoMeses,
          renda: dto.renda || null,
          compartilharDados: dto.compartilharDados || true,
          origem: dto.origem || null,
        },
        outputData: {
          totalOfertas: resultado.totalOfertas,
          melhorOferta: {
            nomeBanco: resultado.melhorOferta.nomeBanco,
            modalidade: resultado.melhorOferta.modalidade,
            valorEmprestimo: resultado.melhorOferta.valorEmprestimo,
            prazoMeses: resultado.melhorOferta.prazoMeses,
            parcelaMensal: resultado.melhorOferta.parcelaMensal,
            taxaMensal: resultado.melhorOferta.taxaMensal,
            taxaAnual: resultado.melhorOferta.taxaAnual,
            totalPago: resultado.melhorOferta.totalPago,
            totalJuros: resultado.melhorOferta.totalJuros,
            taxaEfetivaAnual: resultado.melhorOferta.taxaEfetivaAnual,
            comprometimentoRenda:
              resultado.melhorOferta.comprometimentoRenda || null,
          },
          ofertas: resultado.ofertas.slice(0, 10).map((o) => ({
            nomeBanco: o.nomeBanco,
            modalidade: o.modalidade,
            valorEmprestimo: o.valorEmprestimo,
            prazoMeses: o.prazoMeses,
            parcelaMensal: o.parcelaMensal,
            taxaMensal: o.taxaMensal,
            taxaAnual: o.taxaAnual,
            totalPago: o.totalPago,
            totalJuros: o.totalJuros,
            taxaEfetivaAnual: o.taxaEfetivaAnual,
            comprometimentoRenda: o.comprometimentoRenda || null,
          })),
        },
        email_opt_in_simulation: dto.email_opt_in_simulation,
        email_opt_in_content: dto.email_opt_in_content || false,
        email_opt_in_at: dto.email_opt_in_simulation ? new Date() : null,
      };

      await this.prisma.simulation.create({
        data: simulationData,
      });

      if (dto.email_opt_in_simulation) {
        await this.emailService.sendSimulationResult({
          simulationType: SimulatorType.EMPRESTIMO,
          userEmail: dto.email,
          userName: dto.nome,
          input: simulationData.inputData,
          output: simulationData.outputData,
          summary: `Simulação de Empréstimo: ${resultado.totalOfertas} ofertas encontradas. Melhor taxa: ${resultado.melhorOferta.taxaMensal}% a.m.`,
          createdAt: new Date(),
        });
      }

      this.logger.log(
        `Simulation saved successfully for ${dto.email} (${dto.tipoPessoa})`,
      );
    } catch (error) {
      // Não falhar a simulação se o salvamento falhar
      this.logger.error('Failed to save simulation to database', error.stack);
    }
  }
}
