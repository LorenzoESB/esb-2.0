/**
 * financiamento-imovel.calc.ts
 *
 * Domain calculation functions for real estate financing simulator
 * Uses SAC (Sistema de Amortização Constante) amortization system
 * All calculations use Decimal.js for precise financial calculations
 */

import Decimal from 'decimal.js';

/**
 * Configura a precisão dos cálculos com Decimal.js
 * Matching other simulators: precision = 15
 */
Decimal.set({ precision: 15, rounding: Decimal.ROUND_HALF_UP });

/**
 * Calcula a primeira parcela usando o sistema SAC
 *
 * No sistema SAC (Sistema de Amortização Constante):
 * - A amortização é constante: principal / períodos
 * - Os juros diminuem a cada mês (calculados sobre saldo devedor)
 * - A primeira parcela é a maior (saldo devedor máximo)
 *
 * Fórmula SAC (primeira parcela):
 * Primeira Parcela = (Principal / n) + (Principal × i)
 *
 * Onde:
 * - Principal = Valor financiado (valor do imóvel - entrada)
 * - n = Número de parcelas
 * - i = Taxa de juros mensal (em decimal)
 *
 * @param principal - Valor financiado
 * @param periodos - Número de parcelas (meses)
 * @param taxaMensal - Taxa de juros mensal em percentual (ex: 0.84 para 0.84%)
 * @returns Valor da primeira parcela
 */
export function calcularPrimeiraParcelaSAC(
  principal: number,
  periodos: number,
  taxaMensal: number,
): Decimal {
  const valor = new Decimal(principal);
  const prazo = new Decimal(periodos);
  const juros = new Decimal(taxaMensal).div(100); // Converte % para decimal

  // Amortização constante = Principal / n
  const amortizacao = valor.div(prazo);

  // Juros sobre o saldo devedor inicial = Principal × i
  const jurosInicial = valor.times(juros);

  // Primeira parcela = Amortização + Juros
  const primeiraParcela = amortizacao.plus(jurosInicial);

  return primeiraParcela;
}

/**
 * Calcula a última parcela usando o sistema SAC
 *
 * A última parcela é a menor, pois os juros são calculados sobre
 * o menor saldo devedor (apenas uma amortização restante)
 *
 * Fórmula SAC (última parcela):
 * Última Parcela = (Principal / n) + ((Principal / n) × i)
 * Simplificando: Última Parcela = (Principal / n) × (1 + i)
 *
 * @param principal - Valor financiado
 * @param periodos - Número de parcelas (meses)
 * @param taxaMensal - Taxa de juros mensal em percentual
 * @returns Valor da última parcela
 */
export function calcularUltimaParcelaSAC(
  principal: number,
  periodos: number,
  taxaMensal: number,
): Decimal {
  const valor = new Decimal(principal);
  const prazo = new Decimal(periodos);
  const juros = new Decimal(taxaMensal).div(100);

  // Amortização constante
  const amortizacao = valor.div(prazo);

  // Saldo devedor na última parcela = 1 amortização
  const saldoDevedorFinal = amortizacao;

  // Juros sobre o saldo devedor final
  const jurosFinal = saldoDevedorFinal.times(juros);

  // Última parcela = Amortização + Juros finais
  const ultimaParcela = amortizacao.plus(jurosFinal);

  return ultimaParcela;
}

/**
 * Calcula o valor total pago ao longo do financiamento SAC
 *
 * Fórmula SAC (total pago):
 * Total = Principal + Juros Totais
 * Juros Totais = (Principal × i × (n + 1)) / 2
 *
 * Onde:
 * - i = taxa mensal (decimal)
 * - n = número de parcelas
 *
 * Esta fórmula deriva da soma de PA (progressão aritmética) dos juros
 *
 * @param principal - Valor financiado
 * @param periodos - Número de parcelas
 * @param taxaMensal - Taxa de juros mensal em percentual
 * @returns Valor total pago
 */
export function calcularTotalPagoSAC(
  principal: number,
  periodos: number,
  taxaMensal: number,
): Decimal {
  const valor = new Decimal(principal);
  const prazo = new Decimal(periodos);
  const juros = new Decimal(taxaMensal).div(100);

  // Juros totais = (Principal × i × (n + 1)) / 2
  const jurosTotais = valor.times(juros).times(prazo.plus(1)).div(2);

  // Total pago = Principal + Juros totais
  const totalPago = valor.plus(jurosTotais);

  return totalPago;
}

