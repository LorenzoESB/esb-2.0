import Decimal from 'decimal.js';
export declare function transformarTaxaAnualMensal(taxaAnual: number): Decimal;
export declare function calcularValorFuturo(investimento: number, taxa: number | Decimal, prazoMeses: number): Decimal;
export declare function calcularInvestimentoSimples(possuiImposto: boolean, capitalInicial: number, periodoMeses: number, taxaJurosMensal: number | Decimal): [Decimal, Decimal];
export declare function calcularDescontoImposto(prazoDias: number): Decimal;
export declare function calcularInvestimentosRendaFixa(investimento: number, periodoMeses: number, selicAnual: number, cdiAnual: number, trMensal: number, apiResponse?: any): InvestimentosRendaFixa;
export interface ResultadoInvestimento {
    taxa: Decimal;
    resultado: Decimal;
    imposto: Decimal;
}
export interface InvestimentosRendaFixa {
    poupanca: ResultadoInvestimento;
    tesouroDireto: ResultadoInvestimento;
    lci: ResultadoInvestimento;
    cdb: ResultadoInvestimento;
    investido: Decimal;
    melhorInvestimento: string;
    melhorRendimento: Decimal;
    taxaSelic: Decimal;
    taxaCdi: Decimal;
}
