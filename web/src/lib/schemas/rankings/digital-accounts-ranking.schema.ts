import { z } from 'zod';
import { RankingCriterionSchema } from './card-machines-ranking.schema';

const DigitalAccountScoreBreakdownSchema = z.object({
  key: z.string(),
  name: z.string(),
  raw_score: z.number(),
  weight: z.number(),
  contribution: z.number(),
  percentage: z.number(),
});

const DigitalAccountFeaturesSchema = z.object({
  credit_card: z.boolean(),
  debit_card: z.boolean(),
  investments: z.boolean(),
  boletos: z.boolean(),
  saques_ilimitados: z.boolean(),
  atendimento_humanizado: z.boolean(),
});

export const DigitalAccountRankingItemSchema = z.object({
  id: z.number(),
  name: z.string(),
  bank: z.string(),
  rank: z.number(),
  isBestOption: z.boolean(),
  logo: z.string(),
  monthly_fee: z.number(),
  account_type: z.enum(['pf', 'pj', 'ambos']),
  score: z.number(),
  url_ranking: z.string(),
  call_to_action: z.string(),
  highlights: z.array(z.string()),
  features: DigitalAccountFeaturesSchema,
  scoreBreakdown: z.array(DigitalAccountScoreBreakdownSchema),
  data_atualizacao: z.string(),
});

export const DigitalAccountRankingResponseSchema = z.object({
  items: z.array(DigitalAccountRankingItemSchema),
  total: z.number(),
  bestOption: DigitalAccountRankingItemSchema,
  criteria: z.array(RankingCriterionSchema),
  lastUpdated: z.string().or(z.date()),
});

export const DigitalAccountRankingQuerySchema = z.object({
  companies: z.array(z.string()).optional(),
  tipo_conta: z.enum(['pf', 'pj', 'ambos']).optional(),
  max_mensalidade: z.number().optional(),
  exige_cartao_credito: z.boolean().optional(),
  exige_investimentos: z.boolean().optional(),
});

export type DigitalAccountRankingItem = z.infer<
  typeof DigitalAccountRankingItemSchema
>;
export type DigitalAccountRankingResponse = z.infer<
  typeof DigitalAccountRankingResponseSchema
>;
export type DigitalAccountRankingQuery = z.infer<
  typeof DigitalAccountRankingQuerySchema
>;
