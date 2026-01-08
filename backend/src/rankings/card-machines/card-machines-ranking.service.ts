import { Injectable, Logger } from '@nestjs/common';
import {
  CARD_MACHINES_DATA,
  getActiveCardMachines,
} from './data/machines.data';
import { CARD_MACHINE_CRITERIA } from './data/criteria.data';
import { CardMachineScoreCalculator } from './calc/score-calculator';
import {
  CardMachineRankingResponseDto,
  CardMachineRankingItemDto,
  RankingCriterionDto,
  MachineFeaturesDto,
  MachinePricingDto,
  MachinePlanDto,
} from './dto/ranking-response.dto';
import { CardMachineRankingQueryDto } from './dto/ranking-request.dto';
import { MachineData } from './interfaces/machine-ranking.interface';

@Injectable()
export class CardMachinesRankingService {
  private readonly logger = new Logger(CardMachinesRankingService.name);

  /**
   * Get card machine ranking with optional filtering
   *
   * @param query - Optional filters (NFC, printer, companies, etc.)
   * @returns Ranked list of card machines
   */
  async getRanking(
    query?: CardMachineRankingQueryDto,
  ): Promise<CardMachineRankingResponseDto> {
    try {
      this.logger.log('Fetching card machine ranking');
      this.logger.debug(`Query filters: ${JSON.stringify(query)}`);

      // Get all active machines
      let machines = getActiveCardMachines();

      // Apply filters if provided
      if (query) {
        machines = this.applyFilters(machines, query);
        this.logger.debug(`After filtering: ${machines.length} machines`);
        if (machines.length === 0) {
          this.logger.warn(
            'No machines after applying filters; falling back to all active machines',
          );
          machines = getActiveCardMachines();
        }
      }

      // Rank machines
      const rankedMachines = CardMachineScoreCalculator.rankMachines(machines);

      // Convert to DTOs
      const items = rankedMachines.map((machine) =>
        this.toRankingItemDto(machine),
      );

      // Get best option (rank 1)
      const bestOption = items.find((item) => item.rank === 1) || items[0];

      if (!bestOption) {
        const criteria = this.getCriteriaDto();
        const lastUpdated = this.getMostRecentUpdate(getActiveCardMachines());
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
            imagem: '',
            features: {
              chip: false,
              tarja: false,
              nfc: false,
              com_fio: false,
              imprime_recibo: false,
              precisa_smartphone: false,
              permite_antecipacao: false,
              atende_pf: true,
              atende_pj: true,
              vale_refeicao: false,
              ecommerce: false,
              max_parcelas: 12,
              garantia: null,
              tipos_conexao: [],
              bandeiras: [],
              formas_recebimento: [],
            },
            pricing: {
              preco: 0,
              preco_promocional: null,
              mensalidade: 0,
            },
            planos: [],
            observacoes: null,
            url_contratacao: '',
            cupom: null,
            transparencia: null,
            url_avaliacao: null,
            data_atualizacao: new Date(lastUpdated).toLocaleDateString('pt-BR'),
          },
          criteria,
          lastUpdated,
        };
      }

      // Get criteria DTOs
      const criteria = this.getCriteriaDto();

      // Get most recent update date
      const lastUpdated = this.getMostRecentUpdate(machines);

      const response: CardMachineRankingResponseDto = {
        items,
        total: items.length,
        bestOption,
        criteria,
        lastUpdated,
      };

      this.logger.log(
        `Ranking completed successfully. Total machines: ${response.total}`,
      );

