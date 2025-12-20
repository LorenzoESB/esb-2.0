import { RankingCriterion } from '../../shared/interfaces/base-ranking.interface';

/**
 * Critérios usados no ranking de carros por assinatura.
 * Notas em escala 0-5, priorizando custo total.
 */
export const CAR_SUBSCRIPTION_CRITERIA: RankingCriterion[] = [
  {
    key: 'custo_total',
    name: 'Custo total',
    weight: 2.25,
    type: 'numeric',
    description: 'Preço mensal considerando pacote padrão e reajustes médios.',
  },
  {
    key: 'franquia_km',
    name: 'Franquia de km',
    weight: 1.5,
    type: 'numeric',
    description: 'Volume de km incluso antes de cobrar excedentes.',
  },
  {
    key: 'servicos_inclusos',
    name: 'Serviços inclusos',
    weight: 1.25,
    type: 'scale',
    description: 'Seguro, IPVA, manutenção preventiva e assistência 24h.',
  },
  {
    key: 'flexibilidade',
    name: 'Flexibilidade',
    weight: 1.0,
    type: 'scale',
    description: 'Troca de carro, pausa de contrato e upgrade facilitados.',
  },
  {
    key: 'reputacao',
    name: 'Reputação e rede',
    weight: 1.0,
    type: 'scale',
    description: 'Histórico da marca, cobertura nacional e avaliação de clientes.',
  },
  {
    key: 'cobertura_seguro',
    name: 'Cobertura do seguro',
    weight: 1.0,
    type: 'scale',
    description: 'Amplitude da cobertura, carro reserva e franquia competitiva.',
  },
];
