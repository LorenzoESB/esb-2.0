"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.URLS_REDIRECIONAMENTO = exports.CURVA_DEPRECIACAO_PERCENT = exports.AJUSTES_ASSINATURA = exports.TAXAS_FINANCIAMENTO = exports.TAXAS_ANUAIS = void 0;
exports.calcularCustosFixosAnuais = calcularCustosFixosAnuais;
exports.obterDepreciacaoAno = obterDepreciacaoAno;
exports.TAXAS_ANUAIS = {
    MANUTENCAO_PERCENT: 1.0,
    IPVA_PERCENT: 4.0,
    SEGURO_PERCENT: 4.0,
    EMPLACAMENTO_CUSTO: 170.0,
    LICENCIAMENTO_CUSTO: 160.0,
};
exports.TAXAS_FINANCIAMENTO = {
    TAXA_MENSAL_PERCENT: 2.5,
};
exports.AJUSTES_ASSINATURA = {
    REAJUSTE_ANUAL_PERCENT: 5.0,
};
exports.CURVA_DEPRECIACAO_PERCENT = [
    20.0, 25.0, 30.0, 35.0, 39.0,
];
exports.URLS_REDIRECIONAMENTO = {
    ASSINATURA_URL: 'https://educandoseubolso.blog.br/externo/localiza-meoo-comparador/',
    FINANCIAMENTO_URL: 'https://educandoseubolso.blog.br/externo/simulador-de-financiamento-compadador-assinatura/',
};
function calcularCustosFixosAnuais() {
    return exports.TAXAS_ANUAIS.EMPLACAMENTO_CUSTO + exports.TAXAS_ANUAIS.LICENCIAMENTO_CUSTO;
}
function obterDepreciacaoAno(ano) {
    if (ano < 1 || ano > 5) {
        throw new Error('Year must be between 1 and 5');
    }
    return exports.CURVA_DEPRECIACAO_PERCENT[ano - 1];
}
//# sourceMappingURL=comparador.constants.js.map