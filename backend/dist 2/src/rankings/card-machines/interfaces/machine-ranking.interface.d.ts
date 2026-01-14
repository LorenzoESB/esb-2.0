import { BaseRankingItem, RawScores } from '../../shared/interfaces/base-ranking.interface';
export interface MachineFeatures {
    chip: boolean;
    tarja: boolean;
    nfc: boolean;
    com_fio: boolean;
    imprime_recibo: boolean;
    precisa_smartphone: boolean;
    permite_antecipacao: boolean;
    atende_pf: boolean;
    atende_pj: boolean;
    vale_refeicao: boolean;
    ecommerce: boolean;
    max_parcelas: number;
    garantia: number | null;
    tipos_conexao: string[];
    bandeiras: string[];
    formas_recebimento: string[];
}
export interface MachinePricing {
    preco: number;
    preco_promocional: number | null;
    mensalidade: number;
}
export interface MachinePlan {
    id: number;
    nome: string;
    taxa_debito: string;
    taxa_credito_vista: string;
    taxa_credito_parcelado_min: string;
    dias_repasse_debito: number;
    dias_repasse_credito: number;
    avaliacao: number;
}
export interface MachineRawScores extends RawScores {
    competitive_rates: number;
    transparency: number;
    features: number;
    receivables_anticipation: number;
    reputation: number;
    support_quality: number;
    installment_options: number;
    meal_vouchers: number;
}
export interface MachineRankingItem extends BaseRankingItem {
    empresa: string;
    logo: string;
    imagem: string;
    features: MachineFeatures;
    pricing: MachinePricing;
    planos: MachinePlan[];
    observacoes: string | null;
    url_contratacao: string;
    cupom: string | null;
    transparencia: number | null;
    url_avaliacao: string | null;
    data_atualizacao: string;
}
export interface MachineData {
    id: number;
    nome: string;
    empresa: string;
    logo: string;
    imagem: string;
    static_score: number;
    raw_scores: MachineRawScores;
    features: MachineFeatures;
    pricing: MachinePricing;
    planos: MachinePlan[];
    observacoes: string | null;
    url_contratacao: string;
    cupom: string | null;
    transparencia: number | null;
    url_avaliacao: string | null;
    data_atualizacao: Date;
    ativo: boolean;
}
