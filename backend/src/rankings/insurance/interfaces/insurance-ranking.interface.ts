import { BaseRankingItem, RawScores } from '../../shared/interfaces/base-ranking.interface';

/**
 * Coverage details for an insurance company
 */
export interface InsuranceCoverage {
  cobertura_basica: boolean;
  cobertura_total: boolean;
  cobertura_terceiros: boolean;
  vidros: boolean;
  roubo_furto: boolean;
  colisao: boolean;
  incendio: boolean;
  fenomenos_naturais: boolean;
  assistencia_24h: boolean;
  carro_reserva: boolean;
}

/**
 * Service details for an insurance company
 */
export interface InsuranceServices {
  atendimento_online: boolean;
  app_mobile: boolean;
  guincho_km: number | null;
  oficinas_referenciadas: number | null;
  desconto_bom_motorista: boolean;
  desconto_garagem: boolean;
}

/**
 * Pricing information for insurance
 */
export interface InsurancePricing {
  franquia_minima: number;
  franquia_maxima: number;
  preco_mensal_estimado_min: number;
  preco_mensal_estimado_max: number;
}

/**
 * Raw scores for each ranking criterion before normalization
 * Used for score calculation
 */
export interface InsuranceRawScores extends RawScores {
  price_competitiveness: number;    // 0-10 scale (lower price = higher score)
  coverage_completeness: number;     // 0-10 scale
  claim_process: number;             // 0-10 scale
  customer_service: number;          // 0-10 scale
  financial_strength: number;        // 0-10 scale
  network_coverage: number;          // 0-10 scale (number of workshops)
  digital_services: number;          // 0-10 scale
  additional_benefits: number;       // 0-10 scale
  transparency: number;              // 0-10 scale
  claim_approval_rate: number;       // 0-10 scale
  reputation: number;                // 0-10 scale
}

/**
 * Complete insurance company ranking item
 * Extends base ranking item with insurance-specific data
 */
export interface InsuranceRankingItem extends BaseRankingItem {
  company: string;
  logo: string;
  coverage: InsuranceCoverage;
  services: InsuranceServices;
  pricing: InsurancePricing;
  avaliacao_clientes: number;        // 0-5 scale
  tempo_mercado_anos: number;
  sinistros_aprovados_percentual: number;
  observacoes: string | null;
  url_contratacao: string;
  url_avaliacao: string | null;
  data_atualizacao: string;
}

/**
 * Internal data structure for insurance with static score
 * Used in data files - contains all information including pre-calculated score
 */
export interface InsuranceData {
  id: number;
  nome: string;
  company: string;
  logo: string;

  // Static pre-calculated score (hidden from API response)
  static_score: number;

  // Raw scores for verification/recalculation
  raw_scores: InsuranceRawScores;

  // Coverage
  coverage: InsuranceCoverage;

  // Services
  services: InsuranceServices;

  // Pricing
  pricing: InsurancePricing;

  // Additional info
  avaliacao_clientes: number;
  tempo_mercado_anos: number;
  sinistros_aprovados_percentual: number;
  observacoes: string | null;
  url_contratacao: string;
  url_avaliacao: string | null;
  data_atualizacao: Date;
  ativo: boolean;
}
