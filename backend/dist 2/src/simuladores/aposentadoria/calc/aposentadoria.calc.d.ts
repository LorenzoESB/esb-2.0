import Decimal from 'decimal.js';
export declare function calcularValorFuturoCapitalInicial(capitalInicial: number | string | Decimal, taxaMensal: number | string | Decimal, meses: number): Decimal;
export declare function calcularValorFuturoPagamentos(pagamentoMensal: number | string | Decimal, taxaMensal: number | string | Decimal, meses: number): Decimal;
export declare function calcularValorPresente(rendaMensal: number | string | Decimal, taxaMensal: number | string | Decimal, meses: number): Decimal;
export declare function calcularPagamentoMensal(valorPresente: number | string | Decimal, taxaMensal: number | string | Decimal, meses: number): Decimal;
export declare function calcularRendaMensal(valorPresente: number | string | Decimal, taxaMensal: number | string | Decimal, meses: number): Decimal;
export declare function calcularTaxaAnual(taxaMensal: number | string | Decimal): Decimal;
export declare function calcularDuracaoPatrimonio(patrimonio: number | string | Decimal, saqueMensal: number | string | Decimal, taxaMensal: number | string | Decimal): number;
export declare function calcularSaldoAposSaques(patrimonioInicial: number | string | Decimal, saqueMensal: number | string | Decimal, taxaMensal: number | string | Decimal, meses: number): Decimal;
