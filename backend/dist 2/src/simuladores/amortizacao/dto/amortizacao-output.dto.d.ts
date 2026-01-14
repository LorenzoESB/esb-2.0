export declare class ParcelaDto {
    numero: number;
    dataVencimento?: string;
    saldoInicial: number;
    amortizacao: number;
    juros: number;
    prestacao: number;
    seguro: number;
    taxaAdministracao: number;
    pagamentoTotal: number;
    saldoFinal: number;
    amortizacaoExtraordinaria?: number;
    amortizacaoAcumulada: number;
    jurosAcumulados: number;
}
export declare class ResumoAmortizacaoDto {
    valorFinanciamento: number;
    taxaJurosAnual: number;
    taxaJurosMensal: number;
    prazoOriginal: number;
    prazoEfetivo: number;
    totalPago: number;
    totalJuros: number;
    totalAmortizacao: number;
    totalSeguro: number;
    totalTaxaAdministracao: number;
    totalAmortizacoesExtraordinarias: number;
    prestacaoMedia: number;
    primeiraPrestacao: number;
    ultimaPrestacao: number;
    sistemaAmortizacao: string;
    custoEfetivoTotal: number;
}
export declare class AmortizacaoOutputDto {
    resumo: ResumoAmortizacaoDto;
    parcelas: ParcelaDto[];
    graficoDados?: {
        labels: string[];
        saldoDevedor: number[];
        amortizacao: number[];
        juros: number[];
        prestacao: number[];
    };
}
export declare class SimulacaoComparativaDto {
    simulacoes: AmortizacaoSimplesOutputDto[];
    analiseComparativa: {
        sistemaComMenorPrestacao: string;
        sistemaComMenorPrazo: string;
        diferencaPrestacao: number;
    };
}
export declare class ResumoSimplesDto {
    sistemaAmortizacao: string;
    novaPrestacao: number;
    prazoRestante: number;
    saldoDevedor: number;
    novaAmortizacaoMensal?: number;
    reducaoPrazo?: number;
    reducaoPrestacao?: number;
    economiaJuros?: number;
}
export declare class AmortizacaoSimplesOutputDto {
    resumo: ResumoSimplesDto;
    mensagem?: string;
}
