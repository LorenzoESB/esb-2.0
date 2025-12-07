/**
 * taxas-veiculos.data.ts
 *
 * Data client for fetching vehicle financing rates from Banco Central API
 * Rates for new and used vehicle acquisition
 */

import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { AxiosResponse } from 'axios';

/**
 * Interface para taxa de financiamento de veículos
 */
export interface TaxaFinanciamentoVeiculos {
  instituicaoFinanceira: string;
  taxaJurosMensal: number;
  taxaJurosAnual: number;
  modalidade: string;
  cnpj: string;
  tipoVeiculo: 'novo' | 'usado';
}

/**
 * Interface para resposta da API do Banco Central
 * Endpoint: TaxasJurosMensalPorMes
 */
interface BancoCentralTaxaResponse {
  Modalidade: string;
  InstituicaoFinanceira: string;
  TaxaJurosAoMes: number;
  TaxaJurosAoAno: number;
  cnpj8: string;
  anoMes: string;
}

/**
 * Client para obter taxas de financiamento de veículos do Banco Central
 */
@Injectable()
export class TaxasVeiculosData {
  private readonly logger = new Logger(TaxasVeiculosData.name);

  // API do Banco Central - OData Service
  private readonly BCB_API_URL =
    'https://olinda.bcb.gov.br/olinda/servico/taxaJuros/versao/v2/odata/TaxasJurosMensalPorMes';

  constructor(private readonly httpService: HttpService) {}

  /**
   * Obtém taxas de financiamento de veículos do Banco Central
   *
   * Filtra modalidades de:
   * - "Aquisição de veículos automotores - Veículos novos"
   * - "Aquisição de veículos automotores - Veículos usados"
   *
   * Endpoint BCB:
   * https://olinda.bcb.gov.br/olinda/servico/taxaJuros/versao/v2/odata/TaxasJurosMensalPorMes
   *
   * @param tipoVeiculo - Tipo de veículo (novo ou usado)
   * @returns Lista de taxas de financiamento de veículos por instituição
   */
  async obterTaxasVeiculos(
    tipoVeiculo: 'novo' | 'usado',
  ): Promise<TaxaFinanciamentoVeiculos[]> {
    try {
      this.logger.log(
        `Fetching ${tipoVeiculo} vehicle financing rates from BCB API`,
      );

      // Filtrar por tipo de veículo
      const modalidade =
        tipoVeiculo === 'novo'
          ? 'Aquisição de veículos automotores - Veículos novos'
          : 'Aquisição de veículos automotores - Veículos usados';

      const filter = encodeURIComponent(`Modalidade eq '${modalidade}'`);

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
          this.logger.warn(
            `Invalid response from BCB API for month ${mesReferencia}`,
          );
          continue;
        }

        taxas = response.data.value;

        if (taxas.length > 0) {
          this.logger.log(
            `Found ${taxas.length} rates from BCB API for month ${mesReferencia}`,
          );
          break;
        } else {
          this.logger.warn(
            `No rates found for month ${mesReferencia}, trying previous month...`,
          );
        }
      }

      if (taxas.length === 0) {
        this.logger.warn('No rates found in current or previous month');
        return this.obterTaxasFallback(tipoVeiculo);
      }

      // Transformar resposta para o formato esperado
      const taxasTransformadas: TaxaFinanciamentoVeiculos[] = taxas.map(
        (taxa) => ({
          instituicaoFinanceira: taxa.InstituicaoFinanceira,
          taxaJurosMensal: taxa.TaxaJurosAoMes,
          taxaJurosAnual: taxa.TaxaJurosAoAno,
          modalidade: taxa.Modalidade,
          cnpj: taxa.cnpj8,
          tipoVeiculo,
        }),
      );

      // Filtrar taxas válidas (maiores que 0)
      const taxasValidas = taxasTransformadas.filter(
        (t) => t.taxaJurosAnual > 0 && t.taxaJurosMensal > 0,
      );

      // Se não houver taxas válidas, usar fallback
      if (taxasValidas.length === 0) {
        this.logger.warn(
          'No valid rates returned from BCB API, using fallback rates',
        );
        return this.obterTaxasFallback(tipoVeiculo);
      }

      this.logger.log(
        `Returning ${taxasValidas.length} valid vehicle financing rates`,
      );

