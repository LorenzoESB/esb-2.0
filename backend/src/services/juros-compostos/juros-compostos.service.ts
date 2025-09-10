import type { JurosCompostosInput, JurosCompostosDetalhadoOutput } from "../../models/juros-compostos/juros-compostos.model";
import { parseAndFormatBRL } from "../../utils/currencyFormatter";

const aliquotasIR = {
	ate180: 0.225,
	ate360: 0.2,
	ate720: 0.175,
	acima720: 0.15,
};

function getAliquotaIR(meses: number): number {
	if (meses <= 180) return aliquotasIR.ate180;
	if (meses <= 360) return aliquotasIR.ate360;
	if (meses <= 720) return aliquotasIR.ate720;
	return aliquotasIR.acima720;
}

function formatBRLNumber(value: number): number {
	return parseFloat(parseAndFormatBRL(value));
}

function converterParaDias(tempo: number, unidade: "meses" | "anos"): number {
	if (unidade === "anos") {
		return tempo * 365; // 1 ano = 365 dias
	}
	return tempo * 30; // 1 mês = 30 dias (aproximação padrão)
}

function converterParaMeses(tempo: number, unidade: "meses" | "anos"): number {
	if (unidade === "anos") {
		return tempo * 12;
	}
	return tempo;
}

export default async function calculaJurosCompostos({
	valorInicial,
	aporteMensal,
	tempoAplicacao,
    tempoAplicacaoUnidade,
	taxaJuros,
}: JurosCompostosInput): Promise<JurosCompostosDetalhadoOutput> {
	const totalInvestido = valorInicial + aporteMensal * tempoAplicacao;
	const taxaMensal = taxaJuros / 100 / 12;
    
	const tempoEmMeses = converterParaMeses(tempoAplicacao, tempoAplicacaoUnidade);
	const tempoEmDias = converterParaDias(tempoAplicacao, tempoAplicacaoUnidade);

	const montanteComJuros = totalInvestido * (1 + taxaMensal * tempoAplicacao);
	const aliquota = getAliquotaIR(tempoEmDias);

	const rendimentoBruto = montanteComJuros - totalInvestido;
	const imposto = rendimentoBruto * aliquota;
	const rendimentoLiquido = rendimentoBruto - imposto;
	const valorFinal = totalInvestido + rendimentoLiquido;

	console.log({ valorFinal, totalInvestido, rendimentoBruto, imposto, rendimentoLiquido });

	return {
		resumo: {
			valorTotalFinal: formatBRLNumber(valorFinal),
			totalInvestido: formatBRLNumber(totalInvestido),
			totalEmJuros: formatBRLNumber(rendimentoLiquido),
		},
		detalhesMensais: [],
	};
}
