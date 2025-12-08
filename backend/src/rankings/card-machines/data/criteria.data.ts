import { RankingCriterion } from '../../shared/interfaces/base-ranking.interface';

/**
 * Criteria used for card machine ranking calculation
 *
 * Total of 8 criteria with different weights
 * Higher weight = more impact on final score
 *
 * Note: Competitive Rates has 3x weight compared to most other criteria
 */
export const CARD_MACHINE_CRITERIA: RankingCriterion[] = [
  {
    key: 'competitive_rates',
    name: 'Taxas Competitivas',
    weight: 3.0,
    type: 'numeric',
    description:
      'Avalia o quão competitivas são as taxas de débito, crédito à vista e parcelado. Peso triplo por ser o fator mais importante para comerciantes.',
  },
  {
    key: 'transparency',
    name: 'Transparência',
    weight: 2.0,
    type: 'numeric',
    description:
      'Clareza nas informações sobre taxas, prazos e custos. Mede se a empresa é transparente em sua comunicação.',
  },
  {
    key: 'features',
    name: 'Funcionalidades',
    weight: 1.5,
    type: 'numeric',
    description:
      'Quantidade e qualidade de funcionalidades oferecidas (NFC, impressora, conexões, bandeiras aceitas, etc.).',
  },
  {
    key: 'receivables_anticipation',
    name: 'Antecipação de Recebíveis',
    weight: 1.0,
    type: 'boolean',
    description:
      'Possibilidade de antecipar o recebimento das vendas. Critério binário (possui ou não possui).',
  },
  {
    key: 'reputation',
    name: 'Reputação',
    weight: 1.5,
    type: 'numeric',
    description:
      'Reputação da empresa no mercado, baseada em avaliações de usuários e tempo de atuação.',
  },
  {
    key: 'support_quality',
    name: 'Qualidade do Suporte',
    weight: 1.0,
    type: 'numeric',
    description:
      'Qualidade e disponibilidade do atendimento ao cliente (canais disponíveis, tempo de resposta, avaliação do suporte).',
  },
  {
    key: 'installment_options',
    name: 'Opções de Parcelamento',
    weight: 1.0,
    type: 'numeric',
    description:
      'Número máximo de parcelas permitidas e flexibilidade nas opções de parcelamento.',
  },
  {
    key: 'meal_vouchers',
    name: 'Vale Refeição',
    weight: 0.5,
    type: 'boolean',
    description:
      'Aceita vale refeição e alimentação. Menor peso por ser relevante apenas para alguns segmentos.',
  },
];

/**
 * Calculate total weight sum for normalization
 */
export const TOTAL_CRITERIA_WEIGHT = CARD_MACHINE_CRITERIA.reduce(
  (sum, criterion) => sum + criterion.weight,
  0,
);

/**
 * Get criterion by key
 */
export function getCriterionByKey(key: string): RankingCriterion | undefined {
  return CARD_MACHINE_CRITERIA.find((c) => c.key === key);
}

/**
 * Validate that all required criteria keys are present in raw scores
 */
export function validateRawScores(rawScores: Record<string, number>): boolean {
  return CARD_MACHINE_CRITERIA.every((criterion) => {
    return rawScores.hasOwnProperty(criterion.key);
  });
}
