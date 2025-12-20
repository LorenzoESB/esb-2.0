import { z } from 'zod';
import { RankingCriterionSchema } from './card-machines-ranking.schema';

const TollPassScoreBreakdownSchema = z.object({
  key: z.string(),
  name: z.string(),
  raw_score: z.number(),
  weight: z.number(),
  contribution: z.number(),
  percentage: z.number(),
});

const TollPassPricingSchema = z.object({
  mensalidade: z.number(),
  adesao: z.number(),
  taxa_instalacao: z.number().optional(),
});

const TollPassBenefitsSchema = z.object({
  estacionamento: z.boolean(),
  cashback: z.boolean(),
  parceiros: z.array(z.string()),
});

export const TollPassRankingItemSchema = z.object({
  id: z.number(),
  name: z.string(),
  empresa: z.string(),
  rank: z.number(),
  isBestOption: z.boolean(),
  logo: z.string(),
  score: z.number(),
  pricing: TollPassPricingSchema,
  cobertura_rodovias: z.number(),
  beneficios: TollPassBenefitsSchema,
  tags_adicionais: z.array(z.string()).optional(),
  url_contratacao: z.string(),
  scoreBreakdown: z.array(TollPassScoreBreakdownSchema),
  data_atualizacao: z.string(),
});

export const TollPassRankingResponseSchema = z.object({
  items: z.array(TollPassRankingItemSchema),
  total: z.number(),
  bestOption: TollPassRankingItemSchema,
  criteria: z.array(RankingCriterionSchema),
  lastUpdated: z.string().or(z.date()),
});

export const TollPassRankingQuerySchema = z.object({
  companies: z.array(z.string()).optional(),
  max_mensalidade: z.number().optional(),
  exige_estacionamento: z.boolean().optional(),
});

export type TollPassRankingItem = z.infer<typeof TollPassRankingItemSchema>;
export type TollPassRankingResponse = z.infer<
  typeof TollPassRankingResponseSchema
>;
export type TollPassRankingQuery = z.infer<typeof TollPassRankingQuerySchema>;
