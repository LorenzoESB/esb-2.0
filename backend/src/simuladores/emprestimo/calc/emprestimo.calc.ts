/**
 * emprestimo.calc.ts
 *
 * Domain calculation functions for personal loan simulator
 * All formulas match the legacy Python implementation exactly
 * Uses Decimal.js for precise financial calculations
 */

import Decimal from 'decimal.js';

/**
 * Configura a precisão dos cálculos com Decimal.js
 * Matching legacy: decimal.getcontext().prec = 15
 */
Decimal.set({ precision: 15, rounding: Decimal.ROUND_HALF_UP });

/**
 * Calcula a parcela mensal usando o sistema PRICE (Sistema Francês de Amortização)
 *
 * Fórmula PRICE:
 * PMT = P * (i * (1+i)^n) / ((1+i)^n - 1)
 *
 * Onde:
 * - P = Valor do empréstimo (principal)
 * - i = Taxa de juros mensal (em decimal, ex: 0.02 para 2%)
 * - n = Número de parcelas
 *
 * @param valorEmprestimo - Valor total do empréstimo
 * @param prazoMeses - Prazo em meses
 * @param taxaJurosMensal - Taxa de juros mensal em percentual (ex: 2.5 para 2.5%)
 * @returns Valor da parcela mensal
 */
export function calcularParcelaPRICE(
  valorEmprestimo: number,
  prazoMeses: number,
  taxaJurosMensal: number,
): Decimal {
  const valor = new Decimal(valorEmprestimo);
  const prazo = new Decimal(prazoMeses);
  const juros = new Decimal(taxaJurosMensal).div(100); // Converte % para decimal

  // Calcula (1 + i)^n
  const umMaisJuros = new Decimal(1).plus(juros);
  const potencia = umMaisJuros.pow(prazo);

  // Numerador: i * (1+i)^n
  const numerador = juros.times(potencia);

  // Denominador: (1+i)^n - 1
  const denominador = potencia.minus(1);

  // PMT = P * (numerador / denominador)
  const parcela = valor.times(numerador.div(denominador));

  return parcela;
}

/**
 * Calcula a parcela mensal usando o sistema SAC (Sistema de Amortização Constante)
 *
 * Fórmula SAC (primeira parcela):
 * PMT = (P / n) + (P * i)
 *
 * Onde:
 * - P = Valor do empréstimo
 * - n = Número de parcelas
 * - i = Taxa de juros mensal (em decimal)
 *
 * @param valorEmprestimo - Valor total do empréstimo
 * @param prazoMeses - Prazo em meses
 * @param taxaJurosMensal - Taxa de juros mensal em percentual
 * @returns Valor da primeira parcela mensal (maior parcela)
 */
export function calcularParcelaSAC(
  valorEmprestimo: number,
  prazoMeses: number,
  taxaJurosMensal: number,
): Decimal {
  const valor = new Decimal(valorEmprestimo);
  const prazo = new Decimal(prazoMeses);
  const juros = new Decimal(taxaJurosMensal).div(100);

  // Amortização constante
  const amortizacao = valor.div(prazo);

  // Juros sobre o saldo devedor inicial
  const jurosInicial = valor.times(juros);

  // Primeira parcela = amortização + juros
  const parcela = amortizacao.plus(jurosInicial);

  return parcela;
}

/**
 * Converte taxa de juros anual para mensal
 *
 * Fórmula:
 * taxa_mensal = ((1 + taxa_anual/100) ^ (1/12) - 1) * 100
 *
 * @param taxaAnual - Taxa anual em percentual
 * @returns Taxa mensal em percentual
 */
export function converterTaxaAnualParaMensal(taxaAnual: number): Decimal {
  const taxa = new Decimal(taxaAnual).div(100);
  const umMaisTaxa = new Decimal(1).plus(taxa);
  const potencia = umMaisTaxa.pow(new Decimal(1).div(12));
  const taxaMensal = potencia.minus(1).times(100);

  return taxaMensal;
}

/**
 * Converte taxa de juros mensal para anual
 *
 * Fórmula:
 * taxa_anual = ((1 + taxa_mensal/100) ^ 12 - 1) * 100
 *
 * @param taxaMensal - Taxa mensal em percentual
 * @returns Taxa anual em percentual
 */
export function converterTaxaMensalParaAnual(taxaMensal: number): Decimal {
  const taxa = new Decimal(taxaMensal).div(100);
  const umMaisTaxa = new Decimal(1).plus(taxa);
  const potencia = umMaisTaxa.pow(12);
  const taxaAnual = potencia.minus(1).times(100);

  return taxaAnual;
}

