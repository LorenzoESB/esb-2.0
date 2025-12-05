/**
 * comparador.calc.ts
 *
 * Domain calculation functions for car subscription comparator
 * Compares three scenarios: cash purchase, financing, and subscription
 * All calculations use Decimal.js for precise financial calculations
 */

import Decimal from 'decimal.js';
import {
  TAXAS_ANUAIS,
  TAXAS_FINANCIAMENTO,
  AJUSTES_ASSINATURA,
  obterDepreciacaoAno,
  calcularCustosFixosAnuais,
} from '../constants/comparador.constants';

/**
 * Configura a precisão dos cálculos com Decimal.js
 */
Decimal.set({ precision: 15, rounding: Decimal.ROUND_HALF_UP });

/**
 * Interface para custos breakdown
 *
 * Todos os campos base são obrigatórios. Campos opcionais são específicos de cada cenário.
 */
export interface CustosBreakdown {
  custoAquisicao: number;
  manutencao: number;
  seguro: number;
  ipva: number;
  taxasLicenciamento: number;
  depreciacao: number;
  custoOportunidade: number;
  custoAssinatura?: number;
  jurosFinanciamento?: number;
  iofFinanciamento?: number;
}

/**
 * Interface para resultado de cenário
 *
 * valorRevenda é sempre um número. Para assinatura, será 0 pois não há propriedade.
 */
export interface ResultadoCenario {
  nome: string;
  custoTotal: number;
  valorRevenda: number;
  custoLiquido: number;
  breakdown: CustosBreakdown;
}

/**
 * Calcula manutenção anual baseada no valor do veículo
 *
 * Fórmula: Valor Veículo × (Taxa Manutenção / 100)
 *
 * @param valorVeiculo - Valor do veículo
 * @returns Custo anual de manutenção
 */
export function calcularManutencaoAnual(valorVeiculo: number): Decimal {
  const valor = new Decimal(valorVeiculo);
  const taxa = new Decimal(TAXAS_ANUAIS.MANUTENCAO_PERCENT).div(100);
  return valor.times(taxa);
}

/**
 * Calcula IPVA anual baseado no valor do veículo
 *
 * Fórmula: Valor Veículo × (Taxa IPVA / 100)
 *
 * @param valorVeiculo - Valor do veículo
 * @returns Custo anual de IPVA
 */
export function calcularIPVAAnual(valorVeiculo: number): Decimal {
  const valor = new Decimal(valorVeiculo);
  const taxa = new Decimal(TAXAS_ANUAIS.IPVA_PERCENT).div(100);
  return valor.times(taxa);
}

/**
 * Calcula seguro anual baseado no valor do veículo
 *
 * Fórmula: Valor Veículo × (Taxa Seguro / 100)
 *
 * @param valorVeiculo - Valor do veículo
 * @returns Custo anual de seguro
 */
export function calcularSeguroAnual(valorVeiculo: number): Decimal {
  const valor = new Decimal(valorVeiculo);
  const taxa = new Decimal(TAXAS_ANUAIS.SEGURO_PERCENT).div(100);
  return valor.times(taxa);
}

/**
 * Calcula valor do veículo após depreciação
 *
 * Usa a curva de depreciação definida em constants
 *
 * @param valorInicial - Valor inicial do veículo
 * @param anos - Número de anos (1-5)
 * @returns Valor após depreciação
 */
export function calcularValorDepreciado(
  valorInicial: number,
  anos: number,
): Decimal {
  const valor = new Decimal(valorInicial);
  const depreciacaoPercent = obterDepreciacaoAno(anos);
  const depreciacaoDecimal = new Decimal(depreciacaoPercent).div(100);

  // Valor após depreciação = Valor Inicial × (1 - Depreciação)
  return valor.times(new Decimal(1).minus(depreciacaoDecimal));
}

/**
 * Calcula depreciação em reais
 *
 * @param valorInicial - Valor inicial do veículo
 * @param anos - Número de anos
 * @returns Valor da depreciação em reais
 */
export function calcularDepreciacao(
  valorInicial: number,
  anos: number,
): Decimal {
  const valor = new Decimal(valorInicial);
  const valorDepreciado = calcularValorDepreciado(valorInicial, anos);
  return valor.minus(valorDepreciado);
}

