import { BaseRankingItem, RawScores, RankingCriterion } from '../../shared/interfaces/base-ranking.interface';
export interface CarSubscriptionPricing {
    preco_mensal_min: number;
    preco_mensal_max: number;
    franquia_km: number;
}
export interface CarSubscriptionBenefits {
    manutencao_inclusa: boolean;
    seguro_incluso: boolean;
    ipva_incluso: boolean;
    revisao_inclusa: boolean;
    observacoes?: string[];
}
export interface CarSubscriptionData extends BaseRankingItem {
    nome: string;
    empresa: string;
    logo: string;
    url_contratacao: string;
    desconto?: string;
    pricing: CarSubscriptionPricing;
    beneficios: CarSubscriptionBenefits;
    raw_scores: RawScores;
    static_score?: number;
    data_atualizacao: Date;
    criteria?: RankingCriterion[];
    ativo: boolean;
}
