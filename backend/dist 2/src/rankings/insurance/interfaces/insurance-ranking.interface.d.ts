import { BaseRankingItem, RawScores } from '../../shared/interfaces/base-ranking.interface';
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
export interface InsuranceServices {
    atendimento_online: boolean;
    app_mobile: boolean;
    guincho_km: number | null;
    oficinas_referenciadas: number | null;
    desconto_bom_motorista: boolean;
    desconto_garagem: boolean;
}
export interface InsurancePricing {
    franquia_minima: number;
    franquia_maxima: number;
    preco_mensal_estimado_min: number;
    preco_mensal_estimado_max: number;
}
export interface InsuranceRawScores extends RawScores {
    price_competitiveness: number;
    coverage_completeness: number;
    claim_process: number;
    customer_service: number;
    financial_strength: number;
    network_coverage: number;
    digital_services: number;
    additional_benefits: number;
    transparency: number;
    claim_approval_rate: number;
    reputation: number;
}
export interface InsuranceRankingItem extends BaseRankingItem {
    company: string;
    logo: string;
    coverage: InsuranceCoverage;
    services: InsuranceServices;
    pricing: InsurancePricing;
    avaliacao_clientes: number;
    tempo_mercado_anos: number;
    sinistros_aprovados_percentual: number;
    observacoes: string | null;
    url_contratacao: string;
    url_avaliacao: string | null;
    data_atualizacao: string;
}
export interface InsuranceData {
    id: number;
    nome: string;
    company: string;
    logo: string;
    static_score: number;
    raw_scores: InsuranceRawScores;
    coverage: InsuranceCoverage;
    services: InsuranceServices;
    pricing: InsurancePricing;
    avaliacao_clientes: number;
    tempo_mercado_anos: number;
    sinistros_aprovados_percentual: number;
    observacoes: string | null;
    url_contratacao: string;
    url_avaliacao: string | null;
    data_atualizacao: Date;
    ativo: boolean;
}