/**
 * Calcula parcela de financiamento usando sistema PRICE
 *
 * Fórmula PRICE:
 * PMT = PV × [i × (1 + i)^n] / [(1 + i)^n - 1]
 *
 * @param principal - Valor financiado
 * @param meses - Prazo em meses
 * @param taxaMensal - Taxa mensal em percentual
 * @returns Valor da parcela mensal
 */
export function calcularParcelaFinanciamento(
  principal: number,
  meses: number,
  taxaMensal: number,
): Decimal {
  const pv = new Decimal(principal);
  const n = new Decimal(meses);
  const i = new Decimal(taxaMensal).div(100);

  if (i.isZero()) {
    return pv.div(n);
  }

  const umMaisI = new Decimal(1).plus(i);
  const potencia = umMaisI.pow(n);
  const numerador = i.times(potencia);
  const denominador = potencia.minus(1);

  return pv.times(numerador.div(denominador));
}

/**
 * Calcula IOF para financiamento
 *
 * Fórmula:
 * IOF = Valor × [(0,000082 × dias) + 0,0038]
 * Limitado a 365 dias
 *
 * @param valorFinanciado - Valor financiado
 * @param meses - Prazo em meses
 * @returns Valor do IOF
 */
export function calcularIOFFinanciamento(
  valorFinanciado: number,
  meses: number,
): Decimal {
  const valor = new Decimal(valorFinanciado);
  const dias = Math.min(meses * 30, 365);
  const aliquotaDiaria = new Decimal(0.000082);
  const aliquotaAdicional = new Decimal(0.0038);
  const aliquotaTotal = aliquotaDiaria.times(dias).plus(aliquotaAdicional);
  return valor.times(aliquotaTotal);
}

/**
 * Calcula custo total de assinatura com reajuste anual
 *
 * A assinatura tem reajuste anual de 5%
 *
 * @param custoMensal - Custo mensal inicial da assinatura
 * @param meses - Prazo total em meses
 * @returns Custo total da assinatura
 */
export function calcularCustoAssinatura(
  custoMensal: number,
  meses: number,
): Decimal {
  let custoTotal = new Decimal(0);
  let custoMensalAtual = new Decimal(custoMensal);
  const reajusteAnual = new Decimal(AJUSTES_ASSINATURA.REAJUSTE_ANUAL_PERCENT)
    .div(100)
    .plus(1);

  for (let mes = 1; mes <= meses; mes++) {
    custoTotal = custoTotal.plus(custoMensalAtual);

    // Reajusta a cada 12 meses
    if (mes % 12 === 0) {
      custoMensalAtual = custoMensalAtual.times(reajusteAnual);
    }
  }

  return custoTotal;
}

/**
 * Calcula custo de oportunidade (investimento CDI)
 *
 * Simplificação: assume rendimento de 0.8% ao mês (aproximado do CDI histórico)
 *
 * @param capitalInvestido - Capital inicial investido
 * @param anos - Período em anos
 * @returns Rendimento que seria obtido se investisse
 */
export function calcularCustoOportunidade(
  capitalInvestido: number,
  anos: number,
): Decimal {
  const capital = new Decimal(capitalInvestido);
  const taxaMensalCDI = new Decimal(0.008); // 0.8% ao mês
  const meses = anos * 12;

  // Montante = Capital × (1 + i)^n
  const montante = capital.times(
    new Decimal(1).plus(taxaMensalCDI).pow(meses),
  );

  // Rendimento = Montante - Capital
  return montante.minus(capital);
}

/**
 * Arredonda um valor Decimal para 2 casas decimais
 */
function arredondar(valor: Decimal): number {
  return valor.toDecimalPlaces(2).toNumber();
}

/**
 * Calcula cenário de compra à vista
 *
 * @param valorVeiculo - Valor do veículo
 * @param anos - Período de comparação em anos
 * @returns Resultado do cenário de compra
 */
