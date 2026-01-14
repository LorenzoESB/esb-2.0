export declare const TAXAS_ANUAIS: {
    readonly MANUTENCAO_PERCENT: 1;
    readonly IPVA_PERCENT: 4;
    readonly SEGURO_PERCENT: 4;
    readonly EMPLACAMENTO_CUSTO: 170;
    readonly LICENCIAMENTO_CUSTO: 160;
};
export declare const TAXAS_FINANCIAMENTO: {
    readonly TAXA_MENSAL_PERCENT: 2.5;
};
export declare const AJUSTES_ASSINATURA: {
    readonly REAJUSTE_ANUAL_PERCENT: 5;
};
export declare const CURVA_DEPRECIACAO_PERCENT: readonly [20, 25, 30, 35, 39];
export declare const URLS_REDIRECIONAMENTO: {
    readonly ASSINATURA_URL: "https://educandoseubolso.blog.br/externo/localiza-meoo-comparador/";
    readonly FINANCIAMENTO_URL: "https://educandoseubolso.blog.br/externo/simulador-de-financiamento-compadador-assinatura/";
};
export declare function calcularCustosFixosAnuais(): number;
export declare function obterDepreciacaoAno(ano: number): number;
