import {
  BaseRankingItem,
  RawScores,
  RankingCriterion,
} from '../../shared/interfaces/base-ranking.interface';

export interface DigitalAccountFeatures {
  credit_card: boolean;
  debit_card: boolean;
  investments: boolean;
  boletos: boolean;
  saques_ilimitados: boolean;
  atendimento_humanizado: boolean;
}

export interface DigitalAccountData extends BaseRankingItem {
  /**
   * Nome comercial da conta
   */
  nome: string;

  /**
   * Banco/fintech responsável
   */
  banco: string;

  /**
   * URL do logo (mantido estático para não depender de storage externo)
   */
  logo: string;

  /**
   * URL de contratação ou avaliação
   */
  url_ranking: string;

  /**
   * Texto do botão (ex.: Abrir conta, Contratar)
   */
  botao: string;

  /**
   * Mensalidade/ tarifa de manutenção
   */
  mensalidade: number;

  /**
   * Tipo de público atendido
   */
  tipo_conta: 'pf' | 'pj' | 'ambos';

  /**
   * Pontos fortes exibidos no front
   */
  destaques: string[];

  /**
   * Notas por critério (0-5) usadas para cálculo ponderado
   */
  raw_scores: RawScores;

  /**
   * Nota consolidada (0-5) vinda do legado
   */
  static_score: number;

  /**
   * Características principais
   */
  features: DigitalAccountFeatures;

  /**
   * Data da última revisão manual do ranking
   */
  data_atualizacao: Date;

  /**
   * Critérios utilizados no ranking
   */
  criteria?: RankingCriterion[];

  /**
   * Ativo/inativo
   */
  ativo: boolean;
}
