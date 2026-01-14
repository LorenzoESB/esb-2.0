import { RankingCriterion } from '../../shared/interfaces/base-ranking.interface';
export declare class TollPassCriterionDto implements RankingCriterion {
    key: string;
    name: string;
    weight: number;
    type: 'boolean' | 'numeric' | 'scale';
    description?: string;
}
export declare class TollPassScoreBreakdownDto {
    key: string;
    raw_score: number;
    weight: number;
    contribution: number;
    percentage: number;
    name: string;
}
export declare class TollPassPricingDto {
    mensalidade: number;
    adesao: number;
    taxa_instalacao?: number;
}
export declare class TollPassBenefitsDto {
    estacionamento: boolean;
    cashback: boolean;
    parceiros: string[];
}
export declare class TollPassRankingItemDto {
    id: number;
    name: string;
    empresa: string;
    rank: number;
    isBestOption: boolean;
    logo: string;
    score: number;
    pricing: TollPassPricingDto;
    cobertura_rodovias: number;
    beneficios: TollPassBenefitsDto;
    tags_adicionais?: string[];
    url_contratacao: string;
    scoreBreakdown: TollPassScoreBreakdownDto[];
    data_atualizacao: string;
}
export declare class TollPassRankingResponseDto {
    items: TollPassRankingItemDto[];
    total: number;
    bestOption: TollPassRankingItemDto;
    criteria: TollPassCriterionDto[];
    lastUpdated: Date;
}
