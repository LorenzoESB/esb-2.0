/**
 * taxas-financiamento.data.ts
 *
 * Data client for fetching real estate financing rates from Banco Central API
 * Rates are TR-indexed (Taxa Referencial) post-fixed financing
 */

import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { AxiosResponse } from 'axios';

/**
 * Interface para taxa de financiamento imobiliário
 */
export interface TaxaFinanciamentoImovel {
  instituicaoFinanceira: string;
  taxaJurosMensal: number;
  taxaJurosAnual: number;
  modalidade: string;
  cnpj: string;
}

/**
 * Interface para resposta da API do Banco Central
 * Endpoint: TaxasJurosMensalPorMes
 */
interface BancoCentralTaxaResponse {
  Modalidade: string;
  Instituicao: string;
  TaxaJurosAoMes: number;
  TaxaJurosAoAno: number;
  cnpj8: string;
  anoMes: string;
}

/**
 * Client para obter taxas de financiamento imobiliário do Banco Central
 */
@Injectable()
export class TaxasFinanciamentoData {
  private readonly logger = new Logger(TaxasFinanciamentoData.name);

  // API do Banco Central - OData Service
  private readonly BCB_API_URL =
    'https://olinda.bcb.gov.br/olinda/servico/taxaJuros/versao/v2/odata/TaxasJurosMensalPorMes';

  constructor(private readonly httpService: HttpService) {}

  /**
   * Obtém taxas de financiamento imobiliário do Banco Central
   *
   * Filtra apenas modalidades de:
   * "Financiamento imobiliário com taxas de mercado - Pós-fixado referenciado em TR"
   *
   * Endpoint BCB:
   * https://olinda.bcb.gov.br/olinda/servico/taxaJuros/versao/v2/odata/TaxasJurosMensalPorMes
   *
   * @returns Lista de taxas de financiamento imobiliário por instituição
   */
  async obterTaxasImovel(): Promise<TaxaFinanciamentoImovel[]> {
    try {
      this.logger.log('Fetching real estate financing rates from BCB API');

      // Filtrar apenas financiamento imobiliário TR
      const filter = encodeURIComponent(
        "Modalidade eq 'Financiamento imobiliário com taxas de mercado - Pós-fixado referenciado em TR'",
      );

      // Tentar mês atual primeiro, depois mês anterior
      let taxas: BancoCentralTaxaResponse[] = [];

      for (let monthsBack = 0; monthsBack <= 2; monthsBack++) {
        const mesReferencia = this.obterMesReferencia(monthsBack);

        // Construir URL com filtros
        const url = `${this.BCB_API_URL}?$filter=${filter} and anoMes eq '${mesReferencia}'&$format=json&$orderby=TaxaJurosAoAno asc`;

        this.logger.debug(`Trying BCB API for month ${mesReferencia}: ${url}`);

        const response: AxiosResponse<{ value: BancoCentralTaxaResponse[] }> =
          await firstValueFrom(
            this.httpService.get(url, {
              timeout: 5000, // 5 seconds timeout
            }),
          );

        if (!response.data || !response.data.value) {
          this.logger.warn(`Invalid response from BCB API for month ${mesReferencia}`);
          continue;
        }

        console.log(response.data.value);

        taxas = response.data.value;

        if (taxas.length > 0) {
          this.logger.log(`Found ${taxas.length} rates from BCB API for month ${mesReferencia}`);
          break;
        } else {
          this.logger.warn(`No rates found for month ${mesReferencia}, trying previous month...`);
        }
      }

      if (taxas.length === 0) {
        this.logger.warn('No rates found in current or previous month');
        return this.obterTaxasFallback();
      }

      // Transformar resposta para o formato esperado
      const taxasTransformadas: TaxaFinanciamentoImovel[] = taxas.map(
        (taxa) => ({
          instituicaoFinanceira: taxa.Instituicao,
          taxaJurosMensal: taxa.TaxaJurosAoMes,
          taxaJurosAnual: taxa.TaxaJurosAoAno,
          modalidade: taxa.Modalidade,
          cnpj: taxa.cnpj8,
        }),
      );

      // Filtrar taxas válidas (maiores que 0)
      const taxasValidas = taxasTransformadas.filter(
        (t) => t.taxaJurosAnual > 0 && t.taxaJurosMensal > 0,
      );

      // Se não houver taxas válidas, usar fallback
      if (taxasValidas.length === 0) {
        this.logger.warn('No valid rates returned from BCB API, using fallback rates');
        return this.obterTaxasFallback();
      }

      this.logger.log(
        `Returning ${taxasValidas.length} valid real estate financing rates`,
      );

      return taxasValidas;
    } catch (error) {
      this.logger.error(
        'Error fetching real estate financing rates from BCB',
        error.stack,
      );

      // Se a API falhar, retornar taxas de fallback
      return this.obterTaxasFallback();
    }
  }

