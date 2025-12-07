import { Injectable, Logger } from '@nestjs/common';
import { getActiveInsuranceCompanies } from './data/insurance.data';
import { INSURANCE_CRITERIA } from './data/criteria.data';
import { InsuranceScoreCalculator } from './calc/score-calculator';
import {
  InsuranceRankingResponseDto,
  InsuranceRankingItemDto,
  InsuranceCoverageDto,
  InsurancePricingDto,
  InsuranceServicesDto,
  InsuranceScoreBreakdownDto,
  InsuranceRankingCriterionDto,
} from './dto/ranking-response.dto';
import { InsuranceRankingQueryDto } from './dto/ranking-request.dto';
import { InsuranceData } from './interfaces/insurance-ranking.interface';

@Injectable()
export class InsuranceRankingService {
  private readonly logger = new Logger(InsuranceRankingService.name);

  /**
   * Get insurance ranking with optional filtering
   *
   * @param query - Optional filters (coverage, price, companies)
   * @returns Ranked list of insurance options
   */
  async getRanking(
    query?: InsuranceRankingQueryDto,
  ): Promise<InsuranceRankingResponseDto> {
    try {
      this.logger.log('Fetching insurance ranking');
      this.logger.debug(`Query filters: ${JSON.stringify(query)}`);

      // Get active insurance companies
      let insurances = getActiveInsuranceCompanies();

      // Apply filters if provided
      if (query) {
        insurances = this.applyFilters(insurances, query);
        this.logger.debug(`After filtering: ${insurances.length} companies`);
      }

      if (insurances.length === 0) {
        throw new Error('No insurance companies available for ranking');
      }

      // Recalculate and rank to ensure consistency with criteria
      const rankedInsurances =
        InsuranceScoreCalculator.recalculateAndRank(insurances);

      // Convert to DTOs
      const items = rankedInsurances.map((insurance) =>
        this.toRankingItemDto(insurance),
      );

      const bestOption = items.find((item) => item.rank === 1);

      if (!bestOption) {
        throw new Error('No best option found in ranking');
      }

      const criteria = this.getCriteriaDto();
      const lastUpdated = this.getMostRecentUpdate(insurances);

      const response: InsuranceRankingResponseDto = {
        items,
        total: items.length,
        bestOption,
        criteria,
        lastUpdated,
      };

      this.logger.log(
        `Insurance ranking completed successfully. Total: ${response.total}`,
      );

      return response;
    } catch (error) {
      this.logger.error('Error fetching insurance ranking', error.stack);
      throw error;
    }
  }

  /**
   * Get ranking criteria details
   *
   * @returns Array of criteria with weights and descriptions
   */
  async getCriteria(): Promise<InsuranceRankingCriterionDto[]> {
    this.logger.log('Fetching insurance ranking criteria');
    return this.getCriteriaDto();
  }

  /**
   * Apply filters to insurance list
   */
  private applyFilters(
    insurances: InsuranceData[],
    query: InsuranceRankingQueryDto,
  ): InsuranceData[] {
    let filtered = insurances;

    // Filter by companies
    if (query.companies && query.companies.length > 0) {
      filtered = filtered.filter((insurance) =>
        query.companies!.some(
          (company) =>
            insurance.nome.toLowerCase() === company.toLowerCase() ||
            insurance.company.toLowerCase() === company.toLowerCase(),
        ),
      );
    }

    // Filter by full coverage
    if (query.cobertura_total !== undefined) {
      filtered = filtered.filter(
        (insurance) => insurance.coverage.cobertura_total === query.cobertura_total,
      );
    }

    // Filter by 24h assistance
    if (query.assistencia_24h !== undefined) {
      filtered = filtered.filter(
        (insurance) => insurance.coverage.assistencia_24h === query.assistencia_24h,
      );
    }

    // Filter by rental car availability
    if (query.carro_reserva !== undefined) {
      filtered = filtered.filter(
        (insurance) => insurance.coverage.carro_reserva === query.carro_reserva,
      );
    }

    // Filter by maximum monthly price
    if (query.max_preco_mensal !== undefined) {
      filtered = filtered.filter(
        (insurance) =>
          insurance.pricing.preco_mensal_estimado_max <= query.max_preco_mensal!,
      );
    }

    return filtered;
  }

