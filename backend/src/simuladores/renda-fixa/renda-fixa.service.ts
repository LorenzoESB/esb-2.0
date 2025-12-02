import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { AxiosResponse } from 'axios';
import Decimal from 'decimal.js';
import { SimularRendaFixaDto } from './dto/simular-renda-fixa.dto';
import {
  ResultadoRendaFixaDto,
  ResultadoModalidadeDto,
} from './dto/resultado-renda-fixa.dto';
import {
  InvestimentoOfertaDto,
  OfertaTesouroDto,
} from './dto/investimento-oferta.dto';
import {
  calcularInvestimentosRendaFixa,
  InvestimentosRendaFixa,
} from './calc/renda-fixa.calc';
import { PrismaService } from '../../prisma/prisma.service';
import { SimulatorType } from 'generated/prisma';
import {
  RendaFixaApiClient,
  OfertaInvestimento,
  OfertaTesouro,
} from './clients/renda-fixa-api.client';

/**
 * Interface para resposta da API do Banco Central
 */
interface BancoCentralApiResponse {
  data: string;
  valor: string;
}

@Injectable()
export class RendaFixaService {
  private readonly logger = new Logger(RendaFixaService.name);

  constructor(
    private readonly httpService: HttpService,
    private readonly prisma: PrismaService,
    private readonly rendaFixaApiClient: RendaFixaApiClient,
  ) {}

  /**
   * Simula investimentos em renda fixa comparando diferentes modalidades
   *
   * Compara:
   * - Poupança (isenta de IR)
   * - Tesouro Direto Selic (com IR)
   * - LCI - 90% CDI (isenta de IR)
   * - CDB - 110% CDI (com IR)
   *
   * @param dto - Dados da simulação
   * @returns Resultado comparativo entre as modalidades
   */
  async simular(dto: SimularRendaFixaDto): Promise<ResultadoRendaFixaDto> {
    try {
      this.logger.log('Starting fixed income simulation');
      this.logger.debug(`Input: ${JSON.stringify(dto)}`);

      // Buscar taxas atualizadas das APIs do Banco Central
      const [selicAnual, cdiAnual, trMensal] = await Promise.all([
        this.obterSelicAtual(),
        this.obterCdiAtual(),
        this.obterTrMensal(),
      ]);

      this.logger.debug(
        `Economic rates: Selic=${selicAnual}%, CDI=${cdiAnual}%, TR=${trMensal}`,
      );

      // Realizar os cálculos
      const aporteMensal = dto.aporteMensal ?? 0;
      const resultados = calcularInvestimentosRendaFixa(
        dto.investimentoInicial,
        aporteMensal,
        dto.prazoMeses,
        selicAnual,
        cdiAnual,
        trMensal,
      );

      // Formatar resultado
      const resultado = this.formatarResultado(
        resultados,
        dto.investimentoInicial,
        aporteMensal,
        dto.prazoMeses,
        trMensal,
      );

      this.logger.log('Fixed income simulation completed successfully');
      this.logger.debug(`Best investment: ${resultado.melhorInvestimento}`);

      // Buscar ofertas detalhadas da API externa
      try {
        const ofertas = await this.buscarOfertasDetalhadas(
          dto.investimentoInicial,
          dto.prazoMeses,
          resultado.melhorInvestimento,
        );
        resultado.ofertasDetalhadas = ofertas;
      } catch (error) {
        this.logger.warn(
          'Failed to fetch detailed offers, continuing without them',
          error.message,
        );
        // Continue sem ofertas - não é crítico
      }

      // Salvar simulação no banco
      await this.salvarSimulacao(dto, resultado);

      return resultado;
    } catch (error) {
      this.logger.error('Error in fixed income simulation', error.stack);
      throw error;
    }
  }