  /**
   * Obtém o mês de referência no formato AAAA-MM
   * Exemplo: "2024-12" para dezembro de 2024
   *
   * CRITICAL FIX: BCB API expects format "YYYY-MM" not "YYYYMM"
   *
   * @param monthsBack - Número de meses para voltar (0 = mês atual, 1 = mês anterior)
   * @returns String no formato AAAA-MM
   */
  private obterMesReferencia(monthsBack: number = 0): string {
    const dataAtual = new Date();
    dataAtual.setMonth(dataAtual.getMonth() - monthsBack);
    const ano = dataAtual.getFullYear();
    const mes = String(dataAtual.getMonth() + 1).padStart(2, '0');
    return `${ano}-${mes}`;  // FIXED: Added hyphen separator
  }

  /**
   * Retorna taxas de fallback caso a API do BCB falhe
   *
   * Baseado em médias históricas de mercado brasileiro
   * Estas taxas são realistas mas devem ser atualizadas periodicamente
   *
   * @returns Lista de taxas de fallback
   */
  private obterTaxasFallback(): TaxaFinanciamentoImovel[] {
    this.logger.warn(
      'Using fallback rates for real estate financing (BCB API unavailable)',
    );

    return [
      {
        instituicaoFinanceira: 'Banco do Brasil',
        taxaJurosMensal: 0.84,
        taxaJurosAnual: 10.5,
        modalidade:
          'Financiamento imobiliário com taxas de mercado - Pós-fixado referenciado em TR',
        cnpj: '00000000',
      },
      {
        instituicaoFinanceira: 'Caixa Econômica Federal',
        taxaJurosMensal: 0.87,
        taxaJurosAnual: 10.95,
        modalidade:
          'Financiamento imobiliário com taxas de mercado - Pós-fixado referenciado em TR',
        cnpj: '00360305',
      },
      {
        instituicaoFinanceira: 'Itaú Unibanco',
        taxaJurosMensal: 0.91,
        taxaJurosAnual: 11.45,
        modalidade:
          'Financiamento imobiliário com taxas de mercado - Pós-fixado referenciado em TR',
        cnpj: '60701190',
      },
      {
        instituicaoFinanceira: 'Bradesco',
        taxaJurosMensal: 0.93,
        taxaJurosAnual: 11.75,
        modalidade:
          'Financiamento imobiliário com taxas de mercado - Pós-fixado referenciado em TR',
        cnpj: '60746948',
      },
      {
        instituicaoFinanceira: 'Santander',
        taxaJurosMensal: 0.96,
        taxaJurosAnual: 12.15,
        modalidade:
          'Financiamento imobiliário com taxas de mercado - Pós-fixado referenciado em TR',
        cnpj: '90400888',
      },
      {
        instituicaoFinanceira: 'Banco Safra',
        taxaJurosMensal: 0.98,
        taxaJurosAnual: 12.45,
        modalidade:
          'Financiamento imobiliário com taxas de mercado - Pós-fixado referenciado em TR',
        cnpj: '58160789',
      },
      {
        instituicaoFinanceira: 'Banco Inter',
        taxaJurosMensal: 0.89,
        taxaJurosAnual: 11.2,
        modalidade:
          'Financiamento imobiliário com taxas de mercado - Pós-fixado referenciado em TR',
        cnpj: '00416968',
      },
    ];
  }
}