export function calcularCenarioCompra(
  valorVeiculo: number,
  anos: number,
): ResultadoCenario {
  // Custos de propriedade
  const manutencaoAnual = calcularManutencaoAnual(valorVeiculo);
  const ipvaAnual = calcularIPVAAnual(valorVeiculo);
  const seguroAnual = calcularSeguroAnual(valorVeiculo);
  const taxasFixasAnuais = new Decimal(calcularCustosFixosAnuais());

  // Totais no período
  const manutencaoTotal = manutencaoAnual.times(anos);
  const ipvaTotal = ipvaAnual.times(anos);
  const seguroTotal = seguroAnual.times(anos);
  const taxasTotal = taxasFixasAnuais.times(anos);

  // Depreciação
  const depreciacao = calcularDepreciacao(valorVeiculo, anos);
  const valorRevenda = calcularValorDepreciado(valorVeiculo, anos);

  // Custo de oportunidade (capital imobilizado)
  const custoOportunidade = calcularCustoOportunidade(valorVeiculo, anos);

  // Custo total
  const custoTotal = new Decimal(valorVeiculo)
    .plus(manutencaoTotal)
    .plus(ipvaTotal)
    .plus(seguroTotal)
    .plus(taxasTotal)
    .plus(custoOportunidade);

  // Custo líquido (descontando valor de revenda)
  const custoLiquido = custoTotal.minus(valorRevenda);

  return {
    nome: 'Compra à Vista',
    custoTotal: arredondar(custoTotal),
    valorRevenda: arredondar(valorRevenda),
    custoLiquido: arredondar(custoLiquido),
    breakdown: {
      custoAquisicao: valorVeiculo,
      manutencao: arredondar(manutencaoTotal),
      seguro: arredondar(seguroTotal),
      ipva: arredondar(ipvaTotal),
      taxasLicenciamento: arredondar(taxasTotal),
      depreciacao: arredondar(depreciacao),
      custoOportunidade: arredondar(custoOportunidade),
    },
  };
}

/**
 * Calcula cenário de financiamento
 *
 * @param valorVeiculo - Valor do veículo
 * @param entrada - Valor da entrada
 * @param prazoMeses - Prazo do financiamento em meses
 * @param anos - Período de comparação em anos
 * @returns Resultado do cenário de financiamento
 */
export function calcularCenarioFinanciamento(
  valorVeiculo: number,
  entrada: number,
  prazoMeses: number,
  anos: number,
): ResultadoCenario {
  // Valor financiado
  const valorFinanciado = valorVeiculo - entrada;

  // IOF
  const iof = calcularIOFFinanciamento(valorFinanciado, prazoMeses);
  const valorFinanciadoComIOF = new Decimal(valorFinanciado).plus(iof);

  // Parcela mensal
  const parcela = calcularParcelaFinanciamento(
    valorFinanciadoComIOF.toNumber(),
    prazoMeses,
    TAXAS_FINANCIAMENTO.TAXA_MENSAL_PERCENT,
  );

  // Total pago no financiamento
  const totalFinanciamento = parcela.times(prazoMeses);

  // Juros pagos
  const juros = totalFinanciamento.minus(valorFinanciadoComIOF);

  // Custos de propriedade (mesmos da compra)
  const manutencaoAnual = calcularManutencaoAnual(valorVeiculo);
  const ipvaAnual = calcularIPVAAnual(valorVeiculo);
  const seguroAnual = calcularSeguroAnual(valorVeiculo);
  const taxasFixasAnuais = new Decimal(calcularCustosFixosAnuais());

  const manutencaoTotal = manutencaoAnual.times(anos);
  const ipvaTotal = ipvaAnual.times(anos);
  const seguroTotal = seguroAnual.times(anos);
  const taxasTotal = taxasFixasAnuais.times(anos);

  // Depreciação
  const depreciacao = calcularDepreciacao(valorVeiculo, anos);
  const valorRevenda = calcularValorDepreciado(valorVeiculo, anos);

  // Custo de oportunidade sobre a entrada
  const custoOportunidade = calcularCustoOportunidade(entrada, anos);

  // Custo total
  const custoTotal = new Decimal(entrada)
    .plus(totalFinanciamento)
    .plus(manutencaoTotal)
    .plus(ipvaTotal)
    .plus(seguroTotal)
    .plus(taxasTotal)
    .plus(custoOportunidade);

  // Custo líquido (descontando valor de revenda)
  const custoLiquido = custoTotal.minus(valorRevenda);

  return {
    nome: 'Financiamento',
    custoTotal: arredondar(custoTotal),
    valorRevenda: arredondar(valorRevenda),
    custoLiquido: arredondar(custoLiquido),
    breakdown: {
      custoAquisicao: entrada + arredondar(totalFinanciamento),
      manutencao: arredondar(manutencaoTotal),
      seguro: arredondar(seguroTotal),
      ipva: arredondar(ipvaTotal),
      taxasLicenciamento: arredondar(taxasTotal),
      depreciacao: arredondar(depreciacao),
      custoOportunidade: arredondar(custoOportunidade),
      jurosFinanciamento: arredondar(juros),
      iofFinanciamento: arredondar(iof),
    },
  };
}

