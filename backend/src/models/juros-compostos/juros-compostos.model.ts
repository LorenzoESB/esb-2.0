export interface JurosCompostosInput {
    valorInicial: number;
    aporteMensal: number;
    tempoAplicacao: number;
    tempoAplicacaoUnidade: "meses" | "anos";
    taxaJuros: number;
}

export interface JurosCompostosDetalhadoOutput {
    resumo: JurosCompostosOutput;
    detalhesMensais: JurosCompostosMensal[];
}

export interface JurosCompostosOutput {
    valorTotalFinal: number;
    totalInvestido: number;
    totalEmJuros: number;
}

export interface JurosCompostosMensal {
    mes: number;
    juros: number;
    totalInvestido: number;
    totalJuros: number;
    valorAcumulado: number;
}

