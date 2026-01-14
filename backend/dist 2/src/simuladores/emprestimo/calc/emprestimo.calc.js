"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calcularParcelaPRICE = calcularParcelaPRICE;
exports.calcularParcelaSAC = calcularParcelaSAC;
exports.converterTaxaAnualParaMensal = converterTaxaAnualParaMensal;
exports.converterTaxaMensalParaAnual = converterTaxaMensalParaAnual;
exports.calcularTotalPago = calcularTotalPago;
exports.calcularTotalJuros = calcularTotalJuros;
exports.calcularTaxaEfetivaAnual = calcularTaxaEfetivaAnual;
exports.calcularComprometimentoRenda = calcularComprometimentoRenda;
exports.arredondar2Decimais = arredondar2Decimais;
exports.arredondar4Decimais = arredondar4Decimais;
exports.calcularEmprestimoPRICE = calcularEmprestimoPRICE;
const decimal_js_1 = require("decimal.js");
decimal_js_1.default.set({ precision: 15, rounding: decimal_js_1.default.ROUND_HALF_UP });
function calcularParcelaPRICE(valorEmprestimo, prazoMeses, taxaJurosMensal) {
    const valor = new decimal_js_1.default(valorEmprestimo);
    const prazo = new decimal_js_1.default(prazoMeses);
    const juros = new decimal_js_1.default(taxaJurosMensal).div(100);
    const umMaisJuros = new decimal_js_1.default(1).plus(juros);
    const potencia = umMaisJuros.pow(prazo);
    const numerador = juros.times(potencia);
    const denominador = potencia.minus(1);
    const parcela = valor.times(numerador.div(denominador));
    return parcela;
}
function calcularParcelaSAC(valorEmprestimo, prazoMeses, taxaJurosMensal) {
    const valor = new decimal_js_1.default(valorEmprestimo);
    const prazo = new decimal_js_1.default(prazoMeses);
    const juros = new decimal_js_1.default(taxaJurosMensal).div(100);
    const amortizacao = valor.div(prazo);
    const jurosInicial = valor.times(juros);
    const parcela = amortizacao.plus(jurosInicial);
    return parcela;
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
function calcularTotalPago(parcelaMensal, prazoMeses) {
    return new decimal_js_1.default(parcelaMensal).times(prazoMeses);
}
function calcularTotalJuros(totalPago, valorEmprestimo) {
    return new decimal_js_1.default(totalPago).minus(valorEmprestimo);
}
function calcularTaxaEfetivaAnual(totalPago, valorEmprestimo, prazoMeses) {
    const montante = new decimal_js_1.default(totalPago);
    const principal = new decimal_js_1.default(valorEmprestimo);
    const anos = new decimal_js_1.default(prazoMeses).div(12);
    const razao = montante.div(principal);
    const expoente = new decimal_js_1.default(1).div(anos);
    const potencia = razao.pow(expoente);
    const taxaEfetiva = potencia.minus(1).times(100);
    return taxaEfetiva;
}
function calcularComprometimentoRenda(parcelaMensal, rendaMensal) {
    if (rendaMensal === 0) {
        return new decimal_js_1.default(0);
    }
    const parcela = new decimal_js_1.default(parcelaMensal);
    const renda = new decimal_js_1.default(rendaMensal);
    return parcela.div(renda).times(100);
}
function arredondar2Decimais(valor) {
    return valor.toDecimalPlaces(2).toNumber();
}
function arredondar4Decimais(valor) {
    return valor.toDecimalPlaces(4).toNumber();
}
function calcularEmprestimoPRICE(valorEmprestimo, prazoMeses, taxaJurosMensal) {
    const parcelaDecimal = calcularParcelaPRICE(valorEmprestimo, prazoMeses, taxaJurosMensal);
    const parcelaMensal = arredondar2Decimais(parcelaDecimal);
    const totalPagoDecimal = calcularTotalPago(parcelaMensal, prazoMeses);
    const totalPago = arredondar2Decimais(totalPagoDecimal);
    const totalJurosDecimal = calcularTotalJuros(totalPago, valorEmprestimo);
    const totalJuros = arredondar2Decimais(totalJurosDecimal);
    const taxaAnualDecimal = converterTaxaMensalParaAnual(taxaJurosMensal);
    const taxaJurosAnual = arredondar4Decimais(taxaAnualDecimal);
    const taxaEfetivaAnualDecimal = calcularTaxaEfetivaAnual(totalPago, valorEmprestimo, prazoMeses);
    const taxaEfetivaAnual = arredondar4Decimais(taxaEfetivaAnualDecimal);
    return {
        parcelaMensal,
        totalPago,
        totalJuros,
        taxaJurosMensal: arredondar4Decimais(new decimal_js_1.default(taxaJurosMensal)),
        taxaJurosAnual,
        taxaEfetivaAnual,
        valorEmprestimo,
        prazoMeses,
    };
}
//# sourceMappingURL=emprestimo.calc.js.map