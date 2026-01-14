import Decimal from 'decimal.js';
export declare function calcularParcelaPRICE(principal: number, periodos: number, taxaMensal: number): Decimal;
export declare function calcularTotalPagoPRICE(parcelaMensal: number, periodos: number): Decimal;
export declare function calcularIOF(valorFinanciado: number, periodos: number): Decimal;
export declare function converterTaxaAnualParaMensal(taxaAnual: number): Decimal;
export declare function converterTaxaMensalParaAnual(taxaMensal: number): Decimal;
export declare function calcularComprometimentoRenda(parcela: number, renda: number): Decimal;
export declare function arredondar2Decimais(valor: Decimal): number;
export declare function arredondar4Decimais(valor: Decimal): number;
export interface CalculoFinanciamentoVeiculos {
    parcelaMensal: number;
    valorTotal: number;
    valorIOF: number;
    taxaJurosMensal: number;
    taxaJurosAnual: number;
    comprometimentoRenda: number;
}
export declare function calcularFinanciamentoPRICE(valorFinanciado: number, prazoMeses: number, taxaJurosAnual: number, rendaMensal: number): CalculoFinanciamentoVeiculos;
