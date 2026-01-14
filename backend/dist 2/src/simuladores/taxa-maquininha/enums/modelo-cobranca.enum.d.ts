export declare enum ModeloCobranca {
    ANTECIPACAO_JUROS_SIMPLES = "Antecipa\u00E7\u00E3o por Juros Simples",
    ANTECIPACAO_JUROS_COMPOSTOS = "Antecipa\u00E7\u00E3o por Juros Compostos",
    FAIXA = "Faixa",
    TAXA_PADRAO = "Taxa Padr\u00E3o"
}
export declare enum TipoFaixa {
    PRECO = 1,
    TAXA = 2,
    TAXA_ADICIONAL = 3
}
export declare enum TipoPessoa {
    PF = "PF",
    PJ = "PJ"
}
export declare const TipoRecebimentoParcelado: {
    readonly APOS_CADA_PARCELA: true;
    readonly TUDO_DE_UMA_VEZ: false;
};
