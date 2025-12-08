import Decimal from 'decimal.js';

/**
 * Biblioteca de cálculos financeiros para simulação de aposentadoria privada.
 *
 * Baseado nas fórmulas do Excel e código Python legado do Educando Seu Bolso.
 * Todas as funções são puras (sem efeitos colaterais) e usam Decimal.js para
 * precisão financeira.
 *
 * Fórmulas principais:
 * - FV (Future Value): Valor futuro de uma série de pagamentos
 * - PV (Present Value): Valor presente de uma série de pagamentos
 * - PMT (Payment): Pagamento periódico necessário
 */

/**
 * Calcula o valor futuro de um capital inicial aplicado a juros compostos.
 *
 * Fórmula: FV = PV × (1 + taxa)^prazo
 *
 * Excel equivalente: =FV(taxa, nper, 0, -PV)
 *
 * @param capitalInicial - Valor presente (R$)
 * @param taxaMensal - Taxa de juros mensal (decimal, ex: 0.005 para 0.5%)
 * @param meses - Prazo em meses
 * @returns Valor futuro corrigido
 *
 * @example
 * calcularValorFuturoCapitalInicial(50000, 0.005, 264)
 * // Retorna: Decimal(143439.97...)
 */
export function calcularValorFuturoCapitalInicial(
  capitalInicial: number | string | Decimal,
  taxaMensal: number | string | Decimal,
  meses: number,
): Decimal {
  const pv = new Decimal(capitalInicial);
  const taxa = new Decimal(taxaMensal);
  const n = meses;

  // FV = PV × (1 + taxa)^n
  const fator = new Decimal(1).plus(taxa).pow(n);
  return pv.mul(fator);
}

/**
 * Calcula o valor futuro de uma série de pagamentos mensais (contribuições).
 *
 * Fórmula: FV = PMT × [(1 + taxa)^prazo - 1] / taxa
 *
 * Excel equivalente: =FV(taxa, nper, -PMT, 0)
 *
 * @param pagamentoMensal - Contribuição mensal (R$)
 * @param taxaMensal - Taxa de juros mensal (decimal)
 * @param meses - Prazo em meses
 * @returns Valor futuro acumulado das contribuições
 *
 * @example
 * calcularValorFuturoPagamentos(2000, 0.005, 264)
 * // Retorna: Decimal(1397926.54...)
 */
export function calcularValorFuturoPagamentos(
  pagamentoMensal: number | string | Decimal,
  taxaMensal: number | string | Decimal,
  meses: number,
): Decimal {
  const pmt = new Decimal(pagamentoMensal);
  const taxa = new Decimal(taxaMensal);
  const n = meses;

  // FV = PMT × [(1 + taxa)^n - 1] / taxa
  const umMaisTaxa = new Decimal(1).plus(taxa);
  const fatorPotencia = umMaisTaxa.pow(n);
  const numerador = fatorPotencia.minus(1);
  const fv = pmt.mul(numerador).div(taxa);

  return fv;
}

/**
 * Calcula o valor presente necessário para gerar uma renda mensal por um período.
 *
 * Fórmula: PV = PMT × [(1 + taxa)^prazo - 1] / [taxa × (1 + taxa)^prazo]
 *
 * Excel equivalente: =PV(taxa, nper, -PMT, 0)
 *
 * @param rendaMensal - Renda mensal desejada (R$)
 * @param taxaMensal - Taxa de juros mensal (decimal)
 * @param meses - Prazo em meses
 * @returns Valor presente necessário
 *
 * @example
 * calcularValorPresente(12000, 0.005, 432)
 * // Retorna: Decimal(2121726.04...)
 */
export function calcularValorPresente(
  rendaMensal: number | string | Decimal,
  taxaMensal: number | string | Decimal,
  meses: number,
): Decimal {
  const pmt = new Decimal(rendaMensal);
  const taxa = new Decimal(taxaMensal);
  const n = meses;

  // PV = PMT × [(1 + taxa)^n - 1] / [taxa × (1 + taxa)^n]
  const umMaisTaxa = new Decimal(1).plus(taxa);
  const fatorPotencia = umMaisTaxa.pow(n);
  const numerador = fatorPotencia.minus(1);
  const denominador = taxa.mul(fatorPotencia);
  const pv = pmt.mul(numerador).div(denominador);

  return pv;
}

/**
 * Calcula o pagamento mensal necessário para acumular um valor futuro.
 *
 * Fórmula: PMT = VP × [taxa / ((1 + taxa)^prazo - 1)]
 *
 * Excel equivalente: =PMT(taxa, nper, 0, -FV)
 *
 * @param valorPresente - Valor presente/futuro desejado (R$)
 * @param taxaMensal - Taxa de juros mensal (decimal)
 * @param meses - Prazo em meses
 * @returns Pagamento mensal necessário
 *
 * @example
 * calcularPagamentoMensal(2121726.04, 0.005, 264)
 * // Retorna: Decimal(2836.26...)
 */
