export interface CalculoParcela {
  numero: number;
  dataVencimento?: Date;
  saldoInicial: number;
  amortizacao: number;
  juros: number;
  prestacao: number;
  seguro: number;
  taxaAdministracao: number;
  pagamentoTotal: number;
  saldoFinal: number;
  amortizacaoExtraordinaria?: number;
  amortizacaoAcumulada: number;
  jurosAcumulados: number;
}

export interface TabelaAmortizacao {
  parcelas: CalculoParcela[];
  resumo: ResumoCalculo;
}

export interface ResumoCalculo {
  valorFinanciamento: number;
  taxaJurosAnual: number;
  taxaJurosMensal: number;
  prazoOriginal: number;
  prazoEfetivo: number;
  totalPago: number;
  totalJuros: number;
  totalAmortizacao: number;
  totalSeguro: number;
  totalTaxaAdministracao: number;
  totalAmortizacoesExtraordinarias: number;
  prestacaoMedia: number;
  primeiraPrestacao: number;
  ultimaPrestacao: number;
  sistemaAmortizacao: string;
  custoEfetivoTotal: number;
}

export interface AmortizacaoExtraordinaria {
  valor: number;
  mesOcorrencia: number;
  tipo: 'DIMINUIR_PARCELA' | 'DIMINUIR_PRAZO';
}
