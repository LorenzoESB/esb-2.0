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
  const resultado = taxa.plus(1).pow(new Decimal(1).div(12)).minus(1).mul(100);
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
 * Calcula o investimento com imposto de renda progressivo (quando aplicável)
 * Aplica IR mês a mês conforme a tabela regressiva baseada no prazo acumulado
 *
 * @param possuiImposto - Se o investimento possui incidência de IR
 * @param capitalInicial - Valor inicial investido
 * @param periodoMeses - Período em meses
 * @param taxaJurosMensal - Taxa de juros mensal (em decimal, ex: 0.01 para 1%)
 * @returns Array com [valorTotal, impostoRetido]
 */
export function calcularInvestimentoSimples(
  possuiImposto: boolean,
  capitalInicial: number,
  periodoMeses: number,
  taxaJurosMensal: number | Decimal,
): [Decimal, Decimal] {
  const capital = new Decimal(capitalInicial);
  const taxa = new Decimal(taxaJurosMensal);

  if (possuiImposto) {
    // Calcular valor sem imposto (bruto)
    const valorBruto = capital.mul(new Decimal(1).plus(taxa).pow(periodoMeses));
    const rendimentoBruto = valorBruto.minus(capital);

    // Aplicar IR baseado no prazo total
    const prazoDias = periodoMeses * 30;
    const descontoIR = calcularDescontoImposto(prazoDias);
    const rendimentoLiquido = rendimentoBruto.mul(descontoIR);
    const impostoRetido = rendimentoBruto.minus(rendimentoLiquido);
    const valorLiquido = capital.plus(rendimentoLiquido);

    return [valorLiquido, impostoRetido];
  } else {
    // Sem imposto - cálculo direto de juros compostos
    const valorFinal = capital.mul(new Decimal(1).plus(taxa).pow(periodoMeses));
    return [valorFinal, new Decimal(0)];
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
 * NOTA: Esta versão NÃO inclui aportes mensais - apenas investimento inicial
 *
 * CRITICAL: Segue exatamente a lógica do legacy:
 * - Poupança: calculada localmente
 * - Tesouro Direto/SELIC: calculado localmente
 * - CDB: usa valores da API externa (se disponível)
 * - LCI: usa valores da API externa (se disponível)
 *
 * @param investimento - Valor inicial investido
 * @param periodoMeses - Período em meses
 * @param selicAnual - Taxa Selic anual (ex: 13.75 para 13.75%)
 * @param cdiAnual - Taxa CDI anual (ex: 13.65 para 13.65%)
 * @param trMensal - Taxa TR mensal (em decimal, ex: 0.001 para 0.1%)
 * @param apiResponse - Resposta da API externa (opcional, contém CDB e LCI)
 * @returns Objeto com resultados de todas as modalidades
 */
export function calcularInvestimentosRendaFixa(
  investimento: number,
  periodoMeses: number,
  selicAnual: number,
  cdiAnual: number,
  trMensal: number,
  apiResponse?: any,
): InvestimentosRendaFixa {
  const selic = transformarTaxaAnualMensal(selicAnual).div(100);
  const cdi = transformarTaxaAnualMensal(cdiAnual).div(100);
  const tr = new Decimal(trMensal);

  // Poupança: TR + 0,5% ao mês (SEMPRE calculada localmente)
  const poupanca = tr.plus(new Decimal(0.005));

  // Tesouro Direto: Selic (com IR) (SEMPRE calculado localmente)
  const tesouroDireto = selic;

  // Calcular Poupança (sempre local)
  const [resultPoup, impostoPoup] = calcularInvestimentoSimples(
    false,
    investimento,
    periodoMeses,
    poupanca,
  );

  // Calcular Tesouro Direto/SELIC (sempre local)
  const [resultTesouroDireto, impostoTesouroDireto] =
    calcularInvestimentoSimples(
      true,
      investimento,
      periodoMeses,
      tesouroDireto,
    );

  // CDB e LCI: Usar valores da API externa SE disponíveis, senão calcular localmente
  let resultLci: Decimal;
  let impostoLci: Decimal;
  let taxaLci: Decimal;
  let resultCdb: Decimal;
  let impostoCdb: Decimal;
  let taxaCdb: Decimal;

  if (apiResponse && apiResponse.resultados) {
    // Usar valores da API externa (como o legacy faz)
    const apiLci = apiResponse.resultados.LCI;
    const apiCdb = apiResponse.resultados.CDB;

    // LCI da API (se disponível e válida)
    if (apiLci && apiLci.vl && apiLci.vl > 0) {
      resultLci = new Decimal(apiLci.vl);
      impostoLci = new Decimal(0); // LCI is tax-exempt
      // Calculate effective monthly rate from API values
      taxaLci = new Decimal(apiLci.rlm || 0).div(100);
    } else {
      // Fallback: calcular localmente
      taxaLci = new Decimal(0.9).mul(cdi);
      [resultLci, impostoLci] = calcularInvestimentoSimples(
        false,
        investimento,
        periodoMeses,
        taxaLci,
      );
    }

    // CDB da API (se disponível e válida)
    if (apiCdb && apiCdb.vl && apiCdb.vl > 0) {
      resultCdb = new Decimal(apiCdb.vl);
      // Calculate tax from API values
      const rendimentoBruto = resultCdb.minus(investimento);
      impostoCdb = rendimentoBruto.mul(
        new Decimal(1).minus(calcularDescontoImposto(periodoMeses * 30)),
      );
      // Calculate effective monthly rate from API values
      taxaCdb = new Decimal(apiCdb.rlm || 0).div(100);
    } else {
      // Fallback: calcular localmente
      taxaCdb = new Decimal(1.1).mul(cdi);
      [resultCdb, impostoCdb] = calcularInvestimentoSimples(
        true,
        investimento,
        periodoMeses,
        taxaCdb,
      );
    }
  } else {
    // Sem API: calcular localmente (fallback)
    taxaLci = new Decimal(0.9).mul(cdi);
    [resultLci, impostoLci] = calcularInvestimentoSimples(
      false,
      investimento,
      periodoMeses,
      taxaLci,
    );

    taxaCdb = new Decimal(1.1).mul(cdi);
    [resultCdb, impostoCdb] = calcularInvestimentoSimples(
      true,
      investimento,
      periodoMeses,
      taxaCdb,
    );
  }

  const investido = new Decimal(investimento);

  // Encontrar melhor investimento
  const investimentos = [resultPoup, resultLci, resultCdb, resultTesouroDireto];
  const nomes = ['Poupança', 'LCI', 'CDB', 'Tesouro Direto'];
  const melhorIndex = investimentos.reduce(
    (maxIdx, valor, idx, arr) => (valor.gt(arr[maxIdx]) ? idx : maxIdx),
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
      taxa: taxaLci,
      resultado: resultLci,
      imposto: impostoLci,
    },
    cdb: {
      taxa: taxaCdb,
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
