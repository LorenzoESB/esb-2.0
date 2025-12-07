import { BaseRankingItem, RawScores } from '../../shared/interfaces/base-ranking.interface';

/**
 * Features of a card machine
 */
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

/**
 * Pricing information for a card machine
 */
export interface MachinePricing {
  preco: number;
  preco_promocional: number | null;
  mensalidade: number;
}

/**
 * Plan details for a card machine
 */
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

/**
 * Raw scores for each ranking criterion before normalization
 * Used for score calculation
 */
export interface MachineRawScores extends RawScores {
  competitive_rates: number;        // 0-10 scale
  transparency: number;              // 0-10 scale
  features: number;                  // 0-10 scale
  receivables_anticipation: number;  // 0-10 scale (boolean: 10 or 0)
  reputation: number;                // 0-10 scale
  support_quality: number;           // 0-10 scale
  installment_options: number;       // 0-10 scale
  meal_vouchers: number;             // 0-10 scale (boolean: 10 or 0)
}

/**
 * Complete card machine ranking item
 * Extends base ranking item with machine-specific data
 */
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

/**
 * Internal data structure for card machine with static score
 * Used in data files - contains all information including pre-calculated score
 */
export interface MachineData {
  id: number;
  nome: string;
  empresa: string;
  logo: string;
  imagem: string;

  // Static pre-calculated score (hidden from API response)
  static_score: number;

  // Raw scores for verification/recalculation
  raw_scores: MachineRawScores;

  // Features
  features: MachineFeatures;

  // Pricing
  pricing: MachinePricing;

  // Plans
  planos: MachinePlan[];

  // Additional info
  observacoes: string | null;
  url_contratacao: string;
  cupom: string | null;
  transparencia: number | null;
  url_avaliacao: string | null;
  data_atualizacao: Date;
  ativo: boolean;
}