/**
 * Converte taxa de juros anual para mensal usando juros compostos
 *
 * Fórmula:
 * i_mensal = [(1 + i_anual)^(1/12) - 1] × 100
 *
 * @param taxaAnual - Taxa anual em percentual (ex: 10.5 para 10.5%)
 * @returns Taxa mensal em percentual
 */
export function converterTaxaAnualParaMensal(taxaAnual: number): Decimal {
  const taxa = new Decimal(taxaAnual).div(100); // Converte para decimal
  const umMaisTaxa = new Decimal(1).plus(taxa);
  const potencia = umMaisTaxa.pow(new Decimal(1).div(12)); // (1 + i)^(1/12)
  const taxaMensal = potencia.minus(1).times(100); // Volta para percentual

  return taxaMensal;
}

/**
 * Calcula o comprometimento de renda percentual
 *
 * Fórmula:
 * Comprometimento = (Parcela / Renda) × 100
 *
 * @param parcela - Valor da parcela mensal
 * @param renda - Renda mensal do solicitante
 * @returns Percentual de comprometimento da renda
 */
export function calcularComprometimentoRenda(
  parcela: number,
  renda: number,
): Decimal {
  if (renda === 0) {
    return new Decimal(0);
  }

  const parcelaDecimal = new Decimal(parcela);
  const rendaDecimal = new Decimal(renda);

  return parcelaDecimal.div(rendaDecimal).times(100);
}

/**
 * Arredonda um valor Decimal para 2 casas decimais
 *
 * @param valor - Valor a ser arredondado
 * @returns Valor arredondado como número
 */
export function arredondar2Decimais(valor: Decimal): number {
  return valor.toDecimalPlaces(2).toNumber();
}

/**
 * Arredonda um valor Decimal para 4 casas decimais
 * Usado para taxas de juros
 *
 * @param valor - Valor a ser arredondado
 * @returns Valor arredondado como número
 */
export function arredondar4Decimais(valor: Decimal): number {
  return valor.toDecimalPlaces(4).toNumber();
}

/**
 * Interface para resultado do cálculo de financiamento
 */
export interface CalculoFinanciamentoImovel {
  parcelaInicial: number;
  parcelaFinal: number;
  valorTotal: number;
  taxaJurosMensal: number;
  taxaJurosAnual: number;
  comprometimentoRenda: number;
}

/**
 * Calcula todos os valores de um financiamento imobiliário usando sistema SAC
 *
 * @param valorFinanciado - Valor a ser financiado (imóvel - entrada)
 * @param prazoMeses - Prazo em meses
 * @param taxaJurosAnual - Taxa de juros anual em percentual
 * @param rendaMensal - Renda mensal do solicitante
 * @returns Objeto com todos os valores calculados
 */
export function calcularFinanciamentoSAC(
  valorFinanciado: number,
  prazoMeses: number,
  taxaJurosAnual: number,
  rendaMensal: number,
): CalculoFinanciamentoImovel {
  // Converter taxa anual para mensal
  const taxaMensalDecimal = converterTaxaAnualParaMensal(taxaJurosAnual);
  const taxaJurosMensal = arredondar4Decimais(taxaMensalDecimal);

  // Calcular primeira parcela (maior)
  const primeiraParcelaDecimal = calcularPrimeiraParcelaSAC(
    valorFinanciado,
    prazoMeses,
    taxaJurosMensal,
  );
  const parcelaInicial = arredondar2Decimais(primeiraParcelaDecimal);

  // Calcular última parcela (menor)
  const ultimaParcelaDecimal = calcularUltimaParcelaSAC(
    valorFinanciado,
    prazoMeses,
    taxaJurosMensal,
  );
  const parcelaFinal = arredondar2Decimais(ultimaParcelaDecimal);

  // Calcular total pago
  const totalPagoDecimal = calcularTotalPagoSAC(
    valorFinanciado,
    prazoMeses,
    taxaJurosMensal,
  );
  const valorTotal = arredondar2Decimais(totalPagoDecimal);

  // Calcular comprometimento de renda (usando primeira parcela)
  const comprometimentoDecimal = calcularComprometimentoRenda(
    parcelaInicial,
    rendaMensal,
  );
  const comprometimentoRenda = arredondar2Decimais(comprometimentoDecimal);

  return {
    parcelaInicial,
    parcelaFinal,
    valorTotal,
    taxaJurosMensal,
    taxaJurosAnual: arredondar4Decimais(new Decimal(taxaJurosAnual)),
    comprometimentoRenda,
  };
}
