"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calcularManutencaoAnual = calcularManutencaoAnual;
exports.calcularIPVAAnual = calcularIPVAAnual;
exports.calcularSeguroAnual = calcularSeguroAnual;
exports.calcularValorDepreciado = calcularValorDepreciado;
exports.calcularDepreciacao = calcularDepreciacao;
exports.calcularParcelaFinanciamento = calcularParcelaFinanciamento;
exports.calcularIOFFinanciamento = calcularIOFFinanciamento;
exports.calcularCustoAssinatura = calcularCustoAssinatura;
exports.calcularCustoOportunidade = calcularCustoOportunidade;
exports.calcularCenarioCompra = calcularCenarioCompra;
exports.calcularCenarioFinanciamento = calcularCenarioFinanciamento;
exports.calcularCenarioAssinatura = calcularCenarioAssinatura;
exports.compararCenarios = compararCenarios;
const decimal_js_1 = require("decimal.js");
const comparador_constants_1 = require("../constants/comparador.constants");
decimal_js_1.default.set({ precision: 15, rounding: decimal_js_1.default.ROUND_HALF_UP });
function calcularManutencaoAnual(valorVeiculo) {
    const valor = new decimal_js_1.default(valorVeiculo);
    const taxa = new decimal_js_1.default(comparador_constants_1.TAXAS_ANUAIS.MANUTENCAO_PERCENT).div(100);
    return valor.times(taxa);
}
function calcularIPVAAnual(valorVeiculo) {
    const valor = new decimal_js_1.default(valorVeiculo);
    const taxa = new decimal_js_1.default(comparador_constants_1.TAXAS_ANUAIS.IPVA_PERCENT).div(100);
    return valor.times(taxa);
}
function calcularSeguroAnual(valorVeiculo) {
    const valor = new decimal_js_1.default(valorVeiculo);
    const taxa = new decimal_js_1.default(comparador_constants_1.TAXAS_ANUAIS.SEGURO_PERCENT).div(100);
    return valor.times(taxa);
}
function calcularValorDepreciado(valorInicial, anos) {
    const valor = new decimal_js_1.default(valorInicial);
    const depreciacaoPercent = (0, comparador_constants_1.obterDepreciacaoAno)(anos);
    const depreciacaoDecimal = new decimal_js_1.default(depreciacaoPercent).div(100);
    return valor.times(new decimal_js_1.default(1).minus(depreciacaoDecimal));
}
function calcularDepreciacao(valorInicial, anos) {
    const valor = new decimal_js_1.default(valorInicial);
    const valorDepreciado = calcularValorDepreciado(valorInicial, anos);
    return valor.minus(valorDepreciado);
}
function calcularParcelaFinanciamento(principal, meses, taxaMensal) {
    const pv = new decimal_js_1.default(principal);
    const n = new decimal_js_1.default(meses);
    const i = new decimal_js_1.default(taxaMensal).div(100);
    if (i.isZero()) {
        return pv.div(n);
    }
    const umMaisI = new decimal_js_1.default(1).plus(i);
    const potencia = umMaisI.pow(n);
    const numerador = i.times(potencia);
    const denominador = potencia.minus(1);
    return pv.times(numerador.div(denominador));
}
function calcularIOFFinanciamento(valorFinanciado, meses) {
    const valor = new decimal_js_1.default(valorFinanciado);
    const dias = Math.min(meses * 30, 365);
    const aliquotaDiaria = new decimal_js_1.default(0.000082);
    const aliquotaAdicional = new decimal_js_1.default(0.0038);
    const aliquotaTotal = aliquotaDiaria.times(dias).plus(aliquotaAdicional);
    return valor.times(aliquotaTotal);
}
function calcularCustoAssinatura(custoMensal, meses) {
    let custoTotal = new decimal_js_1.default(0);
    let custoMensalAtual = new decimal_js_1.default(custoMensal);
    const reajusteAnual = new decimal_js_1.default(comparador_constants_1.AJUSTES_ASSINATURA.REAJUSTE_ANUAL_PERCENT)
        .div(100)
        .plus(1);
    for (let mes = 1; mes <= meses; mes++) {
        custoTotal = custoTotal.plus(custoMensalAtual);
        if (mes % 12 === 0) {
            custoMensalAtual = custoMensalAtual.times(reajusteAnual);
        }
    }
    return custoTotal;
}
function calcularCustoOportunidade(capitalInvestido, anos) {
    const capital = new decimal_js_1.default(capitalInvestido);
    const taxaMensalCDI = new decimal_js_1.default(0.008);
    const meses = anos * 12;
    const montante = capital.times(new decimal_js_1.default(1).plus(taxaMensalCDI).pow(meses));
    return montante.minus(capital);
}
function arredondar(valor) {
    return valor.toDecimalPlaces(2).toNumber();
}
function calcularCenarioCompra(valorVeiculo, anos) {
    const manutencaoAnual = calcularManutencaoAnual(valorVeiculo);
    const ipvaAnual = calcularIPVAAnual(valorVeiculo);
    const seguroAnual = calcularSeguroAnual(valorVeiculo);
    const taxasFixasAnuais = new decimal_js_1.default((0, comparador_constants_1.calcularCustosFixosAnuais)());
    const manutencaoTotal = manutencaoAnual.times(anos);
    const ipvaTotal = ipvaAnual.times(anos);
    const seguroTotal = seguroAnual.times(anos);
    const taxasTotal = taxasFixasAnuais.times(anos);
    const depreciacao = calcularDepreciacao(valorVeiculo, anos);
    const valorRevenda = calcularValorDepreciado(valorVeiculo, anos);
    const custoOportunidade = calcularCustoOportunidade(valorVeiculo, anos);
    const custoTotal = new decimal_js_1.default(valorVeiculo)
        .plus(manutencaoTotal)
        .plus(ipvaTotal)
        .plus(seguroTotal)
        .plus(taxasTotal)
        .plus(custoOportunidade);
    const custoLiquido = custoTotal.minus(valorRevenda);
    return {
        nome: 'Compra à Vista',
        custoTotal: arredondar(custoTotal),
        valorRevenda: arredondar(valorRevenda),
        custoLiquido: arredondar(custoLiquido),
        breakdown: {
            custoAquisicao: valorVeiculo,
            manutencao: arredondar(manutencaoTotal),
            seguro: arredondar(seguroTotal),
            ipva: arredondar(ipvaTotal),
            taxasLicenciamento: arredondar(taxasTotal),
            depreciacao: arredondar(depreciacao),
            custoOportunidade: arredondar(custoOportunidade),
        },
    };
}
function calcularCenarioFinanciamento(valorVeiculo, entrada, prazoMeses, anos) {
    const valorFinanciado = valorVeiculo - entrada;
    const iof = calcularIOFFinanciamento(valorFinanciado, prazoMeses);
    const valorFinanciadoComIOF = new decimal_js_1.default(valorFinanciado).plus(iof);
    const parcela = calcularParcelaFinanciamento(valorFinanciadoComIOF.toNumber(), prazoMeses, comparador_constants_1.TAXAS_FINANCIAMENTO.TAXA_MENSAL_PERCENT);
    const totalFinanciamento = parcela.times(prazoMeses);
    const juros = totalFinanciamento.minus(valorFinanciadoComIOF);
    const manutencaoAnual = calcularManutencaoAnual(valorVeiculo);
    const ipvaAnual = calcularIPVAAnual(valorVeiculo);
    const seguroAnual = calcularSeguroAnual(valorVeiculo);
    const taxasFixasAnuais = new decimal_js_1.default((0, comparador_constants_1.calcularCustosFixosAnuais)());
    const manutencaoTotal = manutencaoAnual.times(anos);
    const ipvaTotal = ipvaAnual.times(anos);
    const seguroTotal = seguroAnual.times(anos);
    const taxasTotal = taxasFixasAnuais.times(anos);
    const depreciacao = calcularDepreciacao(valorVeiculo, anos);
    const valorRevenda = calcularValorDepreciado(valorVeiculo, anos);
    const custoOportunidade = calcularCustoOportunidade(entrada, anos);
    const custoTotal = new decimal_js_1.default(entrada)
        .plus(totalFinanciamento)
        .plus(manutencaoTotal)
        .plus(ipvaTotal)
        .plus(seguroTotal)
        .plus(taxasTotal)
        .plus(custoOportunidade);
    const custoLiquido = custoTotal.minus(valorRevenda);
    return {
        nome: 'Financiamento',
        custoTotal: arredondar(custoTotal),
        valorRevenda: arredondar(valorRevenda),
        custoLiquido: arredondar(custoLiquido),
        breakdown: {
            custoAquisicao: entrada + arredondar(totalFinanciamento),
            manutencao: arredondar(manutencaoTotal),
            seguro: arredondar(seguroTotal),
            ipva: arredondar(ipvaTotal),
            taxasLicenciamento: arredondar(taxasTotal),
            depreciacao: arredondar(depreciacao),
            custoOportunidade: arredondar(custoOportunidade),
            jurosFinanciamento: arredondar(juros),
            iofFinanciamento: arredondar(iof),
        },
    };
}
function calcularCenarioAssinatura(custoMensal, prazoMeses, anos) {
    const custoAssinatura = calcularCustoAssinatura(custoMensal, anos * 12);
    const custoTotal = custoAssinatura;
    const custoLiquido = custoTotal;
    return {
        nome: 'Assinatura',
        custoTotal: arredondar(custoTotal),
        valorRevenda: 0,
        custoLiquido: arredondar(custoLiquido),
        breakdown: {
            custoAquisicao: 0,
            manutencao: 0,
            seguro: 0,
            ipva: 0,
            taxasLicenciamento: 0,
            depreciacao: 0,
            custoOportunidade: 0,
            custoAssinatura: arredondar(custoAssinatura),
        },
    };
}
function compararCenarios(valorVeiculo, entrada, prazoFinanciamentoMeses, custoMensalAssinatura, prazoAssinaturaMeses, anos) {
    const compraVista = calcularCenarioCompra(valorVeiculo, anos);
    const financiamento = calcularCenarioFinanciamento(valorVeiculo, entrada, prazoFinanciamentoMeses, anos);
    const assinatura = calcularCenarioAssinatura(custoMensalAssinatura, prazoAssinaturaMeses, anos);
    const cenarios = [
        { nome: 'compraVista', custoLiquido: compraVista.custoLiquido },
        { nome: 'financiamento', custoLiquido: financiamento.custoLiquido },
        { nome: 'assinatura', custoLiquido: assinatura.custoLiquido },
    ];
    cenarios.sort((a, b) => a.custoLiquido - b.custoLiquido);
    const melhorOpcao = cenarios[0].nome;
    const economiaMaxima = cenarios[2].custoLiquido - cenarios[0].custoLiquido;
    return {
        compraVista,
        financiamento,
        assinatura,
        melhorOpcao,
        economiaMaxima: arredondar(new decimal_js_1.default(economiaMaxima)),
    };
}
//# sourceMappingURL=comparador.calc.js.map