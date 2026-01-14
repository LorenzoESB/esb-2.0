"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const decimal_js_1 = require("decimal.js");
const renda_fixa_calc_1 = require("./calc/renda-fixa.calc");
decimal_js_1.default.set({ precision: 15 });
console.log('='.repeat(80));
console.log('RENDA FIXA CALCULATION TEST');
console.log('='.repeat(80));
console.log();
const investimento = 10000;
const prazoMeses = 12;
const selicAnual = 13.75;
const cdiAnual = 13.65;
const trMensal = 0.0;
console.log('INPUT PARAMETERS:');
console.log(`  Initial Investment: R$ ${investimento.toLocaleString('pt-BR')}`);
console.log(`  Period: ${prazoMeses} months`);
console.log(`  SELIC: ${selicAnual}% p.a.`);
console.log(`  CDI: ${cdiAnual}% p.a.`);
console.log(`  TR: ${trMensal}`);
console.log();
const resultado = (0, renda_fixa_calc_1.calcularInvestimentosRendaFixa)(investimento, prazoMeses, selicAnual, cdiAnual, trMensal);
console.log('ECONOMIC RATES (MONTHLY):');
console.log(`  SELIC monthly: ${resultado.poupanca.taxa.mul(100).toFixed(4)}%`);
console.log(`  CDI monthly: ${resultado.cdb.taxa.div(1.1).mul(100).toFixed(4)}%`);
console.log();
function formatModalidade(nome, modalidade) {
    const taxaMensal = modalidade.taxa.mul(100);
    const taxaAnual = new decimal_js_1.default(1)
        .plus(modalidade.taxa)
        .pow(12)
        .minus(1)
        .mul(100);
    const rendimentoLiquido = modalidade.resultado.minus(investimento);
    const percentualRetorno = rendimentoLiquido.div(investimento).mul(100);
    console.log(`${nome}:`);
    console.log(`  Monthly Rate: ${taxaMensal.toFixed(4)}%`);
    console.log(`  Annual Rate: ${taxaAnual.toFixed(2)}%`);
    console.log(`  Final Value: R$ ${modalidade.resultado.toFixed(2)}`);
    console.log(`  Net Return: R$ ${rendimentoLiquido.toFixed(2)} (${percentualRetorno.toFixed(2)}%)`);
    console.log(`  IR Withheld: R$ ${modalidade.imposto.toFixed(2)}`);
    console.log();
}
console.log('='.repeat(80));
console.log('RESULTS BY INVESTMENT TYPE:');
console.log('='.repeat(80));
console.log();
formatModalidade('POUPANÇA', resultado.poupanca);
formatModalidade('TESOURO DIRETO (SELIC)', resultado.tesouroDireto);
formatModalidade('LCI (91.5% CDI)', resultado.lci);
formatModalidade('CDB (110% CDI)', resultado.cdb);
console.log('='.repeat(80));
console.log('BEST INVESTMENT:');
console.log('='.repeat(80));
console.log(`  ${resultado.melhorInvestimento}`);
console.log(`  Return: R$ ${resultado.melhorRendimento.toFixed(2)}`);
console.log();
console.log('='.repeat(80));
console.log('COMPARISON WITH LEGACY EXPECTATIONS:');
console.log('='.repeat(80));
console.log();
const lciAnual = new decimal_js_1.default(1)
    .plus(resultado.lci.taxa)
    .pow(12)
    .minus(1)
    .mul(100);
const cdbAnual = new decimal_js_1.default(1)
    .plus(resultado.cdb.taxa)
    .pow(12)
    .minus(1)
    .mul(100);
const cdbGrossReturn = resultado.cdb.resultado
    .plus(resultado.cdb.imposto)
    .minus(investimento);
const cdbNetReturn = resultado.cdb.resultado.minus(investimento);
const cdbNetAnual = cdbNetReturn.div(investimento).mul(100);
console.log('LCI:');
console.log(`  Calculated: ${lciAnual.toFixed(2)}%`);
console.log(`  Expected: ~13.62%`);
console.log(`  Match: ${Math.abs(lciAnual.toNumber() - 13.62) < 0.5 ? '✅' : '⚠️'}`);
console.log();
console.log('CDB:');
console.log(`  Gross Annual Rate: ${cdbAnual.toFixed(2)}%`);
console.log(`  Net Annual Return (with IR): ${cdbNetAnual.toFixed(2)}%`);
console.log(`  Expected: ~13.09%`);
console.log(`  Match: ${Math.abs(cdbNetAnual.toNumber() - 13.09) < 1.0 ? '⚠️ Close' : '❌'}`);
console.log();
console.log('='.repeat(80));
console.log('NOTES:');
console.log('='.repeat(80));
console.log('• LCI uses 91.5% of CDI (corrected from 90%)');
console.log('• CDB uses 110% of CDI with IR applied on gains');
console.log('• Monthly rates reflect actual instrument yields (not blended averages)');
console.log('• No monthly contributions (aportes) included');
console.log('• IR applied at end of period based on total days');
console.log('• Expected values may vary with current BCB rates');
console.log('='.repeat(80));
//# sourceMappingURL=test-calculations.js.map