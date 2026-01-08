import { Injectable, Logger } from '@nestjs/common';
import { getActiveTollPasses } from './data/toll-passes.data';
import { TOLL_PASS_CRITERIA } from './data/criteria.data';
import { TollPassRankingQueryDto } from './dto/ranking-request.dto';
import {
  TollPassCriterionDto,
  TollPassRankingItemDto,
  TollPassRankingResponseDto,
  TollPassScoreBreakdownDto,
} from './dto/ranking-response.dto';
import { TollPassScoreCalculator } from './calc/score-calculator';
import { TollPassData } from './interfaces/toll-pass-ranking.interface';
import { LegacyPrismaService } from '../../prisma/legacy-prisma.service';

@Injectable()
export class TollPassesRankingService {
  private readonly logger = new Logger(TollPassesRankingService.name);
  constructor(private readonly legacy: LegacyPrismaService) {}

  async getRanking(
    query?: TollPassRankingQueryDto,
  ): Promise<TollPassRankingResponseDto> {
    try {
      this.logger.log('Fetching toll pass ranking');
      this.logger.debug(`Query filters: ${JSON.stringify(query)}`);

      let items = getActiveTollPasses();

      if (query) {
        items = this.applyFilters(items, query);
        this.logger.debug(`After filtering: ${items.length} items`);
      }

      if (items.length === 0) {
        const criteria = this.getCriteriaDto();
        const lastUpdated = new Date();
        return {
          items: [],
          total: 0,
          bestOption: {
            id: 0,
            name: '',
            empresa: '',
            rank: 0,
            isBestOption: false,
            logo: '',
            score: 0,
            pricing: { mensalidade: 0, adesao: 0 },
            cobertura_rodovias: 0,
            beneficios: { estacionamento: false, cashback: false, parceiros: [] },
            tags_adicionais: [],
            url_contratacao: '',
            scoreBreakdown: [],
            data_atualizacao: '',
          },
          criteria,
          lastUpdated,
        };
      }

      const ranked = TollPassScoreCalculator.rank(items);
      const responseItems = ranked.map((item) => this.toRankingItemDto(item));
      let bestOption = responseItems.find((item) => item.rank === 1);

      if (!bestOption) {
        // fallback to first item
        bestOption = responseItems[0];
      }

      const criteria = this.getCriteriaDto();
      const lastUpdated = this.getMostRecentUpdate(items);
      await this.hydrateMissingFromLegacy(responseItems);

      return {
        items: responseItems,
        total: responseItems.length,
        bestOption,
        criteria,
        lastUpdated,
      };
    } catch (error) {
      this.logger.error('Error fetching toll pass ranking', error.stack);
      throw error;
    }
  }

  async getCriteria(): Promise<TollPassCriterionDto[]> {
    return this.getCriteriaDto();
  }

  private applyFilters(
    items: TollPassData[],
    query: TollPassRankingQueryDto,
  ): TollPassData[] {
    let filtered = items;

    if (query.companies && query.companies.length > 0) {
      filtered = filtered.filter((item) =>
        query.companies!.some(
          (company) =>
            item.nome.toLowerCase() === company.toLowerCase() ||
            item.empresa.toLowerCase() === company.toLowerCase(),
        ),
      );
    }

    if (query.max_mensalidade !== undefined) {
      filtered = filtered.filter(
        (item) => item.pricing.mensalidade <= query.max_mensalidade!,
      );
    }

    if (query.exige_estacionamento === true) {
      filtered = filtered.filter((item) => item.beneficios.estacionamento);
    }

    return filtered;
  }

  private toRankingItemDto(
    item: TollPassData & { scoreBreakdown?: TollPassScoreBreakdownDto[] },
  ): TollPassRankingItemDto {
    const ranked = item as TollPassData & {
      rank?: number;
      isBestOption?: boolean;
      scoreBreakdown?: TollPassScoreBreakdownDto[];
    };

    return {
      id: item.id,
      name: item.nome,
      empresa: item.empresa,
      rank: ranked.rank || 0,
      isBestOption: ranked.isBestOption || false,
      logo: item.logo,
      score: Number(item.score?.toFixed(2) ?? item.static_score ?? 0),
      pricing: item.pricing,
      cobertura_rodovias: item.cobertura_rodovias,
      beneficios: item.beneficios,
      tags_adicionais: item.tags_adicionais,
      url_contratacao: item.url_contratacao,
      scoreBreakdown: ranked.scoreBreakdown || [],
      data_atualizacao: item.data_atualizacao.toLocaleDateString('pt-BR'),
    };
  }

  private getCriteriaDto(): TollPassCriterionDto[] {
    return TOLL_PASS_CRITERIA.map((criterion) => ({
      key: criterion.key,
      name: criterion.name,
      weight: criterion.weight,
      type: criterion.type,
      description: criterion.description,
    }));
  }

  private getMostRecentUpdate(items: TollPassData[]): Date {
    const dates = items.map((item) => item.data_atualizacao);
    return new Date(Math.max(...dates.map((d) => d.getTime())));
  }

  private async hydrateMissingFromLegacy(
    items: TollPassRankingItemDto[],
  ): Promise<void> {
    const mediaBase = process.env.LEGACY_MEDIA_BASE_URL || '';
    for (const item of items) {
      if (!item.logo || item.logo.trim() === '') {
        try {
          const rows: Array<{ logo: string }> = await this.legacy.safeQueryRaw`
            SELECT logo
            FROM core_marca
            WHERE LOWER(nome) = LOWER(${item.empresa})
            LIMIT 1
          `;
          const path = rows?.[0]?.logo;
          if (path && typeof path === 'string' && path.trim() !== '') {
            item.logo = mediaBase ? `${mediaBase}${path.startsWith('/') ? '' : '/'}${path}` : path;
          }
        } catch (e) {
          this.logger.warn(
            `Legacy hydration failed for empresa "${item.empresa}": ${(e as any)?.message}`,
          );
        }
      }
    }
  }
}
