"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calcularPrimeiraParcelaSAC = calcularPrimeiraParcelaSAC;
exports.calcularUltimaParcelaSAC = calcularUltimaParcelaSAC;
exports.calcularTotalPagoSAC = calcularTotalPagoSAC;
exports.converterTaxaAnualParaMensal = converterTaxaAnualParaMensal;
exports.calcularComprometimentoRenda = calcularComprometimentoRenda;
exports.arredondar2Decimais = arredondar2Decimais;
exports.arredondar4Decimais = arredondar4Decimais;
exports.calcularFinanciamentoSAC = calcularFinanciamentoSAC;
const decimal_js_1 = require("decimal.js");
decimal_js_1.default.set({ precision: 15, rounding: decimal_js_1.default.ROUND_HALF_UP });
function calcularPrimeiraParcelaSAC(principal, periodos, taxaMensal) {
    const valor = new decimal_js_1.default(principal);
    const prazo = new decimal_js_1.default(periodos);
    const juros = new decimal_js_1.default(taxaMensal).div(100);
    const amortizacao = valor.div(prazo);
    const jurosInicial = valor.times(juros);
    const primeiraParcela = amortizacao.plus(jurosInicial);
    return primeiraParcela;
}
function calcularUltimaParcelaSAC(principal, periodos, taxaMensal) {
    const valor = new decimal_js_1.default(principal);
    const prazo = new decimal_js_1.default(periodos);
    const juros = new decimal_js_1.default(taxaMensal).div(100);
    const amortizacao = valor.div(prazo);
    const saldoDevedorFinal = amortizacao;
    const jurosFinal = saldoDevedorFinal.times(juros);
    const ultimaParcela = amortizacao.plus(jurosFinal);
    return ultimaParcela;
}
function calcularTotalPagoSAC(principal, periodos, taxaMensal) {
    const valor = new decimal_js_1.default(principal);
    const prazo = new decimal_js_1.default(periodos);
    const juros = new decimal_js_1.default(taxaMensal).div(100);
    const jurosTotais = valor.times(juros).times(prazo.plus(1)).div(2);
    const totalPago = valor.plus(jurosTotais);
    return totalPago;
}
function converterTaxaAnualParaMensal(taxaAnual) {
    const taxa = new decimal_js_1.default(taxaAnual).div(100);
    const umMaisTaxa = new decimal_js_1.default(1).plus(taxa);
    const potencia = umMaisTaxa.pow(new decimal_js_1.default(1).div(12));
    const taxaMensal = potencia.minus(1).times(100);
    return taxaMensal;
}
function calcularComprometimentoRenda(parcela, renda) {
    if (renda === 0) {
        return new decimal_js_1.default(0);
    }
    const parcelaDecimal = new decimal_js_1.default(parcela);
    const rendaDecimal = new decimal_js_1.default(renda);
    return parcelaDecimal.div(rendaDecimal).times(100);
}
function arredondar2Decimais(valor) {
    return valor.toDecimalPlaces(2).toNumber();
}
function arredondar4Decimais(valor) {
    return valor.toDecimalPlaces(4).toNumber();
}
function calcularFinanciamentoSAC(valorFinanciado, prazoMeses, taxaJurosAnual, rendaMensal) {
    const taxaMensalDecimal = converterTaxaAnualParaMensal(taxaJurosAnual);
    const taxaJurosMensal = arredondar4Decimais(taxaMensalDecimal);
    const primeiraParcelaDecimal = calcularPrimeiraParcelaSAC(valorFinanciado, prazoMeses, taxaJurosMensal);
    const parcelaInicial = arredondar2Decimais(primeiraParcelaDecimal);
    const ultimaParcelaDecimal = calcularUltimaParcelaSAC(valorFinanciado, prazoMeses, taxaJurosMensal);
    const parcelaFinal = arredondar2Decimais(ultimaParcelaDecimal);
    const totalPagoDecimal = calcularTotalPagoSAC(valorFinanciado, prazoMeses, taxaJurosMensal);
    const valorTotal = arredondar2Decimais(totalPagoDecimal);
    const comprometimentoDecimal = calcularComprometimentoRenda(parcelaInicial, rendaMensal);
    const comprometimentoRenda = arredondar2Decimais(comprometimentoDecimal);
    return {
        parcelaInicial,
        parcelaFinal,
        valorTotal,
        taxaJurosMensal,
        taxaJurosAnual: arredondar4Decimais(new decimal_js_1.default(taxaJurosAnual)),
        comprometimentoRenda,
    };
}
//# sourceMappingURL=financiamento-imovel.calc.js.map