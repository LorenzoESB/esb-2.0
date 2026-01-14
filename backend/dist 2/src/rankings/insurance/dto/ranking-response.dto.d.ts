export declare class InsuranceRankingCriterionDto {
    key: string;
    name: string;
    weight: number;
    type: string;
    description?: string;
}
export declare class InsuranceScoreBreakdownDto {
    key: string;
    name: string;
    raw_score: number;
    weight: number;
    contribution: number;
    percentage: number;
}
export declare class InsuranceCoverageDto {
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
export declare class InsuranceServicesDto {
    atendimento_online: boolean;
    app_mobile: boolean;
    guincho_km: number | null;
    oficinas_referenciadas: number | null;
    desconto_bom_motorista: boolean;
    desconto_garagem: boolean;
}
export declare class InsurancePricingDto {
    franquia_minima: number;
    franquia_maxima: number;
    preco_mensal_estimado_min: number;
    preco_mensal_estimado_max: number;
}
export declare class InsuranceRankingItemDto {
    id: number;
    name: string;
    rank: number;
    isBestOption: boolean;
    company: string;
    logo: string;
    score: number;
    coverage: InsuranceCoverageDto;
    services: InsuranceServicesDto;
    pricing: InsurancePricingDto;
    avaliacao_clientes: number;
    tempo_mercado_anos: number;
    sinistros_aprovados_percentual: number;
    observacoes: string | null;
    url_contratacao: string;
    url_avaliacao: string | null;
    data_atualizacao: string;
    scoreBreakdown: InsuranceScoreBreakdownDto[];
}
export declare class InsuranceRankingResponseDto {
    items: InsuranceRankingItemDto[];
    total: number;
    bestOption: InsuranceRankingItemDto;
    criteria: InsuranceRankingCriterionDto[];
    lastUpdated: Date;
}