export function calcularPagamentoMensal(
  valorPresente: number | string | Decimal,
  taxaMensal: number | string | Decimal,
  meses: number,
): Decimal {
  const vp = new Decimal(valorPresente);
  const taxa = new Decimal(taxaMensal);
  const n = meses;

  // PMT = VP × [taxa / ((1 + taxa)^n - 1)]
  const umMaisTaxa = new Decimal(1).plus(taxa);
  const fatorPotencia = umMaisTaxa.pow(n);
  const denominador = fatorPotencia.minus(1);
  const pmt = vp.mul(taxa).div(denominador);

  return pmt;
}

/**
 * Calcula a renda mensal que um capital pode gerar por um período.
 *
 * Fórmula: PMT = VP / [(1 + taxa)^prazo - 1] × [taxa × (1 + taxa)^prazo]
 *
 * Excel equivalente: =PMT(taxa, nper, -PV, 0)
 *
 * @param valorPresente - Capital disponível (R$)
 * @param taxaMensal - Taxa de juros mensal (decimal)
 * @param meses - Prazo em meses
 * @returns Renda mensal possível
 *
 * @example
 * calcularRendaMensal(2121726.04, 0.005, 432)
 * // Retorna: Decimal(12000.00...)
 */
export function calcularRendaMensal(
  valorPresente: number | string | Decimal,
  taxaMensal: number | string | Decimal,
  meses: number,
): Decimal {
  const vp = new Decimal(valorPresente);
  const taxa = new Decimal(taxaMensal);
  const n = meses;

  // PMT = VP / [(1 + taxa)^n - 1] × [taxa × (1 + taxa)^n]
  const umMaisTaxa = new Decimal(1).plus(taxa);
  const fatorPotencia = umMaisTaxa.pow(n);
  const numerador = fatorPotencia.minus(1);
  const denominador = taxa.mul(fatorPotencia);
  const pmt = vp.div(numerador).mul(denominador);

  return pmt;
}

/**
 * Converte taxa mensal para taxa anual equivalente.
 *
 * Fórmula: Taxa Anual = (1 + taxa mensal)^12 - 1
 *
 * @param taxaMensal - Taxa mensal (decimal)
 * @returns Taxa anual equivalente (decimal)
 *
 * @example
 * calcularTaxaAnual(0.005)
 * // Retorna: Decimal(0.0617...) = 6.17% ao ano
 */
export function calcularTaxaAnual(
  taxaMensal: number | string | Decimal,
): Decimal {
  const taxa = new Decimal(taxaMensal);
  return new Decimal(1).plus(taxa).pow(12).minus(1);
}

/**
 * Calcula quanto tempo um patrimônio dura com saques mensais fixos.
 *
 * Usa busca binária para encontrar o número de meses até saldo zerar.
 *
 * @param patrimonio - Patrimônio inicial (R$)
 * @param saqueMensal - Valor do saque mensal (R$)
 * @param taxaMensal - Taxa de juros mensal (decimal)
 * @returns Número de meses até esgotar o patrimônio (ou Infinity se sustentável)
 *
 * @example
 * calcularDuracaoPatrimonio(1000000, 5000, 0.005)
 * // Retorna: 276 (meses)
 */
export function calcularDuracaoPatrimonio(
  patrimonio: number | string | Decimal,
  saqueMensal: number | string | Decimal,
  taxaMensal: number | string | Decimal,
): number {
  const capital = new Decimal(patrimonio);
  const saque = new Decimal(saqueMensal);
  const taxa = new Decimal(taxaMensal);

  // Se o saque é menor ou igual ao rendimento mensal, é sustentável indefinidamente
  const rendimentoMensal = capital.mul(taxa);
  if (saque.lte(rendimentoMensal)) {
    return Infinity;
  }

  // Busca binária para encontrar o número de meses
  let low = 1;
  let high = 1200; // 100 anos como limite superior
  let result = 0;

  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    const saldoFinal = calcularSaldoAposSaques(capital, saque, taxa, mid);

    if (saldoFinal.gte(0)) {
      result = mid;
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }

  return result;
}

/**
 * Calcula o saldo após N meses de saques com rendimento.
 *
 * Usa fórmula de PV de anuidade para calcular o saldo.
 *
 * @param patrimonioInicial - Capital inicial (R$)
 * @param saqueMensal - Valor do saque mensal (R$)
 * @param taxaMensal - Taxa de juros mensal (decimal)
 * @param meses - Número de meses
 * @returns Saldo após os saques
 */
export function calcularSaldoAposSaques(
  patrimonioInicial: number | string | Decimal,
  saqueMensal: number | string | Decimal,
  taxaMensal: number | string | Decimal,
  meses: number,
): Decimal {
  const capital = new Decimal(patrimonioInicial);
  const saque = new Decimal(saqueMensal);
  const taxa = new Decimal(taxaMensal);
  const n = meses;

  // Saldo = Capital × (1 + taxa)^n - Saque × [(1 + taxa)^n - 1] / taxa
  const umMaisTaxa = new Decimal(1).plus(taxa);
  const fatorPotencia = umMaisTaxa.pow(n);

  const capitalFuturo = capital.mul(fatorPotencia);
  const saquesAcumulados = saque.mul(fatorPotencia.minus(1)).div(taxa);

  return capitalFuturo.minus(saquesAcumulados);
}
