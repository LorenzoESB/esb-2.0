import { z } from 'zod';
import { RankingCriterionSchema } from './card-machines-ranking.schema';

const CarSubscriptionScoreBreakdownSchema = z.object({
  key: z.string(),
  name: z.string(),
  raw_score: z.number(),
  weight: z.number(),
  contribution: z.number(),
  percentage: z.number(),
});

const CarSubscriptionPricingSchema = z.object({
  preco_mensal_min: z.number(),
  preco_mensal_max: z.number(),
  franquia_km: z.number(),
});

const CarSubscriptionBenefitsSchema = z.object({
  manutencao_inclusa: z.boolean(),
  seguro_incluso: z.boolean(),
  ipva_incluso: z.boolean(),
  revisao_inclusa: z.boolean(),
  observacoes: z.array(z.string()).optional(),
});

export const CarSubscriptionRankingItemSchema = z.object({
  id: z.number(),
  name: z.string(),
  empresa: z.string(),
  rank: z.number(),
  isBestOption: z.boolean(),
  logo: z.string(),
  score: z.number(),
  pricing: CarSubscriptionPricingSchema,
  beneficios: CarSubscriptionBenefitsSchema,
  desconto: z.string().optional(),
  url_contratacao: z.string(),
  scoreBreakdown: z.array(CarSubscriptionScoreBreakdownSchema),
  data_atualizacao: z.string(),
});

export const CarSubscriptionRankingResponseSchema = z.object({
  items: z.array(CarSubscriptionRankingItemSchema),
  total: z.number(),
  bestOption: CarSubscriptionRankingItemSchema,
  criteria: z.array(RankingCriterionSchema),
  lastUpdated: z.string().or(z.date()),
});

export const CarSubscriptionRankingQuerySchema = z.object({
  companies: z.array(z.string()).optional(),
  max_preco_mensal: z.number().optional(),
  exige_seguro_incluso: z.boolean().optional(),
});

export type CarSubscriptionRankingItem = z.infer<
  typeof CarSubscriptionRankingItemSchema
>;
export type CarSubscriptionRankingResponse = z.infer<
  typeof CarSubscriptionRankingResponseSchema
>;
export type CarSubscriptionRankingQuery = z.infer<
  typeof CarSubscriptionRankingQuerySchema
>;
