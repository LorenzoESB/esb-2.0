import type { JurosCompostosInput, JurosCompostosDetalhadoOutput, DetalhesMensal, CalculoCompleto } from "../../models/juros-compostos/juros-compostos.model";

const aliquotasIR = {
	ate180: 0.225,    // 22,5%
	ate360: 0.2,      // 20%
	ate720: 0.175,    // 17,5%
	acima720: 0.15,   // 15%
};

function getAliquotaIR(dias: number): number {
	if (dias <= 180) return aliquotasIR.ate180;
	if (dias <= 360) return aliquotasIR.ate360;
	if (dias <= 720) return aliquotasIR.ate720;
	return aliquotasIR.acima720;
}

function converterParaDias(tempo: number, unidade: "meses" | "anos"): number {
	if (unidade === "anos") {
		return tempo * 365;
	}
	return tempo * 30;
}

function calcularJurosCompostosMesAMes(
	valorInicial: number,
	aporteMensal: number,
	periodoMeses: number,
	taxaJurosAnual: number
): CalculoCompleto {
	const taxaMensal = Math.pow(1 + (taxaJurosAnual / 100), 1 / 12) - 1;
	
	let saldo = valorInicial;
	let totalAportado = valorInicial;
	let rendimentoAcumulado = 0;
	const detalhesMensais: DetalhesMensal[] = [];

	for (let mes = 1; mes <= periodoMeses; mes++) {
		const saldoAnterior = saldo;
		
		const rendimentoMes = saldo * taxaMensal;
		const aporteDoMes = aporteMensal;
		const novoSaldo = saldo + rendimentoMes + aporteDoMes;
		
		rendimentoAcumulado += rendimentoMes;
		totalAportado += aporteMensal;
		
		detalhesMensais.push({
			mes,
			saldoAnterior,
			rendimentoMes,
			aporte: aporteDoMes,
			novoSaldo,
			rendimentoAcumulado,
			totalAportado
		});
		
		saldo = novoSaldo;
	}

	return {
		saldoFinal: saldo,
		rendimentoTotalBruto: rendimentoAcumulado,
		totalAportado,
		detalhesMensais
	};
}

export default async function calculaJurosCompostos({
	valorInicial,
	aporteMensal,
	tempoAplicacao,
	tempoAplicacaoUnidade,
	taxaJuros,
}: JurosCompostosInput): Promise<JurosCompostosDetalhadoOutput> {
	
	const periodoMeses = tempoAplicacaoUnidade === "anos" ? tempoAplicacao * 12 : tempoAplicacao;
	
	const tempoEmDias = converterParaDias(tempoAplicacao, tempoAplicacaoUnidade);
	
	const calculo = calcularJurosCompostosMesAMes(
		valorInicial,
		aporteMensal,
		periodoMeses,
		taxaJuros
	);
	
	const aliquotaIR = getAliquotaIR(tempoEmDias);
	const rendimentoBruto = calculo.rendimentoTotalBruto;
	const impostoRenda = rendimentoBruto * aliquotaIR;
	const rendimentoLiquido = rendimentoBruto - impostoRenda;
	// const valorFinalLiquido = calculo.totalAportado + rendimentoLiquido;
	
	const detalhesMensaisFormatados = calculo.detalhesMensais.map(detalhe => ({
		mes: detalhe.mes,
		valorInvestido: parseFloat(detalhe.totalAportado.toFixed(2)),
		valorComJuros: parseFloat(detalhe.novoSaldo.toFixed(2)),
		jurosDoMes: parseFloat(detalhe.rendimentoMes.toFixed(2)),
		jurosAcumulados: parseFloat(detalhe.rendimentoAcumulado.toFixed(2)),
	}));

	return {
		resumo: {
			valorTotalFinalBruto: parseFloat(calculo.saldoFinal.toFixed(2)),
			totalInvestido: parseFloat(calculo.totalAportado.toFixed(2)),
			totalEmJurosBruto: parseFloat(rendimentoBruto.toFixed(2)),
		},
		detalhesMensais: detalhesMensaisFormatados,
	};
}