  /**
   * Busca ofertas detalhadas de investimento da API externa
   *
   * @param investimento - Valor do investimento
   * @param prazoMeses - Prazo em meses
   * @param melhorInvestimento - Tipo do melhor investimento
   * @returns Lista de ofertas formatadas
   */
  private async buscarOfertasDetalhadas(
    investimento: number,
    prazoMeses: number,
    melhorInvestimento: string,
  ): Promise<InvestimentoOfertaDto[] | OfertaTesouroDto[]> {
    this.logger.debug(
      `Fetching detailed offers for ${melhorInvestimento}: investimento=${investimento}, prazo=${prazoMeses}`,
    );

    const apiResponse = await this.rendaFixaApiClient.consultarOfertas(
      investimento,
      prazoMeses,
    );

    if (!this.rendaFixaApiClient.hasValidOffers(apiResponse)) {
      this.logger.warn('No valid offers returned from API');
      return [];
    }

    const ofertas = apiResponse.resultados.listamelhortitulo;

    // Verificar se é oferta de Tesouro/SELIC ou CDB/LCI
    if (melhorInvestimento === 'Tesouro Direto' || melhorInvestimento === 'SELIC') {
      return this.transformarOfertasTesouro(ofertas as OfertaTesouro[]);
    } else {
      return this.transformarOfertasInvestimento(ofertas as OfertaInvestimento[]);
    }
  }

  /**
   * Transforma ofertas de CDB/LCI para DTO
   */
  private transformarOfertasInvestimento(
    ofertas: OfertaInvestimento[],
  ): InvestimentoOfertaDto[] {
    return ofertas.map((oferta) => ({
      corretora: oferta.corretora,
      emissor: oferta.emissor,
      taxa: oferta.taxa,
      vencimento: oferta.vencimento,
      qtdMinima: oferta.qtdMinima,
      vl: oferta.vl,
    }));
  }

  /**
   * Transforma ofertas de Tesouro Direto/SELIC para DTO
   */
  private transformarOfertasTesouro(
    ofertas: OfertaTesouro[],
  ): OfertaTesouroDto[] {
    return ofertas.map((oferta) => ({
      nom: oferta.nom,
      tipo: oferta.tipo,
      tx: oferta.tx,
      data_vencto: oferta.data_vencto,
      vlr: oferta.vlr,
    }));
  }

  /**
   * Obtém a taxa Selic atual da API do Banco Central
   * Série 432 - Meta para Taxa Selic fixada pelo Copom
   */
  private async obterSelicAtual(): Promise<number> {
    try {
      const url =
        'https://api.bcb.gov.br/dados/serie/bcdata.sgs.432/dados/ultimos/1?formato=json';

      const response: AxiosResponse<BancoCentralApiResponse[]> = await firstValueFrom(
        this.httpService.get<BancoCentralApiResponse[]>(url),
      );
      const valorStr = response.data[0]?.valor?.replace(',', '.');

      if (!valorStr) {
        throw new Error('Selic value not found in API response');
      }

      const valor = parseFloat(valorStr);
      this.logger.debug(`Selic obtained from BCB: ${valor}%`);
      return valor;
    } catch (error) {
      this.logger.warn('Failed to fetch Selic from BCB, using fallback', error.message);
      return 13.75; // Fallback
    }
  }

  /**
   * Obtém a taxa CDI atual da API do Banco Central
   * Série 12 - Taxa de juros - CDI
   */
  private async obterCdiAtual(): Promise<number> {
    try {
      const url =
        'https://api.bcb.gov.br/dados/serie/bcdata.sgs.12/dados/ultimos/1?formato=json';

      const response: AxiosResponse<BancoCentralApiResponse[]> = await firstValueFrom(
        this.httpService.get<BancoCentralApiResponse[]>(url),
      );
      const valorStr = response.data[0]?.valor?.replace(',', '.');

      if (!valorStr) {
        throw new Error('CDI value not found in API response');
      }

      // A API retorna CDI diário, precisamos converter para anual
      // Fórmula: ((1 + CDI_diario/100)^252) - 1) * 100
      const cdiDiario = parseFloat(valorStr);
      const cdiAnual = (Math.pow(1 + cdiDiario / 100, 252) - 1) * 100;

      this.logger.debug(`CDI obtained from BCB: ${cdiAnual.toFixed(2)}% (from daily ${cdiDiario}%)`);
      return parseFloat(cdiAnual.toFixed(2));
    } catch (error) {
      this.logger.warn('Failed to fetch CDI from BCB, using fallback', error.message);
      return 13.65; // Fallback
    }
  }

