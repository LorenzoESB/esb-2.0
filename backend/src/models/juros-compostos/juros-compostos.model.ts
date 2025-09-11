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
	valorTotalFinal?: number;
	valorTotalFinalBruto: number;
	totalEmJurosBruto: number;
	impostoRenda?: number;
	aliquotaIR?: number;
	totalInvestido: number;
	totalEmJuros?: number;
}

export interface JurosCompostosMensal {
	mes: number;
	valorInvestido: number;
	valorComJuros: number;
	jurosDoMes: number;
	jurosAcumulados: number;
}

export interface DetalhesMensal {
	mes: number;
	saldoAnterior: number;
	rendimentoMes: number;
	aporte: number;
	novoSaldo: number;
	rendimentoAcumulado: number;
	totalAportado: number;
}

export interface CalculoCompleto {
	saldoFinal: number;
	rendimentoTotalBruto: number;
	totalAportado: number;
	detalhesMensais: DetalhesMensal[];
}
