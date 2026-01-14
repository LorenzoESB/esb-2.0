"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calcularParcelaPRICE = calcularParcelaPRICE;
exports.calcularTotalPagoPRICE = calcularTotalPagoPRICE;
exports.calcularIOF = calcularIOF;
exports.converterTaxaAnualParaMensal = converterTaxaAnualParaMensal;
exports.converterTaxaMensalParaAnual = converterTaxaMensalParaAnual;
exports.calcularComprometimentoRenda = calcularComprometimentoRenda;
exports.arredondar2Decimais = arredondar2Decimais;
exports.arredondar4Decimais = arredondar4Decimais;
exports.calcularFinanciamentoPRICE = calcularFinanciamentoPRICE;
const decimal_js_1 = require("decimal.js");
decimal_js_1.default.set({ precision: 15, rounding: decimal_js_1.default.ROUND_HALF_UP });
function calcularParcelaPRICE(principal, periodos, taxaMensal) {
    const pv = new decimal_js_1.default(principal);
    const n = new decimal_js_1.default(periodos);
    const i = new decimal_js_1.default(taxaMensal).div(100);
    if (i.isZero()) {
        return pv.div(n);
    }
    const umMaisI = new decimal_js_1.default(1).plus(i);
    const potencia = umMaisI.pow(n);
    const numerador = i.times(potencia);
    const denominador = potencia.minus(1);
    const pmt = pv.times(numerador.div(denominador));
    return pmt;
}
function calcularTotalPagoPRICE(parcelaMensal, periodos) {
    const pmt = new decimal_js_1.default(parcelaMensal);
    const n = new decimal_js_1.default(periodos);
    return pmt.times(n);
}
function calcularIOF(valorFinanciado, periodos) {
    const valor = new decimal_js_1.default(valorFinanciado);
    const dias = Math.min(periodos * 30, 365);
    const aliquotaDiaria = new decimal_js_1.default(0.000082);
    const aliquotaAdicional = new decimal_js_1.default(0.0038);
    const aliquotaTotal = aliquotaDiaria.times(dias).plus(aliquotaAdicional);
    const iof = valor.times(aliquotaTotal);
    return iof;
}
function converterTaxaAnualParaMensal(taxaAnual) {
    const taxa = new decimal_js_1.default(taxaAnual).div(100);
    const umMaisTaxa = new decimal_js_1.default(1).plus(taxa);
    const potencia = umMaisTaxa.pow(new decimal_js_1.default(1).div(12));
    const taxaMensal = potencia.minus(1).times(100);
    return taxaMensal;
}
function converterTaxaMensalParaAnual(taxaMensal) {
    const taxa = new decimal_js_1.default(taxaMensal).div(100);
    const umMaisTaxa = new decimal_js_1.default(1).plus(taxa);
    const potencia = umMaisTaxa.pow(12);
    const taxaAnual = potencia.minus(1).times(100);
    return taxaAnual;
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
function calcularFinanciamentoPRICE(valorFinanciado, prazoMeses, taxaJurosAnual, rendaMensal) {
    const taxaMensalDecimal = converterTaxaAnualParaMensal(taxaJurosAnual);
    const taxaJurosMensal = arredondar4Decimais(taxaMensalDecimal);
    const iofDecimal = calcularIOF(valorFinanciado, prazoMeses);
    const valorIOF = arredondar2Decimais(iofDecimal);
    const valorFinanciadoComIOF = valorFinanciado + valorIOF;
    const parcelaDecimal = calcularParcelaPRICE(valorFinanciadoComIOF, prazoMeses, taxaJurosMensal);
    const parcelaMensal = arredondar2Decimais(parcelaDecimal);
    const totalPagoDecimal = calcularTotalPagoPRICE(parcelaMensal, prazoMeses);
    const valorTotal = arredondar2Decimais(totalPagoDecimal);
    const comprometimentoDecimal = calcularComprometimentoRenda(parcelaMensal, rendaMensal);
    const comprometimentoRenda = arredondar2Decimais(comprometimentoDecimal);
    return {
        parcelaMensal,
        valorTotal,
        valorIOF,
        taxaJurosMensal,
        taxaJurosAnual: arredondar4Decimais(new decimal_js_1.default(taxaJurosAnual)),
        comprometimentoRenda,
    };
}
//# sourceMappingURL=financiamento-veiculos.calc.js.map