      return response;
    } catch (error) {
      this.logger.error('Error fetching card machine ranking', error.stack);
      throw error;
    }
  }

  /**
   * Get ranking criteria details
   *
   * @returns Array of criteria with weights and descriptions
   */
  async getCriteria(): Promise<RankingCriterionDto[]> {
    this.logger.log('Fetching ranking criteria');
    return this.getCriteriaDto();
  }

  /**
   * Apply filters to machines list
   */
  private applyFilters(
    machines: MachineData[],
    query: CardMachineRankingQueryDto,
  ): MachineData[] {
    let filtered = machines;

    // Filter by NFC
    if (query.nfc !== undefined) {
      filtered = filtered.filter((m) => m.features.nfc === query.nfc);
    }

    // Filter by receipt printer
    if (query.imprime_recibo !== undefined) {
      filtered = filtered.filter(
        (m) => m.features.imprime_recibo === query.imprime_recibo,
      );
    }

    // Filter by smartphone requirement
    if (query.precisa_smartphone !== undefined) {
      filtered = filtered.filter(
        (m) => m.features.precisa_smartphone === query.precisa_smartphone,
      );
    }

    // Filter by receivables anticipation
    if (query.permite_antecipacao !== undefined) {
      filtered = filtered.filter(
        (m) => m.features.permite_antecipacao === query.permite_antecipacao,
      );
    }

    // Filter by meal voucher
    if (query.vale_refeicao !== undefined) {
      filtered = filtered.filter(
        (m) => m.features.vale_refeicao === query.vale_refeicao,
      );
    }

    // Filter by e-commerce
    if (query.ecommerce !== undefined) {
      filtered = filtered.filter(
        (m) => m.features.ecommerce === query.ecommerce,
      );
    }

    // Filter by companies
    const companies = query.companies;
    if (companies && companies.length > 0) {
      filtered = filtered.filter((m) =>
        companies.some(
          (company) => m.empresa.toLowerCase() === company.toLowerCase(),
        ),
      );
    }

    // Filter by zero monthly fee
    if (query.sem_mensalidade !== undefined && query.sem_mensalidade) {
      filtered = filtered.filter((m) => m.pricing.mensalidade === 0);
    }

    return filtered;
  }

  /**
   * Convert MachineData to CardMachineRankingItemDto
   */
  private toRankingItemDto(machine: MachineData): CardMachineRankingItemDto {
    // Note: We access rank and isBestOption which were added by rankMachines()
    const ranked = machine as MachineData & {
      rank: number;
      isBestOption: boolean;
    };

    return {
      id: machine.id,
      name: machine.nome,
      rank: ranked.rank || 0,
      isBestOption: ranked.isBestOption || false,
      empresa: machine.empresa,
      logo: machine.logo,
      imagem: machine.imagem,
      features: this.toFeaturesDto(machine),
      pricing: this.toPricingDto(machine),
      planos: machine.planos,
      observacoes: machine.observacoes,
      url_contratacao: machine.url_contratacao,
      cupom: machine.cupom,
      transparencia: machine.transparencia,
      url_avaliacao: machine.url_avaliacao,
      data_atualizacao: machine.data_atualizacao.toLocaleDateString('pt-BR'),
    };
  }

  /**
   * Convert to MachineFeaturesDto
   */
  private toFeaturesDto(machine: MachineData): MachineFeaturesDto {
    return {
      chip: machine.features.chip,
      tarja: machine.features.tarja,
      nfc: machine.features.nfc,
      com_fio: machine.features.com_fio,
      imprime_recibo: machine.features.imprime_recibo,
      precisa_smartphone: machine.features.precisa_smartphone,
      permite_antecipacao: machine.features.permite_antecipacao,
      atende_pf: machine.features.atende_pf,
      atende_pj: machine.features.atende_pj,
      vale_refeicao: machine.features.vale_refeicao,
      ecommerce: machine.features.ecommerce,
      max_parcelas: machine.features.max_parcelas,
      garantia: machine.features.garantia,
      tipos_conexao: machine.features.tipos_conexao,
      bandeiras: machine.features.bandeiras,
      formas_recebimento: machine.features.formas_recebimento,
    };
  }

  /**
   * Convert to MachinePricingDto
   */
  private toPricingDto(machine: MachineData): MachinePricingDto {
    return {
      preco: machine.pricing.preco,
      preco_promocional: machine.pricing.preco_promocional,
      mensalidade: machine.pricing.mensalidade,
    };
  }

  /**
   * Get criteria as DTOs
   */
  private getCriteriaDto(): RankingCriterionDto[] {
    return CARD_MACHINE_CRITERIA.map((criterion) => ({
      key: criterion.key,
      name: criterion.name,
      weight: criterion.weight,
      type: criterion.type,
      description: criterion.description,
    }));
  }

  /**
   * Get most recent update date from machines
   */
  private getMostRecentUpdate(machines: MachineData[]): Date {
    const dates = machines.map((m) => m.data_atualizacao);
    return new Date(Math.max(...dates.map((d) => d.getTime())));
  }
}
