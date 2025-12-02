import Decimal from 'decimal.js';

/**
 * Configuração de precisão para todos os cálculos
 * Mantém precisão de 15 dígitos conforme o código legado
 */
Decimal.set({ precision: 15 });

/**
 * Transforma taxa anual em taxa mensal
 * Fórmula: ((taxaAnual/100 + 1)^(1/12) - 1) * 100
 *
 * @param taxaAnual - Taxa anual em percentual (ex: 13.75 para 13,75%)
 * @returns Taxa mensal em percentual
 */
export function transformarTaxaAnualMensal(taxaAnual: number): Decimal {
  const taxa = new Decimal(taxaAnual).div(100);
  const resultado = taxa
    .plus(1)
    .pow(new Decimal(1).div(12))
    .minus(1)
    .mul(100);
  return resultado;
}

/**
 * Calcula o valor futuro de um investimento com juros compostos
 * Fórmula: investimento * (1 + taxa)^prazoMeses
 *
 * @param investimento - Valor inicial investido
 * @param taxa - Taxa de juros mensal (em decimal, ex: 0.01 para 1%)
 * @param prazoMeses - Prazo em meses
 * @returns Valor futuro do investimento
 */
export function calcularValorFuturo(
  investimento: number,
  taxa: number | Decimal,
  prazoMeses: number,
): Decimal {
  const inv = new Decimal(investimento);
  const t = new Decimal(taxa);
  const f = new Decimal(1).plus(t).pow(prazoMeses);
  return inv.mul(f);
}

/**
 * Calcula o investimento com aporte mensal e imposto de renda (quando aplicável)
 * Implementa a lógica de cálculo mês a mês considerando IR progressivo
 *
 * @param possuiImposto - Se o investimento possui incidência de IR
 * @param capitalInicial - Valor inicial investido
 * @param periodoMeses - Período em meses
 * @param taxaJurosReal - Taxa de juros real mensal (em decimal)
 * @param aporteMensal - Valor do aporte mensal
 * @returns Array com [valorTotal, impostoRetido]
 */
export function calcularInvestimentoComAporteMensal(
  possuiImposto: boolean,
  capitalInicial: number,
  periodoMeses: number,
  taxaJurosReal: number | Decimal,
  aporteMensal: number,
): [Decimal, Decimal] {
  const capital = new Decimal(capitalInicial);
  const taxa = new Decimal(taxaJurosReal);
  const aporte = new Decimal(aporteMensal);

  if (possuiImposto) {
    let jurosMesesSubsequentes = new Decimal(0);
    let jurosMesesSubsequentesSemImposto = new Decimal(0);

    // Investimento inicial com taxa e imposto do primeiro mês
    const taxaPrimeiroMes = taxa.mul(calcularDescontoImposto(30));
    let investimentoMesesSubsequentes = capital.mul(
      new Decimal(1).plus(taxaPrimeiroMes),
    );
    let investimentoMesesSubsequentesSemImposto = capital.mul(
      new Decimal(1).plus(taxa),
    );

    for (let i = 1; i <= periodoMeses; i++) {
      const taxaComImposto = taxa.mul(calcularDescontoImposto(30 * i));
      investimentoMesesSubsequentes = investimentoMesesSubsequentes.plus(
        capital.mul(taxaComImposto),
      );
      investimentoMesesSubsequentesSemImposto =
        investimentoMesesSubsequentesSemImposto.plus(capital.mul(taxa));

      jurosMesesSubsequentes = jurosMesesSubsequentes.plus(
        aporte.mul(new Decimal(1).plus(taxaComImposto).pow(i)),
      );
      jurosMesesSubsequentesSemImposto = jurosMesesSubsequentesSemImposto.plus(
        aporte.mul(new Decimal(1).plus(taxa).pow(i)),
      );
    }

    const valorTotal = jurosMesesSubsequentes.plus(
      investimentoMesesSubsequentes,
    );
    const imposto = jurosMesesSubsequentesSemImposto
      .plus(investimentoMesesSubsequentesSemImposto)
      .minus(valorTotal);

    return [valorTotal, imposto];
  } else {
    // Sem imposto
    let jurosMesesSubsequentes = new Decimal(0);
    let investimentoMesesSubsequentes = capital.mul(
      new Decimal(1).plus(taxa),
    );

    for (let i = 1; i <= periodoMeses; i++) {
      investimentoMesesSubsequentes = investimentoMesesSubsequentes.plus(
        capital.mul(taxa),
      );
      jurosMesesSubsequentes = jurosMesesSubsequentes.plus(
        aporte.mul(new Decimal(1).plus(taxa).pow(i)),
      );
    }

    const valorTotal = jurosMesesSubsequentes.plus(
      investimentoMesesSubsequentes,
    );
    return [valorTotal, new Decimal(0)];
  }
}

