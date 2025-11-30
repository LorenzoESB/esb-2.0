// Types baseados nos DTOs do backend

export enum ModoCalculoAposentadoria {
  RECEBER = 'RECEBER',
  CONTRIBUIR = 'CONTRIBUIR',
}

export interface SimularAposentadoriaInput {
  modoCalculo: ModoCalculoAposentadoria;
  idadeAtual: number;
  idadeAposentadoria: number;
  valorJaAcumulado: number;
  rendaMensalDesejada?: number;
  contribuicaoMensal?: number;
  incluirCenariosSaque?: boolean;
}

export interface ParametrosCalculo {
  idadeAtual: number;
  idadeAposentadoria: number;
  valorJaAcumulado: number;
  taxaJurosMensal: number;
  taxaJurosAnual: number;
  expectativaVida: number;
}

export interface Acumulacao {
  mesesContribuicao: number;
  anosContribuicao: number;
  contribuicaoMensal: number;
  valorFuturoReserva: number;
  valorFuturoContribuicoes: number;
  valorTotalAcumulado: number;
}

export interface Usufruto {
  idadeInicio: number;
  idadeFim: number;
  mesesBeneficio: number;
  rendaMensal: number;
  valorTotalRecebido: number;
}

export interface CenarioSaque {
  valorSaqueMensal: number;
  duracaoMeses: number;
  duracaoAnos: number;
  consumePrincipal: boolean;
  saldoFinal: number;
  observacao: string;
}

export interface Sustentabilidade {
  rendimentoMensalPuro: number;
  cenarios: CenarioSaque[];
}

export interface Resumo {
  totalInvestido: number;
  totalRecebido: number;
  saldoPatrimonial: number;
}

export interface ResultadoAposentadoria {
  parametros: ParametrosCalculo;
  acumulacao: Acumulacao;
  usufruto: Usufruto;
  sustentabilidade: Sustentabilidade;
  resumo: Resumo;
}

export interface ApiError {
  statusCode: number;
  message: string | string[];
  error: string;
}