/**
 * Calcula cenário de assinatura
 *
 * Na assinatura:
 * - Não há propriedade do veículo (valorRevenda = 0)
 * - Não há capital imobilizado (custoOportunidade = 0)
 * - Todos os custos de manutenção, seguro, IPVA estão inclusos na mensalidade
 *
 * @param custoMensal - Custo mensal da assinatura
 * @param prazoMeses - Prazo da assinatura em meses
 * @param anos - Período de comparação em anos
 * @returns Resultado do cenário de assinatura
 */
export function calcularCenarioAssinatura(
  custoMensal: number,
  prazoMeses: number,
  anos: number,
): ResultadoCenario {
  // Custo total da assinatura (com reajustes anuais)
  const custoAssinatura = calcularCustoAssinatura(custoMensal, anos * 12);

  // Assinatura não tem custos extras (já inclusos na mensalidade)
  // Também não tem valor de revenda (não é proprietário)

  // Custo total = custo da assinatura
  const custoTotal = custoAssinatura;

  // Custo líquido = custo total (sem valor de revenda, pois não possui o carro)
  const custoLiquido = custoTotal;

  return {
    nome: 'Assinatura',
    custoTotal: arredondar(custoTotal),
    valorRevenda: 0, // Não é proprietário, não pode revender
    custoLiquido: arredondar(custoLiquido),
    breakdown: {
      custoAquisicao: 0, // Não compra o veículo
      manutencao: 0, // Incluído na mensalidade
      seguro: 0, // Incluído na mensalidade
      ipva: 0, // Incluído na mensalidade
      taxasLicenciamento: 0, // Incluído na mensalidade
      depreciacao: 0, // Não é proprietário
      custoOportunidade: 0, // Não há capital imobilizado
      custoAssinatura: arredondar(custoAssinatura),
    },
  };
}

/**
 * Interface para resultado completo da comparação
 */
export interface ResultadoComparacao {
  compraVista: ResultadoCenario;
  financiamento: ResultadoCenario;
  assinatura: ResultadoCenario;
  melhorOpcao: 'compraVista' | 'financiamento' | 'assinatura';
  economiaMaxima: number;
}

/**
 * Executa comparação completa entre os três cenários
 *
 * @param valorVeiculo - Valor do veículo
 * @param entrada - Entrada para financiamento
 * @param prazoFinanciamentoMeses - Prazo do financiamento em meses
 * @param custoMensalAssinatura - Custo mensal da assinatura
 * @param prazoAssinaturaMeses - Prazo da assinatura em meses
 * @param anos - Período de comparação em anos
 * @returns Resultado completo da comparação
 */
export function compararCenarios(
  valorVeiculo: number,
  entrada: number,
  prazoFinanciamentoMeses: number,
  custoMensalAssinatura: number,
  prazoAssinaturaMeses: number,
  anos: number,
): ResultadoComparacao {
  // Calcular cada cenário
  const compraVista = calcularCenarioCompra(valorVeiculo, anos);
  const financiamento = calcularCenarioFinanciamento(
    valorVeiculo,
    entrada,
    prazoFinanciamentoMeses,
    anos,
  );
  const assinatura = calcularCenarioAssinatura(
    custoMensalAssinatura,
    prazoAssinaturaMeses,
    anos,
  );

  // Determinar melhor opção (menor custo líquido)
  const cenarios = [
    { nome: 'compraVista', custoLiquido: compraVista.custoLiquido },
    { nome: 'financiamento', custoLiquido: financiamento.custoLiquido },
    { nome: 'assinatura', custoLiquido: assinatura.custoLiquido },
  ];

  cenarios.sort((a, b) => a.custoLiquido - b.custoLiquido);

  const melhorOpcao = cenarios[0].nome as
    | 'compraVista'
    | 'financiamento'
    | 'assinatura';
  const economiaMaxima = cenarios[2].custoLiquido - cenarios[0].custoLiquido;

  return {
    compraVista,
    financiamento,
    assinatura,
    melhorOpcao,
    economiaMaxima: arredondar(new Decimal(economiaMaxima)),
  };
}
