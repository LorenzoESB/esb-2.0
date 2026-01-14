export declare class RankingCriterionDto {
    key: string;
    name: string;
    weight: number;
    type: string;
    description?: string;
}
export declare class MachinePlanDto {
    id: number;
    nome: string;
    taxa_debito: string;
    taxa_credito_vista: string;
    taxa_credito_parcelado_min: string;
    dias_repasse_debito: number;
    dias_repasse_credito: number;
    avaliacao: number;
}
export declare class MachineFeaturesDto {
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
export declare class MachinePricingDto {
    preco: number;
    preco_promocional: number | null;
    mensalidade: number;
}
export declare class CardMachineRankingItemDto {
    id: number;
    name: string;
    rank: number;
    isBestOption: boolean;
    empresa: string;
    logo: string;
    imagem: string;
    features: MachineFeaturesDto;
    pricing: MachinePricingDto;
    planos: MachinePlanDto[];
    observacoes: string | null;
    url_contratacao: string;
    cupom: string | null;
    transparencia: number | null;
    url_avaliacao: string | null;
    data_atualizacao: string;
}
export declare class CardMachineRankingResponseDto {
    items: CardMachineRankingItemDto[];
    total: number;
    bestOption: CardMachineRankingItemDto;
    criteria: RankingCriterionDto[];
    lastUpdated: Date;
}
