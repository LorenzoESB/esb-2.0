import Decimal from 'decimal.js';
export declare function calcularParcelaPRICE(valorEmprestimo: number, prazoMeses: number, taxaJurosMensal: number): Decimal;
export declare function calcularParcelaSAC(valorEmprestimo: number, prazoMeses: number, taxaJurosMensal: number): Decimal;
export declare function converterTaxaAnualParaMensal(taxaAnual: number): Decimal;
export declare function converterTaxaMensalParaAnual(taxaMensal: number): Decimal;
export declare function calcularTotalPago(parcelaMensal: number, prazoMeses: number): Decimal;
export declare function calcularTotalJuros(totalPago: number, valorEmprestimo: number): Decimal;
export declare function calcularTaxaEfetivaAnual(totalPago: number, valorEmprestimo: number, prazoMeses: number): Decimal;
export declare function calcularComprometimentoRenda(parcelaMensal: number, rendaMensal: number): Decimal;
export declare function arredondar2Decimais(valor: Decimal): number;
export declare function arredondar4Decimais(valor: Decimal): number;
export interface CalculoEmprestimo {
    parcelaMensal: number;
    totalPago: number;
    totalJuros: number;
    taxaJurosMensal: number;
    taxaJurosAnual: number;
    taxaEfetivaAnual: number;
    valorEmprestimo: number;
    prazoMeses: number;
}
export declare function calcularEmprestimoPRICE(valorEmprestimo: number, prazoMeses: number, taxaJurosMensal: number): CalculoEmprestimo;