  /**
   * Convert InsuranceData to InsuranceRankingItemDto
   */
  private toRankingItemDto(insurance: InsuranceData): InsuranceRankingItemDto {
    const ranked = insurance as InsuranceData & {
      rank?: number;
      isBestOption?: boolean;
    };

    const score = insurance.static_score;
    const scoreBreakdown = this.getScoreBreakdown(insurance);

    return {
      id: insurance.id,
      name: insurance.nome,
      rank: ranked.rank || 0,
      isBestOption: ranked.isBestOption || false,
      company: insurance.company,
      logo: insurance.logo,
      score,
      coverage: this.toCoverageDto(insurance),
      services: this.toServicesDto(insurance),
      pricing: this.toPricingDto(insurance),
      avaliacao_clientes: insurance.avaliacao_clientes,
      tempo_mercado_anos: insurance.tempo_mercado_anos,
      sinistros_aprovados_percentual: insurance.sinistros_aprovados_percentual,
      observacoes: insurance.observacoes,
      url_contratacao: insurance.url_contratacao,
      url_avaliacao: insurance.url_avaliacao,
      data_atualizacao: insurance.data_atualizacao.toLocaleDateString('pt-BR'),
      scoreBreakdown,
    };
  }

  private toCoverageDto(insurance: InsuranceData): InsuranceCoverageDto {
    return {
      cobertura_basica: insurance.coverage.cobertura_basica,
      cobertura_total: insurance.coverage.cobertura_total,
      cobertura_terceiros: insurance.coverage.cobertura_terceiros,
      vidros: insurance.coverage.vidros,
      roubo_furto: insurance.coverage.roubo_furto,
      colisao: insurance.coverage.colisao,
      incendio: insurance.coverage.incendio,
      fenomenos_naturais: insurance.coverage.fenomenos_naturais,
      assistencia_24h: insurance.coverage.assistencia_24h,
      carro_reserva: insurance.coverage.carro_reserva,
    };
  }

  private toServicesDto(insurance: InsuranceData): InsuranceServicesDto {
    return {
      atendimento_online: insurance.services.atendimento_online,
      app_mobile: insurance.services.app_mobile,
      guincho_km: insurance.services.guincho_km,
      oficinas_referenciadas: insurance.services.oficinas_referenciadas,
      desconto_bom_motorista: insurance.services.desconto_bom_motorista,
      desconto_garagem: insurance.services.desconto_garagem,
    };
  }

  private toPricingDto(insurance: InsuranceData): InsurancePricingDto {
    return {
      franquia_minima: insurance.pricing.franquia_minima,
      franquia_maxima: insurance.pricing.franquia_maxima,
      preco_mensal_estimado_min: insurance.pricing.preco_mensal_estimado_min,
      preco_mensal_estimado_max: insurance.pricing.preco_mensal_estimado_max,
    };
  }

  /**
   * Build score breakdown DTO
   */
  private getScoreBreakdown(
    insurance: InsuranceData,
  ): InsuranceScoreBreakdownDto[] {
    const contributions = InsuranceScoreCalculator.getCriteriaContributions(
      insurance.raw_scores,
    );

    return INSURANCE_CRITERIA.map((criterion) => {
      const contribution = contributions[criterion.key];

      return {
        key: criterion.key,
        name: criterion.name,
        raw_score: contribution.raw_score,
        weight: contribution.weight,
        contribution: contribution.contribution,
        percentage: contribution.percentage,
      };
    });
  }

  /**
   * Convert criteria data to DTOs
   */
  private getCriteriaDto(): InsuranceRankingCriterionDto[] {
    return INSURANCE_CRITERIA.map((criterion) => ({
      key: criterion.key,
      name: criterion.name,
      weight: criterion.weight,
      type: criterion.type,
      description: criterion.description,
    }));
  }

  /**
   * Get the most recent update date from the dataset
   */
  private getMostRecentUpdate(insurances: InsuranceData[]): Date {
    const latest = insurances.reduce((latestDate, insurance) => {
      return insurance.data_atualizacao > latestDate
        ? insurance.data_atualizacao
        : latestDate;
    }, insurances[0].data_atualizacao);

    return latest;
  }
}
