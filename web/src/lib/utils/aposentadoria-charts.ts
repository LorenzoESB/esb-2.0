import type { ResultadoAposentadoria } from "../schemas/aposentadoria.schema";

export interface AcumulacaoChartData {
  ano: number;
  idade: number;
  contribuicaoAcumulada: number;
  rendimentos: number;
  saldoTotal: number;
}

export interface UsufrutoChartData {
  ano: number;
  idade: number;
  saldo: number;
  rendaMensal: number;
  tipo: "Sustentavel" | "Com Principal" | "Esgotado";
}

/**
 * Calcula os dados para o grafico de acumulacao
 * Mostra a evolucao do patrimonio durante a fase de contribuicao
 */
export function calcularDadosAcumulacao(
  data: ResultadoAposentadoria,
): AcumulacaoChartData[] {
  const { parametros, acumulacao } = data;
  const { idadeAtual, valorJaAcumulado, taxaJurosMensal } = parametros;
  const { contribuicaoMensal, anosContribuicao } = acumulacao;

  const dadosAnuais: AcumulacaoChartData[] = [];
  let saldoAtual = valorJaAcumulado;
  let contribuicaoAcumulada = valorJaAcumulado;

  // Ano 0 (inicio)
  dadosAnuais.push({
    ano: 0,
    idade: idadeAtual,
    contribuicaoAcumulada: valorJaAcumulado,
    rendimentos: 0,
    saldoTotal: valorJaAcumulado,
  });

  // Calcula ano a ano
  for (let ano = 1; ano <= anosContribuicao; ano++) {
    const saldoAnoAnterior = saldoAtual;
    let contribuicaoDoAno = 0;

    // Simula mes a mes durante o ano
    for (let mes = 0; mes < 12; mes++) {
      saldoAtual = saldoAtual * (1 + taxaJurosMensal) + contribuicaoMensal;
      contribuicaoDoAno += contribuicaoMensal;
    }

    contribuicaoAcumulada += contribuicaoDoAno;
    const rendimentosAcumulados = saldoAtual - contribuicaoAcumulada;

    dadosAnuais.push({
      ano,
      idade: idadeAtual + ano,
      contribuicaoAcumulada: Math.round(contribuicaoAcumulada),
      rendimentos: Math.round(rendimentosAcumulados),
      saldoTotal: Math.round(saldoAtual),
    });
  }

  return dadosAnuais;
}

/**
 * Calcula os dados para o grafico de usufruto/sustentabilidade
 * Mostra por quanto tempo o dinheiro dura e quando se esgota
 */
export function calcularDadosUsufruto(
  data: ResultadoAposentadoria,
): UsufrutoChartData[] {
  const { parametros, acumulacao, usufruto, sustentabilidade } = data;
  const { idadeAposentadoria, taxaJurosMensal } = parametros;
  const { valorTotalAcumulado } = acumulacao;
  const { rendaMensal } = usufruto;

  const dadosAnuais: UsufrutoChartData[] = [];
  let saldoAtual = valorTotalAcumulado;
  const rendimentoMensalPuro = sustentabilidade.rendimentoMensalPuro;

  // Determina quantos anos simular (maximo 50 anos ou ate esgotamento)
  const maxAnos = 50;
  let anoAtual = 0;

  // Ano 0 (inicio da aposentadoria)
  dadosAnuais.push({
    ano: 0,
    idade: idadeAposentadoria,
    saldo: Math.round(saldoAtual),
    rendaMensal: rendaMensal,
    tipo: rendaMensal <= rendimentoMensalPuro ? "Sustentavel" : "Com Principal",
  });

  // Calcula ano a ano
  for (let ano = 1; ano <= maxAnos; ano++) {
    if (saldoAtual <= 0) break;

    // Simula mes a mes durante o ano
    for (let mes = 0; mes < 12; mes++) {
      // Aplica rendimento
      saldoAtual = saldoAtual * (1 + taxaJurosMensal);
      // Saca a renda mensal
      saldoAtual -= rendaMensal;

      if (saldoAtual <= 0) {
        saldoAtual = 0;
        break;
      }
    }

    const tipo: "Sustentavel" | "Com Principal" | "Esgotado" =
      saldoAtual <= 0
        ? "Esgotado"
        : rendaMensal <= rendimentoMensalPuro
          ? "Sustentavel"
          : "Com Principal";

    dadosAnuais.push({
      ano,
      idade: idadeAposentadoria + ano,
      saldo: Math.round(Math.max(0, saldoAtual)),
      rendaMensal: rendaMensal,
      tipo,
    });

    anoAtual = ano;
  }

  return dadosAnuais;
}

/**
 * Formata valores para exibicao no grafico
 */
export function formatarValorGrafico(valor: number): string {
  if (valor >= 1000000) {
    return `R$ ${(valor / 1000000).toFixed(1)}M`;
  }
  if (valor >= 1000) {
    return `R$ ${(valor / 1000).toFixed(0)}k`;
  }
  return `R$ ${valor.toFixed(0)}`;
}
