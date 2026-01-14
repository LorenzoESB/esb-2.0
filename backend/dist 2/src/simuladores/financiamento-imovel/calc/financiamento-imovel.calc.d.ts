import Decimal from 'decimal.js';
export declare function calcularPrimeiraParcelaSAC(principal: number, periodos: number, taxaMensal: number): Decimal;
export declare function calcularUltimaParcelaSAC(principal: number, periodos: number, taxaMensal: number): Decimal;
export declare function calcularTotalPagoSAC(principal: number, periodos: number, taxaMensal: number): Decimal;
export declare function converterTaxaAnualParaMensal(taxaAnual: number): Decimal;
export declare function calcularComprometimentoRenda(parcela: number, renda: number): Decimal;
export declare function arredondar2Decimais(valor: Decimal): number;
export declare function arredondar4Decimais(valor: Decimal): number;
export interface CalculoFinanciamentoImovel {
    parcelaInicial: number;
    parcelaFinal: number;
    valorTotal: number;
    taxaJurosMensal: number;
    taxaJurosAnual: number;
    comprometimentoRenda: number;
}
export declare function calcularFinanciamentoSAC(valorFinanciado: number, prazoMeses: number, taxaJurosAnual: number, rendaMensal: number): CalculoFinanciamentoImovel;
