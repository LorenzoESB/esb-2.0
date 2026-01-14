"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transformarTaxaAnualMensal = transformarTaxaAnualMensal;
exports.calcularValorFuturo = calcularValorFuturo;
exports.calcularInvestimentoSimples = calcularInvestimentoSimples;
exports.calcularDescontoImposto = calcularDescontoImposto;
exports.calcularInvestimentosRendaFixa = calcularInvestimentosRendaFixa;
const decimal_js_1 = require("decimal.js");
decimal_js_1.default.set({ precision: 15 });
function transformarTaxaAnualMensal(taxaAnual) {
    const taxa = new decimal_js_1.default(taxaAnual).div(100);
    const resultado = taxa.plus(1).pow(new decimal_js_1.default(1).div(12)).minus(1).mul(100);
    return resultado;
}
function calcularValorFuturo(investimento, taxa, prazoMeses) {
    const inv = new decimal_js_1.default(investimento);
    const t = new decimal_js_1.default(taxa);
    const f = new decimal_js_1.default(1).plus(t).pow(prazoMeses);
    return inv.mul(f);
}
function calcularInvestimentoSimples(possuiImposto, capitalInicial, periodoMeses, taxaJurosMensal) {
    const capital = new decimal_js_1.default(capitalInicial);
    const taxa = new decimal_js_1.default(taxaJurosMensal);
    if (possuiImposto) {
        const valorBruto = capital.mul(new decimal_js_1.default(1).plus(taxa).pow(periodoMeses));
        const rendimentoBruto = valorBruto.minus(capital);
        const prazoDias = periodoMeses * 30;
        const descontoIR = calcularDescontoImposto(prazoDias);
        const rendimentoLiquido = rendimentoBruto.mul(descontoIR);
        const impostoRetido = rendimentoBruto.minus(rendimentoLiquido);
        const valorLiquido = capital.plus(rendimentoLiquido);
        return [valorLiquido, impostoRetido];
    }
    else {
        const valorFinal = capital.mul(new decimal_js_1.default(1).plus(taxa).pow(periodoMeses));
        return [valorFinal, new decimal_js_1.default(0)];
    }
}
function calcularDescontoImposto(prazoDias) {
    if (prazoDias > 720) {
        return new decimal_js_1.default(0.85);
    }
    else if (prazoDias <= 720 && prazoDias > 360) {
        return new decimal_js_1.default(0.825);
    }
    else if (prazoDias <= 360 && prazoDias > 180) {
        return new decimal_js_1.default(0.8);
    }
    else {
        return new decimal_js_1.default(0.775);
    }
}
function calcularInvestimentosRendaFixa(investimento, periodoMeses, selicAnual, cdiAnual, trMensal, apiResponse) {
    const selic = transformarTaxaAnualMensal(selicAnual).div(100);
    const cdi = transformarTaxaAnualMensal(cdiAnual).div(100);
    const tr = new decimal_js_1.default(trMensal);
    const poupanca = tr.plus(new decimal_js_1.default(0.005));
    const tesouroDireto = selic;
    const [resultPoup, impostoPoup] = calcularInvestimentoSimples(false, investimento, periodoMeses, poupanca);
    const [resultTesouroDireto, impostoTesouroDireto] = calcularInvestimentoSimples(true, investimento, periodoMeses, tesouroDireto);
    let resultLci;
    let impostoLci;
    let taxaLci;
    let resultCdb;
    let impostoCdb;
    let taxaCdb;
    if (apiResponse && apiResponse.resultados) {
        const apiLci = apiResponse.resultados.LCI;
        const apiCdb = apiResponse.resultados.CDB;
        if (apiLci && apiLci.vl && apiLci.vl > 0) {
            resultLci = new decimal_js_1.default(apiLci.vl);
            impostoLci = new decimal_js_1.default(0);
            taxaLci = new decimal_js_1.default(apiLci.rlm || 0).div(100);
        }
        else {
            taxaLci = new decimal_js_1.default(0.9).mul(cdi);
            [resultLci, impostoLci] = calcularInvestimentoSimples(false, investimento, periodoMeses, taxaLci);
        }
        if (apiCdb && apiCdb.vl && apiCdb.vl > 0) {
            resultCdb = new decimal_js_1.default(apiCdb.vl);
            const rendimentoBruto = resultCdb.minus(investimento);
            impostoCdb = rendimentoBruto.mul(new decimal_js_1.default(1).minus(calcularDescontoImposto(periodoMeses * 30)));
            taxaCdb = new decimal_js_1.default(apiCdb.rlm || 0).div(100);
        }
        else {
            taxaCdb = new decimal_js_1.default(1.1).mul(cdi);
            [resultCdb, impostoCdb] = calcularInvestimentoSimples(true, investimento, periodoMeses, taxaCdb);
        }
    }
    else {
        taxaLci = new decimal_js_1.default(0.9).mul(cdi);
        [resultLci, impostoLci] = calcularInvestimentoSimples(false, investimento, periodoMeses, taxaLci);
        taxaCdb = new decimal_js_1.default(1.1).mul(cdi);
        [resultCdb, impostoCdb] = calcularInvestimentoSimples(true, investimento, periodoMeses, taxaCdb);
    }
    const investido = new decimal_js_1.default(investimento);
    const investimentos = [resultPoup, resultLci, resultCdb, resultTesouroDireto];
    const nomes = ['Poupança', 'LCI', 'CDB', 'Tesouro Direto'];
    const melhorIndex = investimentos.reduce((maxIdx, valor, idx, arr) => (valor.gt(arr[maxIdx]) ? idx : maxIdx), 0);
    const melhorInvestimento = nomes[melhorIndex];
    const melhorRendimento = investimentos[melhorIndex].minus(investido);
    return {
        poupanca: {
            taxa: poupanca,
            resultado: resultPoup,
            imposto: impostoPoup,
        },
        tesouroDireto: {
            taxa: tesouroDireto,
            resultado: resultTesouroDireto,
            imposto: impostoTesouroDireto,
        },
        lci: {
            taxa: taxaLci,
            resultado: resultLci,
            imposto: impostoLci,
        },
        cdb: {
            taxa: taxaCdb,
            resultado: resultCdb,
            imposto: impostoCdb,
        },
        investido,
        melhorInvestimento,
        melhorRendimento,
        taxaSelic: new decimal_js_1.default(selicAnual),
        taxaCdi: new decimal_js_1.default(cdiAnual),
    };
}
//# sourceMappingURL=renda-fixa.calc.js.map