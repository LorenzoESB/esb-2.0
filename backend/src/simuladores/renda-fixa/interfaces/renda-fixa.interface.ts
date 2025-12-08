/**
 * Interface para parâmetros econômicos externos (Selic, CDI, TR)
 */
export interface ParametrosEconomicos {
  selicAnual: number;
  cdiAnual: number;
  trMensal: number;
}

/**
 * Interface para resultado de cada modalidade de investimento
 */
export interface ResultadoModalidade {
  taxa: number;
  resultado: number;
  imposto: number;
  rendimentoLiquido: number;
  percentualRendimento: number;
}

/**
 * Interface para comparação entre investimentos
 */
export interface ComparacaoInvestimentos {
  poupanca: ResultadoModalidade;
  tesouroDireto: ResultadoModalidade;
  lci: ResultadoModalidade;
  cdb: ResultadoModalidade;
  melhorInvestimento: string;
  melhorRendimento: number;
  totalInvestido: number;
  taxaSelic: number;
  taxaCdi: number;
}
