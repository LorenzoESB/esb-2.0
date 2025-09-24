import { ApiProperty } from '@nestjs/swagger';

export class ParcelaDto {
  @ApiProperty({ description: 'Installment number' })
  numero: number;

  @ApiProperty({ description: 'Payment date', required: false })
  dataVencimento?: string;

  @ApiProperty({ description: 'Beginning balance' })
  saldoInicial: number;

  @ApiProperty({ description: 'Principal payment' })
  amortizacao: number;

  @ApiProperty({ description: 'Interest payment' })
  juros: number;

  @ApiProperty({ description: 'Total payment (principal + interest)' })
  prestacao: number;

  @ApiProperty({ description: 'Insurance amount' })
  seguro: number;

  @ApiProperty({ description: 'Administrative fee' })
  taxaAdministracao: number;

  @ApiProperty({ description: 'Total payment including fees' })
  pagamentoTotal: number;

  @ApiProperty({ description: 'Ending balance' })
  saldoFinal: number;

  @ApiProperty({
    description: 'Extraordinary amortization amount',
    required: false,
  })
  amortizacaoExtraordinaria?: number;

  @ApiProperty({ description: 'Accumulated principal paid' })
  amortizacaoAcumulada: number;

  @ApiProperty({ description: 'Accumulated interest paid' })
  jurosAcumulados: number;
}

export class ResumoAmortizacaoDto {
  @ApiProperty({ description: 'Loan principal amount' })
  valorFinanciamento: number;

  @ApiProperty({ description: 'Annual interest rate (percentage)' })
  taxaJurosAnual: number;

  @ApiProperty({ description: 'Monthly interest rate (percentage)' })
  taxaJurosMensal: number;

  @ApiProperty({ description: 'Original loan term in months' })
  prazoOriginal: number;

  @ApiProperty({
    description: 'Effective loan term after extraordinary amortizations',
  })
  prazoEfetivo: number;

  @ApiProperty({ description: 'Total amount paid' })
  totalPago: number;

  @ApiProperty({ description: 'Total interest paid' })
  totalJuros: number;

  @ApiProperty({ description: 'Total principal paid' })
  totalAmortizacao: number;

  @ApiProperty({ description: 'Total insurance paid' })
  totalSeguro: number;

  @ApiProperty({ description: 'Total administrative fees paid' })
  totalTaxaAdministracao: number;

  @ApiProperty({ description: 'Total extraordinary amortizations' })
  totalAmortizacoesExtraordinarias: number;

  @ApiProperty({ description: 'Average monthly payment' })
  prestacaoMedia: number;

  @ApiProperty({ description: 'First payment amount' })
  primeiraPrestacao: number;

  @ApiProperty({ description: 'Last payment amount' })
  ultimaPrestacao: number;

  @ApiProperty({ description: 'Amortization system used' })
  sistemaAmortizacao: string;

  @ApiProperty({ description: 'Effective cost of financing (CET)' })
  custoEfetivoTotal: number;
}

export class AmortizacaoOutputDto {
  @ApiProperty({ type: ResumoAmortizacaoDto })
  resumo: ResumoAmortizacaoDto;

  @ApiProperty({ type: [ParcelaDto] })
  parcelas: ParcelaDto[];

  @ApiProperty({
    description: 'Monthly evolution chart data',
    required: false,
  })
  graficoDados?: {
    labels: string[];
    saldoDevedor: number[];
    amortizacao: number[];
    juros: number[];
    prestacao: number[];
  };
}

export class SimulacaoComparativaDto {
  @ApiProperty({ type: [AmortizacaoOutputDto] })
  simulacoes: AmortizacaoOutputDto[];

  @ApiProperty({ description: 'Comparative analysis' })
  analiseComparativa: {
    sistemaComMenorJurosTotal: string;
    sistemaComMenorPrestacaoInicial: string;
    sistemaComMaiorAmortizacaoInicial: string;
    economiaMaximaJuros: number;
  };
}
