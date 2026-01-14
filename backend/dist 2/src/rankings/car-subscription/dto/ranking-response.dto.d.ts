import { RankingCriterion } from '../../shared/interfaces/base-ranking.interface';
export declare class CarSubscriptionCriterionDto implements RankingCriterion {
    key: string;
    name: string;
    weight: number;
    type: 'boolean' | 'numeric' | 'scale';
    description?: string;
}
export declare class CarSubscriptionScoreBreakdownDto {
    key: string;
    name: string;
    raw_score: number;
    weight: number;
    contribution: number;
    percentage: number;
}
export declare class CarSubscriptionPricingDto {
    preco_mensal_min: number;
    preco_mensal_max: number;
    franquia_km: number;
}
export declare class CarSubscriptionBenefitsDto {
    manutencao_inclusa: boolean;
    seguro_incluso: boolean;
    ipva_incluso: boolean;
    revisao_inclusa: boolean;
    observacoes?: string[];
}
export declare class CarSubscriptionRankingItemDto {
    id: number;
    name: string;
    empresa: string;
    rank: number;
    isBestOption: boolean;
    logo: string;
    score: number;
    pricing: CarSubscriptionPricingDto;
    beneficios: CarSubscriptionBenefitsDto;
    desconto?: string;
    url_contratacao: string;
    scoreBreakdown: CarSubscriptionScoreBreakdownDto[];
    data_atualizacao: string;
}
export declare class CarSubscriptionRankingResponseDto {
    items: CarSubscriptionRankingItemDto[];
    total: number;
    bestOption: CarSubscriptionRankingItemDto;
    criteria: CarSubscriptionCriterionDto[];
    lastUpdated: Date;
}
