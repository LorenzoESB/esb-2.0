import Decimal from 'decimal.js';
export interface CustosBreakdown {
    custoAquisicao: number;
    manutencao: number;
    seguro: number;
    ipva: number;
    taxasLicenciamento: number;
    depreciacao: number;
    custoOportunidade: number;
    custoAssinatura?: number;
    jurosFinanciamento?: number;
    iofFinanciamento?: number;
}
export interface ResultadoCenario {
    nome: string;
    custoTotal: number;
    valorRevenda: number;
    custoLiquido: number;
    breakdown: CustosBreakdown;
}
export declare function calcularManutencaoAnual(valorVeiculo: number): Decimal;
export declare function calcularIPVAAnual(valorVeiculo: number): Decimal;
export declare function calcularSeguroAnual(valorVeiculo: number): Decimal;
export declare function calcularValorDepreciado(valorInicial: number, anos: number): Decimal;
export declare function calcularDepreciacao(valorInicial: number, anos: number): Decimal;
export declare function calcularParcelaFinanciamento(principal: number, meses: number, taxaMensal: number): Decimal;
export declare function calcularIOFFinanciamento(valorFinanciado: number, meses: number): Decimal;
export declare function calcularCustoAssinatura(custoMensal: number, meses: number): Decimal;
export declare function calcularCustoOportunidade(capitalInvestido: number, anos: number): Decimal;
export declare function calcularCenarioCompra(valorVeiculo: number, anos: number): ResultadoCenario;
export declare function calcularCenarioFinanciamento(valorVeiculo: number, entrada: number, prazoMeses: number, anos: number): ResultadoCenario;
export declare function calcularCenarioAssinatura(custoMensal: number, prazoMeses: number, anos: number): ResultadoCenario;
export interface ResultadoComparacao {
    compraVista: ResultadoCenario;
    financiamento: ResultadoCenario;
    assinatura: ResultadoCenario;
    melhorOpcao: 'compraVista' | 'financiamento' | 'assinatura';
    economiaMaxima: number;
}
export declare function compararCenarios(valorVeiculo: number, entrada: number, prazoFinanciamentoMeses: number, custoMensalAssinatura: number, prazoAssinaturaMeses: number, anos: number): ResultadoComparacao;