/**
 * Calcula o total pago ao final do empréstimo
 *
 * @param parcelaMensal - Valor da parcela mensal
 * @param prazoMeses - Prazo em meses
 * @returns Valor total pago
 */
export function calcularTotalPago(
  parcelaMensal: number,
  prazoMeses: number,
): Decimal {
  return new Decimal(parcelaMensal).times(prazoMeses);
}

/**
 * Calcula o total de juros pagos
 *
 * @param totalPago - Valor total pago ao longo do empréstimo
 * @param valorEmprestimo - Valor original do empréstimo
 * @returns Total de juros pagos
 */
export function calcularTotalJuros(
  totalPago: number,
  valorEmprestimo: number,
): Decimal {
  return new Decimal(totalPago).minus(valorEmprestimo);
}

/**
 * Calcula a taxa efetiva anual (considerando capitalização composta)
 *
 * TEA = ((Montante Final / Principal) ^ (1 / anos)) - 1
 *
 * @param totalPago - Valor total pago
 * @param valorEmprestimo - Valor original do empréstimo
 * @param prazoMeses - Prazo em meses
 * @returns Taxa efetiva anual em percentual
 */
export function calcularTaxaEfetivaAnual(
  totalPago: number,
  valorEmprestimo: number,
  prazoMeses: number,
): Decimal {
  const montante = new Decimal(totalPago);
  const principal = new Decimal(valorEmprestimo);
  const anos = new Decimal(prazoMeses).div(12);

  // (Montante / Principal) ^ (1 / anos) - 1
  const razao = montante.div(principal);
  const expoente = new Decimal(1).div(anos);
  const potencia = razao.pow(expoente);
  const taxaEfetiva = potencia.minus(1).times(100);

  return taxaEfetiva;
}

/**
 * Calcula o comprometimento de renda percentual
 *
 * @param parcelaMensal - Valor da parcela mensal
 * @param rendaMensal - Renda mensal do solicitante
 * @returns Percentual de comprometimento da renda
 */
export function calcularComprometimentoRenda(
  parcelaMensal: number,
  rendaMensal: number,
): Decimal {
  if (rendaMensal === 0) {
    return new Decimal(0);
  }

  const parcela = new Decimal(parcelaMensal);
  const renda = new Decimal(rendaMensal);

  return parcela.div(renda).times(100);
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
 * Interface para resultado do cálculo de empréstimo
 */
export interface CalculoEmprestimo {
  parcelaMensal: number;
  totalPago: number;
  totalJuros: number;
  taxaJurosMensal: number;
  taxaJurosAnual: number;
  taxaEfetivaAnual: number;
  valorEmprestimo: number;
  prazoMeses: number;
}

/**
 * Calcula todos os valores de um empréstimo usando sistema PRICE
 *
 * @param valorEmprestimo - Valor do empréstimo
 * @param prazoMeses - Prazo em meses
 * @param taxaJurosMensal - Taxa de juros mensal em percentual
 * @returns Objeto com todos os valores calculados
 */
export function calcularEmprestimoPRICE(
  valorEmprestimo: number,
  prazoMeses: number,
  taxaJurosMensal: number,
): CalculoEmprestimo {
  const parcelaDecimal = calcularParcelaPRICE(
    valorEmprestimo,
    prazoMeses,
    taxaJurosMensal,
  );
  const parcelaMensal = arredondar2Decimais(parcelaDecimal);

  const totalPagoDecimal = calcularTotalPago(parcelaMensal, prazoMeses);
  const totalPago = arredondar2Decimais(totalPagoDecimal);

  const totalJurosDecimal = calcularTotalJuros(totalPago, valorEmprestimo);
  const totalJuros = arredondar2Decimais(totalJurosDecimal);

  const taxaAnualDecimal = converterTaxaMensalParaAnual(taxaJurosMensal);
  const taxaJurosAnual = arredondar4Decimais(taxaAnualDecimal);

  const taxaEfetivaAnualDecimal = calcularTaxaEfetivaAnual(
    totalPago,
    valorEmprestimo,
    prazoMeses,
  );
  const taxaEfetivaAnual = arredondar4Decimais(taxaEfetivaAnualDecimal);

  return {
    parcelaMensal,
    totalPago,
    totalJuros,
    taxaJurosMensal: arredondar4Decimais(new Decimal(taxaJurosMensal)),
    taxaJurosAnual,
    taxaEfetivaAnual,
    valorEmprestimo,
    prazoMeses,
  };
}
