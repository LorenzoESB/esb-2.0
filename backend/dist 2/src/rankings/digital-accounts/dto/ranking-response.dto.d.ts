import { RankingCriterion } from '../../shared/interfaces/base-ranking.interface';
export declare class DigitalAccountCriterionDto implements RankingCriterion {
    key: string;
    name: string;
    weight: number;
    type: 'boolean' | 'numeric' | 'scale';
    description?: string;
}
export declare class DigitalAccountScoreBreakdownDto {
    key: string;
    name: string;
    raw_score: number;
    weight: number;
    contribution: number;
    percentage: number;
}
export declare class DigitalAccountFeaturesDto {
    credit_card: boolean;
    debit_card: boolean;
    investments: boolean;
    boletos: boolean;
    saques_ilimitados: boolean;
    atendimento_humanizado: boolean;
}
export declare class DigitalAccountRankingItemDto {
    id: number;
    name: string;
    bank: string;
    rank: number;
    isBestOption: boolean;
    logo: string;
    monthly_fee: number;
    account_type: 'pf' | 'pj' | 'ambos';
    score: number;
    url_ranking: string;
    call_to_action: string;
    highlights: string[];
    features: DigitalAccountFeaturesDto;
    scoreBreakdown: DigitalAccountScoreBreakdownDto[];
    data_atualizacao: string;
}
export declare class DigitalAccountsRankingResponseDto {
    items: DigitalAccountRankingItemDto[];
    total: number;
    bestOption: DigitalAccountRankingItemDto;
    criteria: DigitalAccountCriterionDto[];
    lastUpdated: Date;
}