/**
 * Calcula o desconto do imposto de renda baseado no prazo
 * Tabela regressiva de IR:
 * - até 180 dias: 22,5% (77,5% líquido)
 * - 181 a 360 dias: 20% (80% líquido)
 * - 361 a 720 dias: 17,5% (82,5% líquido)
 * - acima de 720 dias: 15% (85% líquido)
 *
 * @param prazoDias - Prazo em dias
 * @returns Percentual líquido após imposto (ex: 0.775 para 77,5%)
 */
export function calcularDescontoImposto(prazoDias: number): Decimal {
  if (prazoDias > 720) {
    return new Decimal(0.85);
  } else if (prazoDias <= 720 && prazoDias > 360) {
    return new Decimal(0.825);
  } else if (prazoDias <= 360 && prazoDias > 180) {
    return new Decimal(0.8);
  } else {
    // prazoDias <= 180
    return new Decimal(0.775);
  }
}

/**
 * Calcula todos os investimentos de renda fixa comparando diferentes modalidades
 *
 * @param investimento - Valor inicial investido
 * @param aporteMensal - Aporte mensal
 * @param periodoMeses - Período em meses
 * @param selicAnual - Taxa Selic anual
 * @param cdiAnual - Taxa CDI anual
 * @param trMensal - Taxa TR mensal
 * @returns Objeto com resultados de todas as modalidades
 */
export function calcularInvestimentosRendaFixa(
  investimento: number,
  aporteMensal: number,
  periodoMeses: number,
  selicAnual: number,
  cdiAnual: number,
  trMensal: number,
): InvestimentosRendaFixa {
  const selic = transformarTaxaAnualMensal(selicAnual).div(100);
  const cdi = transformarTaxaAnualMensal(cdiAnual).div(100);
  const tr = new Decimal(trMensal);

  // Poupança: TR + 0,5% ao mês
  const poupanca = tr.plus(new Decimal(0.005));

  // Tesouro Direto: Selic (com IR)
  const tesouroDireto = selic;

  // LCI: 90% do CDI (isento de IR)
  const lci = new Decimal(0.9).mul(cdi);

  // CDB: 110% do CDI (com IR)
  const cdb = new Decimal(1.1).mul(cdi);

  // Calcular resultados
  const [resultPoup, impostoPoup] = calcularInvestimentoComAporteMensal(
    false,
    investimento,
    periodoMeses,
    poupanca,
    aporteMensal,
  );

  const [resultTesouroDireto, impostoTesouroDireto] =
    calcularInvestimentoComAporteMensal(
      true,
      investimento,
      periodoMeses,
      tesouroDireto,
      aporteMensal,
    );

  const [resultLci, impostoLci] = calcularInvestimentoComAporteMensal(
    false,
    investimento,
    periodoMeses,
    lci,
    aporteMensal,
  );

  const [resultCdb, impostoCdb] = calcularInvestimentoComAporteMensal(
    true,
    investimento,
    periodoMeses,
    cdb,
    aporteMensal,
  );

  const investido = new Decimal(investimento).plus(
    new Decimal(aporteMensal).mul(periodoMeses),
  );

  // Encontrar melhor investimento
  const investimentos = [resultPoup, resultLci, resultCdb, resultTesouroDireto];
  const nomes = ['Poupança', 'LCI', 'CDB', 'Tesouro Direto'];
  const melhorIndex = investimentos.reduce(
    (maxIdx, valor, idx, arr) =>
      valor.gt(arr[maxIdx]) ? idx : maxIdx,
    0,
  );

  const melhorInvestimento = nomes[melhorIndex];
  const melhorRendimento = investimentos[melhorIndex].minus(investido);

  return {
    poupanca: {
      taxa: poupanca,
      resultado: resultPoup,
      imposto: impostoPoup,
    },
    tesouroDireto: {
      taxa: tesouroDireto,
      resultado: resultTesouroDireto,
      imposto: impostoTesouroDireto,
    },
    lci: {
      taxa: lci,
      resultado: resultLci,
      imposto: impostoLci,
    },
    cdb: {
      taxa: cdb,
      resultado: resultCdb,
      imposto: impostoCdb,
    },
    investido,
    melhorInvestimento,
    melhorRendimento,
    taxaSelic: new Decimal(selicAnual),
    taxaCdi: new Decimal(cdiAnual),
  };
}

/**
 * Interface para resultado de cada tipo de investimento
 */
export interface ResultadoInvestimento {
  taxa: Decimal;
  resultado: Decimal;
  imposto: Decimal;
}

/**
 * Interface para retorno completo dos cálculos
 */
export interface InvestimentosRendaFixa {
  poupanca: ResultadoInvestimento;
  tesouroDireto: ResultadoInvestimento;
  lci: ResultadoInvestimento;
  cdb: ResultadoInvestimento;
  investido: Decimal;
  melhorInvestimento: string;
  melhorRendimento: Decimal;
  taxaSelic: Decimal;
  taxaCdi: Decimal;
}