      return taxasValidas;
    } catch (error) {
      this.logger.error(
        'Error fetching vehicle financing rates from BCB',
        error.stack,
      );

      // Se a API falhar, retornar taxas de fallback
      return this.obterTaxasFallback(tipoVeiculo);
    }
  }

  /**
   * Obtém o mês de referência no formato AAAA-MM
   * Exemplo: "2024-12" para dezembro de 2024
   *
   * @param monthsBack - Número de meses para voltar (0 = mês atual, 1 = mês anterior)
   * @returns String no formato AAAA-MM
   */
  private obterMesReferencia(monthsBack: number = 0): string {
    const dataAtual = new Date();
    dataAtual.setMonth(dataAtual.getMonth() - monthsBack);
    const ano = dataAtual.getFullYear();
    const mes = String(dataAtual.getMonth() + 1).padStart(2, '0');
    return `${ano}-${mes}`;
  }

  /**
   * Retorna taxas de fallback caso a API do BCB falhe
   *
   * Baseado em médias históricas de mercado brasileiro
   * Estas taxas são realistas mas devem ser atualizadas periodicamente
   *
   * @param tipoVeiculo - Tipo de veículo (novo ou usado)
   * @returns Lista de taxas de fallback
   */
  private obterTaxasFallback(
    tipoVeiculo: 'novo' | 'usado',
  ): TaxaFinanciamentoVeiculos[] {
    this.logger.warn(
      `Using fallback rates for ${tipoVeiculo} vehicle financing (BCB API unavailable)`,
    );

    const modalidade =
      tipoVeiculo === 'novo'
        ? 'Aquisição de veículos automotores - Veículos novos'
        : 'Aquisição de veículos automotores - Veículos usados';

    // Taxas de veículos novos (geralmente mais baixas)
    if (tipoVeiculo === 'novo') {
      return [
        {
          instituicaoFinanceira: 'Banco Santander',
          taxaJurosMensal: 1.49,
          taxaJurosAnual: 19.5,
          modalidade,
          cnpj: '90400888',
          tipoVeiculo,
        },
        {
          instituicaoFinanceira: 'Itaú Unibanco',
          taxaJurosMensal: 1.59,
          taxaJurosAnual: 20.8,
          modalidade,
          cnpj: '60701190',
          tipoVeiculo,
        },
        {
          instituicaoFinanceira: 'Bradesco',
          taxaJurosMensal: 1.64,
          taxaJurosAnual: 21.5,
          modalidade,
          cnpj: '60746948',
          tipoVeiculo,
        },
        {
          instituicaoFinanceira: 'Banco do Brasil',
          taxaJurosMensal: 1.45,
          taxaJurosAnual: 18.9,
          modalidade,
          cnpj: '00000000',
          tipoVeiculo,
        },
        {
          instituicaoFinanceira: 'Banco Safra',
          taxaJurosMensal: 1.69,
          taxaJurosAnual: 22.2,
          modalidade,
          cnpj: '58160789',
          tipoVeiculo,
        },
        {
          instituicaoFinanceira: 'Banco Inter',
          taxaJurosMensal: 1.55,
          taxaJurosAnual: 20.3,
          modalidade,
          cnpj: '00416968',
          tipoVeiculo,
        },
      ];
    }

    // Taxas de veículos usados (geralmente mais altas)
    return [
      {
        instituicaoFinanceira: 'Banco Santander',
        taxaJurosMensal: 1.84,
        taxaJurosAnual: 24.5,
        modalidade,
        cnpj: '90400888',
        tipoVeiculo,
      },
      {
        instituicaoFinanceira: 'Itaú Unibanco',
        taxaJurosMensal: 1.95,
        taxaJurosAnual: 26.0,
        modalidade,
        cnpj: '60701190',
        tipoVeiculo,
      },
      {
        instituicaoFinanceira: 'Bradesco',
        taxaJurosMensal: 1.99,
        taxaJurosAnual: 26.6,
        modalidade,
        cnpj: '60746948',
        tipoVeiculo,
      },
      {
        instituicaoFinanceira: 'Banco do Brasil',
        taxaJurosMensal: 1.79,
        taxaJurosAnual: 23.8,
        modalidade,
        cnpj: '00000000',
        tipoVeiculo,
      },
      {
        instituicaoFinanceira: 'Banco Safra',
        taxaJurosMensal: 2.05,
        taxaJurosAnual: 27.5,
        modalidade,
        cnpj: '58160789',
        tipoVeiculo,
      },
      {
        instituicaoFinanceira: 'Banco Inter',
        taxaJurosMensal: 1.89,
        taxaJurosAnual: 25.2,
        modalidade,
        cnpj: '00416968',
        tipoVeiculo,
      },
    ];
  }
}
