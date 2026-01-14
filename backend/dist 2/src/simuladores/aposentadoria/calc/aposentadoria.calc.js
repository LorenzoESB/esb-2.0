"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calcularValorFuturoCapitalInicial = calcularValorFuturoCapitalInicial;
exports.calcularValorFuturoPagamentos = calcularValorFuturoPagamentos;
exports.calcularValorPresente = calcularValorPresente;
exports.calcularPagamentoMensal = calcularPagamentoMensal;
exports.calcularRendaMensal = calcularRendaMensal;
exports.calcularTaxaAnual = calcularTaxaAnual;
exports.calcularDuracaoPatrimonio = calcularDuracaoPatrimonio;
exports.calcularSaldoAposSaques = calcularSaldoAposSaques;
const decimal_js_1 = require("decimal.js");
function calcularValorFuturoCapitalInicial(capitalInicial, taxaMensal, meses) {
    const pv = new decimal_js_1.default(capitalInicial);
    const taxa = new decimal_js_1.default(taxaMensal);
    const n = meses;
    const fator = new decimal_js_1.default(1).plus(taxa).pow(n);
    return pv.mul(fator);
}
function calcularValorFuturoPagamentos(pagamentoMensal, taxaMensal, meses) {
    const pmt = new decimal_js_1.default(pagamentoMensal);
    const taxa = new decimal_js_1.default(taxaMensal);
    const n = meses;
    const umMaisTaxa = new decimal_js_1.default(1).plus(taxa);
    const fatorPotencia = umMaisTaxa.pow(n);
    const numerador = fatorPotencia.minus(1);
    const fv = pmt.mul(numerador).div(taxa);
    return fv;
}
function calcularValorPresente(rendaMensal, taxaMensal, meses) {
    const pmt = new decimal_js_1.default(rendaMensal);
    const taxa = new decimal_js_1.default(taxaMensal);
    const n = meses;
    const umMaisTaxa = new decimal_js_1.default(1).plus(taxa);
    const fatorPotencia = umMaisTaxa.pow(n);
    const numerador = fatorPotencia.minus(1);
    const denominador = taxa.mul(fatorPotencia);
    const pv = pmt.mul(numerador).div(denominador);
    return pv;
}
function calcularPagamentoMensal(valorPresente, taxaMensal, meses) {
    const vp = new decimal_js_1.default(valorPresente);
    const taxa = new decimal_js_1.default(taxaMensal);
    const n = meses;
    const umMaisTaxa = new decimal_js_1.default(1).plus(taxa);
    const fatorPotencia = umMaisTaxa.pow(n);
    const denominador = fatorPotencia.minus(1);
    const pmt = vp.mul(taxa).div(denominador);
    return pmt;
}
function calcularRendaMensal(valorPresente, taxaMensal, meses) {
    const vp = new decimal_js_1.default(valorPresente);
    const taxa = new decimal_js_1.default(taxaMensal);
    const n = meses;
    const umMaisTaxa = new decimal_js_1.default(1).plus(taxa);
    const fatorPotencia = umMaisTaxa.pow(n);
    const numerador = fatorPotencia.minus(1);
    const denominador = taxa.mul(fatorPotencia);
    const pmt = vp.div(numerador).mul(denominador);
    return pmt;
}
function calcularTaxaAnual(taxaMensal) {
    const taxa = new decimal_js_1.default(taxaMensal);
    return new decimal_js_1.default(1).plus(taxa).pow(12).minus(1);
}
function calcularDuracaoPatrimonio(patrimonio, saqueMensal, taxaMensal) {
    const capital = new decimal_js_1.default(patrimonio);
    const saque = new decimal_js_1.default(saqueMensal);
    const taxa = new decimal_js_1.default(taxaMensal);
    const rendimentoMensal = capital.mul(taxa);
    if (saque.lte(rendimentoMensal)) {
        return Infinity;
    }
    let low = 1;
    let high = 1200;
    let result = 0;
    while (low <= high) {
        const mid = Math.floor((low + high) / 2);
        const saldoFinal = calcularSaldoAposSaques(capital, saque, taxa, mid);
        if (saldoFinal.gte(0)) {
            result = mid;
            low = mid + 1;
        }
        else {
            high = mid - 1;
        }
    }
    return result;
}
function calcularSaldoAposSaques(patrimonioInicial, saqueMensal, taxaMensal, meses) {
    const capital = new decimal_js_1.default(patrimonioInicial);
    const saque = new decimal_js_1.default(saqueMensal);
    const taxa = new decimal_js_1.default(taxaMensal);
    const n = meses;
    const umMaisTaxa = new decimal_js_1.default(1).plus(taxa);
    const fatorPotencia = umMaisTaxa.pow(n);
    const capitalFuturo = capital.mul(fatorPotencia);
    const saquesAcumulados = saque.mul(fatorPotencia.minus(1)).div(taxa);
    return capitalFuturo.minus(saquesAcumulados);
}
//# sourceMappingURL=aposentadoria.calc.js.map