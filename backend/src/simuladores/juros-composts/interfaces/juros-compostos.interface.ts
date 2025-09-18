export interface DetalhesMensal {
  mes: number;
  saldoAnterior: number;
  rendimentoMes: number;
  aporte: number;
  novoSaldo: number;
  rendimentoAcumulado: number;
  totalAportado: number;
}

export interface CalculoCompleto {
  saldoFinal: number;
  rendimentoTotalBruto: number;
  totalAportado: number;
  detalhesMensais: DetalhesMensal[];
}

export interface AliquotasIR {
  ate180: number;
  ate360: number;
  ate720: number;
  acima720: number;
}
