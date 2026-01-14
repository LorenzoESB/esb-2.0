import { BaseRankingItem, RawScores, RankingCriterion } from '../../shared/interfaces/base-ranking.interface';
export interface TollPassBenefits {
    estacionamento: boolean;
    cashback: boolean;
    parceiros: string[];
}
export interface TollPassPricing {
    mensalidade: number;
    adesao: number;
    taxa_instalacao?: number;
}
export interface TollPassData extends BaseRankingItem {
    nome: string;
    empresa: string;
    logo: string;
    url_contratacao: string;
    cobertura_rodovias: number;
    tags_adicionais?: string[];
    beneficios: TollPassBenefits;
    pricing: TollPassPricing;
    raw_scores: RawScores;
    static_score?: number;
    data_atualizacao: Date;
    criteria?: RankingCriterion[];
    ativo: boolean;
}
