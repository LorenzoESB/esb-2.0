import { RankingCriterion } from '../../shared/interfaces/base-ranking.interface';

/**
 * Critérios usados para ordenar tags de pedágio expresso.
 * Escala das notas: 0-5.
 */
export const TOLL_PASS_CRITERIA: RankingCriterion[] = [
  {
    key: 'custo_mensal',
    name: 'Custo mensal',
    weight: 2.0,
    type: 'numeric',
    description: 'Mensalidade/assinatura recorrente. Quanto menor, melhor.',
  },
  {
    key: 'cobertura',
    name: 'Cobertura',
    weight: 1.5,
    type: 'numeric',
    description: 'Abrangência em rodovias, estacionamentos e shoppings.',
  },
  {
    key: 'beneficios',
    name: 'Benefícios',
    weight: 1.0,
    type: 'scale',
    description: 'Descontos, cashback e conveniências adicionais.',
  },
  {
    key: 'facilidade',
    name: 'Facilidade de uso',
    weight: 1.0,
    type: 'scale',
    description: 'Adesão digital, app e prazo de entrega do adesivo/tag.',
  },
  {
    key: 'transparencia',
    name: 'Transparência',
    weight: 0.5,
    type: 'scale',
    description: 'Clareza de tarifas, suporte e ausência de cobranças ocultas.',
  },
];