  /**
   * Obtém a taxa TR mensal da API do Banco Central
   * Série 226 - Taxa Referencial - TR
   */
  private async obterTrMensal(): Promise<number> {
    try {
      const url =
        'https://api.bcb.gov.br/dados/serie/bcdata.sgs.226/dados/ultimos/1?formato=json';

      const response: AxiosResponse<BancoCentralApiResponse[]> = await firstValueFrom(
        this.httpService.get<BancoCentralApiResponse[]>(url),
      );
      const valorStr = response.data[0]?.valor?.replace(',', '.');

      if (!valorStr) {
        throw new Error('TR value not found in API response');
      }

      // A API retorna TR em percentual, converter para decimal
      const trPercentual = parseFloat(valorStr);
      const trDecimal = trPercentual / 100;

      this.logger.debug(`TR obtained from BCB: ${trPercentual}% (${trDecimal})`);
      return trDecimal;
    } catch (error) {
      this.logger.warn('Failed to fetch TR from BCB, using fallback', error.message);
      return 0.0; // Fallback (TR tem sido historicamente próxima de zero)
    }
  }

  /**
   * Formata os resultados dos cálculos para o DTO de resposta
   */
  private formatarResultado(
    calculos: InvestimentosRendaFixa,
    investimentoInicial: number,
    aporteMensal: number,
    prazoMeses: number,
    trMensal: number,
  ): ResultadoRendaFixaDto {
    const totalInvestido =
      investimentoInicial + aporteMensal * prazoMeses;

    return {
      poupanca: this.formatarModalidade(
        calculos.poupanca,
        totalInvestido,
      ),
      tesouroDireto: this.formatarModalidade(
        calculos.tesouroDireto,
        totalInvestido,
      ),
      lci: this.formatarModalidade(calculos.lci, totalInvestido),
      cdb: this.formatarModalidade(calculos.cdb, totalInvestido),
      melhorInvestimento: calculos.melhorInvestimento,
      melhorRendimento: this.arredondar(calculos.melhorRendimento),
      totalInvestido: this.arredondar(totalInvestido),
      taxaSelic: this.arredondar(calculos.taxaSelic),
      taxaCdi: this.arredondar(calculos.taxaCdi),
      taxaTr: this.arredondar(trMensal),
    };
  }

  /**
   * Formata uma modalidade específica de investimento
   */
  private formatarModalidade(
    modalidade: {
      taxa: Decimal;
      resultado: Decimal;
      imposto: Decimal;
    },
    totalInvestido: number,
  ): ResultadoModalidadeDto {
    const resultado = this.arredondar(modalidade.resultado);
    const rendimentoLiquido = resultado - totalInvestido;
    const percentualRendimento =
      totalInvestido > 0 ? (rendimentoLiquido / totalInvestido) * 100 : 0;

    return {
      taxa: this.arredondar(modalidade.taxa),
      resultado,
      imposto: this.arredondar(modalidade.imposto),
      rendimentoLiquido: this.arredondar(rendimentoLiquido),
      percentualRendimento: this.arredondar(percentualRendimento),
    };
  }

  /**
   * Arredonda valores para 2 casas decimais
   */
  private arredondar(valor: number | Decimal): number {
    return new Decimal(valor).toDecimalPlaces(2).toNumber();
  }

  /**
   * Salva a simulação no banco de dados
   */
  private async salvarSimulacao(
    input: SimularRendaFixaDto,
    output: ResultadoRendaFixaDto,
  ): Promise<void> {
    try {
      await this.prisma.simulation.create({
        data: {
          simulatorType: SimulatorType.RENDA_FIXA,
          inputData: JSON.parse(JSON.stringify(input)),
          outputData: JSON.parse(JSON.stringify(output)),
          nome: input.nome,
          email: input.email,
        },
      });

      this.logger.log('Fixed income simulation saved to database');
    } catch (error) {
      this.logger.warn(
        'Failed to save fixed income simulation, continuing',
        error?.stack,
      );
      // Don't throw - simulation should still work even if logging fails
    }
  }
}
