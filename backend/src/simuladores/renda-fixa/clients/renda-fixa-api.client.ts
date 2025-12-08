import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { AxiosResponse } from 'axios';

/**
 * Interface para payload de requisição à API de Renda Fixa
 */
export interface RendaFixaApiRequestPayload {
  valor: string;
  dc: string; // dias corridos (days)
  tipo: string[];
  indexador: string;
  corretora: string;
}

/**
 * Interface para uma oferta individual de investimento (CDB/LCI)
 */
export interface OfertaInvestimento {
  corretora: string;
  emissor: string;
  taxa: string;
  vencimento: string;
  qtdMinima: number;
  vl: number;
}

/**
 * Interface para oferta de Tesouro Direto/SELIC
 */
export interface OfertaTesouro {
  nom: string;
  tipo: string;
  tx: number;
  data_vencto: string;
  vlr: number;
}

/**
 * Interface para resposta da API de Renda Fixa
 */
export interface RendaFixaApiResponse {
  resultados: {
    CDB?: any;
    LCI?: any;
    SELIC?: any;
    POUP?: any;
    CDI?: number;
    cdi?: number;
    melhor_titulo: string; // 'CDB' | 'LCI' | 'SELIC' | 'POUP'
    listamelhortitulo: OfertaInvestimento[] | OfertaTesouro[];
  };
}

/**
 * Mapeamento entre nomes dos investimentos no sistema e nomes da API
 */
export const INVESTMENT_TYPE_MAP: Record<string, string> = {
  Poupança: 'POUP',
  'Tesouro Direto': 'SELIC',
  LCI: 'LCI',
  CDB: 'CDB',
};

/**
 * Mapeamento reverso: da API para o sistema
 */
export const API_TO_SYSTEM_MAP: Record<string, string> = {
  POUP: 'Poupança',
  SELIC: 'Tesouro Direto',
  LCI: 'LCI',
  CDB: 'CDB',
};

/**
 * Cliente para integração com API externa de ofertas de investimento
 * API: https://api2.apprendafixa.com.br
 */
@Injectable()
export class RendaFixaApiClient {
  private readonly logger = new Logger(RendaFixaApiClient.name);
  private readonly API_URL =
    'https://api2.apprendafixa.com.br/vx/educando/get_investments';

  constructor(private readonly httpService: HttpService) {}

  /**
   * Consulta ofertas de investimento da API externa
   *
   * @param investimento - Valor do investimento inicial
   * @param prazoMeses - Prazo em meses
   * @returns Resposta com ofertas de investimento
   */
  async consultarOfertas(
    investimento: number,
    prazoMeses: number,
  ): Promise<RendaFixaApiResponse> {
    try {
      // Converter meses para dias (fórmula exata do legacy)
      // Legacy: prazoDias = (prazo * 30) + floor(prazo/12) * 6
      const prazoDias = prazoMeses * 30 + Math.floor(prazoMeses / 12) * 6;

      const payload: RendaFixaApiRequestPayload = {
        valor: investimento.toString(),
        dc: prazoDias.toString(),
        tipo: ['CDB', 'LCI', 'SELIC'],
        indexador: 'CDI',
        corretora: '', // Vazio = todas as corretoras
      };

      this.logger.debug(
        `Fetching investment offers: valor=${investimento}, prazo=${prazoDias} dias`,
      );

      const response: AxiosResponse<RendaFixaApiResponse> =
        await firstValueFrom(
          this.httpService.post<RendaFixaApiResponse>(this.API_URL, payload, {
            headers: { 'Content-Type': 'application/json' },
            timeout: 5000, // 5 seconds timeout
          }),
        );

      this.logger.log(
        `Successfully fetched ${response.data.resultados.listamelhortitulo?.length || 0} investment offers`,
      );

      return response.data;
    } catch (error) {
      this.logger.error(
        'Failed to fetch investment offers from external API',
        error.stack,
      );
      throw error;
    }
  }

  /**
   * Verifica se a resposta da API contém ofertas válidas
   */
  hasValidOffers(response: RendaFixaApiResponse): boolean {
    return (
      response?.resultados?.listamelhortitulo &&
      Array.isArray(response.resultados.listamelhortitulo) &&
      response.resultados.listamelhortitulo.length > 0
    );
  }
}
