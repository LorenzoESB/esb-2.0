import { BaseRankingItem, RawScores, RankingCriterion } from '../../shared/interfaces/base-ranking.interface';
export interface DigitalAccountFeatures {
    credit_card: boolean;
    debit_card: boolean;
    investments: boolean;
    boletos: boolean;
    saques_ilimitados: boolean;
    atendimento_humanizado: boolean;
}
export interface DigitalAccountData extends BaseRankingItem {
    nome: string;
    banco: string;
    logo: string;
    url_ranking: string;
    botao: string;
    mensalidade: number;
    tipo_conta: 'pf' | 'pj' | 'ambos';
    destaques: string[];
    raw_scores: RawScores;
    static_score: number;
    features: DigitalAccountFeatures;
    data_atualizacao: Date;
    criteria?: RankingCriterion[];
    ativo: boolean;
}
