/**
 * financiamento-veiculos.calc.ts
 *
 * Domain calculation functions for vehicle financing simulator
 * Uses PRICE (Sistema de Amortização Francês) amortization system
 * All calculations use Decimal.js for precise financial calculations
 */

import Decimal from 'decimal.js';

/**
 * Configura a precisão dos cálculos com Decimal.js
 * Matching other simulators: precision = 15
 */
Decimal.set({ precision: 15, rounding: Decimal.ROUND_HALF_UP });

/**
 * Calcula a parcela mensal usando o sistema PRICE
 *
 * No sistema PRICE (Tabela Price / Sistema Francês):
 * - As parcelas são fixas (iguais) ao longo do financiamento
 * - A amortização aumenta e os juros diminuem a cada mês
 * - É o sistema mais comum para financiamento de veículos no Brasil
 *
 * Fórmula PRICE:
 * PMT = PV × [i × (1 + i)^n] / [(1 + i)^n - 1]
 *
 * Onde:
 * - PMT = Valor da parcela mensal
 * - PV = Valor presente (principal financiado)
 * - i = Taxa de juros mensal (em decimal)
 * - n = Número de parcelas
 *
 * @param principal - Valor financiado
 * @param periodos - Número de parcelas (meses)
 * @param taxaMensal - Taxa de juros mensal em percentual (ex: 1.84 para 1.84%)
 * @returns Valor da parcela mensal
 */
export function calcularParcelaPRICE(
  principal: number,
  periodos: number,
  taxaMensal: number,
): Decimal {
  const pv = new Decimal(principal);
  const n = new Decimal(periodos);
  const i = new Decimal(taxaMensal).div(100); // Converte % para decimal

  // Caso especial: se a taxa for zero, parcela = principal / períodos
  if (i.isZero()) {
    return pv.div(n);
  }

  // (1 + i)^n
  const umMaisI = new Decimal(1).plus(i);
  const potencia = umMaisI.pow(n);

  // Numerador: i × (1 + i)^n
  const numerador = i.times(potencia);

  // Denominador: (1 + i)^n - 1
  const denominador = potencia.minus(1);

  // PMT = PV × [numerador / denominador]
  const pmt = pv.times(numerador.div(denominador));

  return pmt;
}

/**
 * Calcula o valor total pago ao longo do financiamento PRICE
 *
 * Fórmula:
 * Total = Parcela Mensal × Número de Parcelas
 *
 * @param parcelaMensal - Valor da parcela mensal
 * @param periodos - Número de parcelas
 * @returns Valor total pago
 */
export function calcularTotalPagoPRICE(
  parcelaMensal: number,
  periodos: number,
): Decimal {
  const pmt = new Decimal(parcelaMensal);
  const n = new Decimal(periodos);

  return pmt.times(n);
}

/**
 * Calcula o IOF (Imposto sobre Operações Financeiras) para financiamento de veículos
 *
 * Regras do IOF (2024):
 * - Alíquota diária: 0,000082 por dia (0,0082% ao dia)
 * - Alíquota adicional: 0,38% sobre o valor financiado
 * - Limitado a 365 dias
 *
 * Fórmula:
 * IOF = Valor Financiado × [(0,000082 × dias) + 0,0038]
 *
 * @param valorFinanciado - Valor a ser financiado
 * @param periodos - Número de parcelas (meses)
 * @returns Valor do IOF
 */
export function calcularIOF(
  valorFinanciado: number,
  periodos: number,
): Decimal {
  const valor = new Decimal(valorFinanciado);

  // Calcular dias (limitado a 365 dias)
  const dias = Math.min(periodos * 30, 365);

  // Alíquota diária: 0,000082 por dia
  const aliquotaDiaria = new Decimal(0.000082);

  // Alíquota adicional: 0,38%
  const aliquotaAdicional = new Decimal(0.0038);

  // IOF = Valor × [(alíquota diária × dias) + alíquota adicional]
  const aliquotaTotal = aliquotaDiaria.times(dias).plus(aliquotaAdicional);
  const iof = valor.times(aliquotaTotal);

  return iof;
}

/**
 * Converte taxa de juros anual para mensal usando juros compostos
 *
 * Fórmula:
 * i_mensal = [(1 + i_anual)^(1/12) - 1] × 100
 *
 * @param taxaAnual - Taxa anual em percentual (ex: 24.5 para 24.5%)
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
 * Converte taxa de juros mensal para anual usando juros compostos
 *
 * Fórmula:
 * i_anual = [(1 + i_mensal)^12 - 1] × 100
 *
 * @param taxaMensal - Taxa mensal em percentual (ex: 1.84 para 1.84%)
 * @returns Taxa anual em percentual
 */
export function converterTaxaMensalParaAnual(taxaMensal: number): Decimal {
  const taxa = new Decimal(taxaMensal).div(100); // Converte para decimal
  const umMaisTaxa = new Decimal(1).plus(taxa);
  const potencia = umMaisTaxa.pow(12); // (1 + i)^12
  const taxaAnual = potencia.minus(1).times(100); // Volta para percentual

  return taxaAnual;
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
export interface CalculoFinanciamentoVeiculos {
  parcelaMensal: number;
  valorTotal: number;
  valorIOF: number;
  taxaJurosMensal: number;
  taxaJurosAnual: number;
  comprometimentoRenda: number;
}

/**
 * Calcula todos os valores de um financiamento de veículos usando sistema PRICE
 *
 * @param valorFinanciado - Valor a ser financiado (veículo - entrada)
 * @param prazoMeses - Prazo em meses
 * @param taxaJurosAnual - Taxa de juros anual em percentual
 * @param rendaMensal - Renda mensal do solicitante
 * @returns Objeto com todos os valores calculados
 */
export function calcularFinanciamentoPRICE(
  valorFinanciado: number,
  prazoMeses: number,
  taxaJurosAnual: number,
  rendaMensal: number,
): CalculoFinanciamentoVeiculos {
  // Converter taxa anual para mensal
  const taxaMensalDecimal = converterTaxaAnualParaMensal(taxaJurosAnual);
  const taxaJurosMensal = arredondar4Decimais(taxaMensalDecimal);

  // Calcular IOF
  const iofDecimal = calcularIOF(valorFinanciado, prazoMeses);
  const valorIOF = arredondar2Decimais(iofDecimal);

  // Valor financiado + IOF (o IOF é financiado junto)
  const valorFinanciadoComIOF = valorFinanciado + valorIOF;

  // Calcular parcela mensal fixa (sistema PRICE)
  const parcelaDecimal = calcularParcelaPRICE(
    valorFinanciadoComIOF,
    prazoMeses,
    taxaJurosMensal,
  );
  const parcelaMensal = arredondar2Decimais(parcelaDecimal);

  // Calcular total pago
  const totalPagoDecimal = calcularTotalPagoPRICE(parcelaMensal, prazoMeses);
  const valorTotal = arredondar2Decimais(totalPagoDecimal);

  // Calcular comprometimento de renda
  const comprometimentoDecimal = calcularComprometimentoRenda(
    parcelaMensal,
    rendaMensal,
  );
  const comprometimentoRenda = arredondar2Decimais(comprometimentoDecimal);

  return {
    parcelaMensal,
    valorTotal,
    valorIOF,
    taxaJurosMensal,
    taxaJurosAnual: arredondar4Decimais(new Decimal(taxaJurosAnual)),
    comprometimentoRenda,
  };
}
