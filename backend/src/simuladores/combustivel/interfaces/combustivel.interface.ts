/**
 * Interface para entrada de cálculo de combustível
 */
export interface CombustivelInput {
  precoGasolina: number;
  precoEtanol: number;
  consumoGasolina: number;
  consumoEtanol: number;
}

/**
 * Interface para resultado de cálculo de custo por km
 */
export interface CustoPorKm {
  gasolina: number;
  etanol: number;
}

/**
 * Interface para resultado de economia
 */
export interface Economia {
  valor: number;
  percentual: number;
}

/**
 * Interface para resultado completo do cálculo
 */
export interface ResultadoCalculo {
  recomendacao: 'Gasolina' | 'Etanol';
  custos: CustoPorKm;
  economia: Economia;
}