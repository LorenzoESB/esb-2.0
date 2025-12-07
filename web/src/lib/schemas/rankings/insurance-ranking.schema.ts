import { z } from 'zod';
import { RankingCriterionSchema } from './card-machines-ranking.schema';

export const InsuranceCoverageSchema = z.object({
  cobertura_basica: z.boolean(),
  cobertura_total: z.boolean(),
  cobertura_terceiros: z.boolean(),
  vidros: z.boolean(),
  roubo_furto: z.boolean(),
  colisao: z.boolean(),
  incendio: z.boolean(),
  fenomenos_naturais: z.boolean(),
  assistencia_24h: z.boolean(),
  carro_reserva: z.boolean(),
});

export const InsuranceServicesSchema = z.object({
  atendimento_online: z.boolean(),
  app_mobile: z.boolean(),
  guincho_km: z.number().nullable(),
  oficinas_referenciadas: z.number().nullable(),
  desconto_bom_motorista: z.boolean(),
  desconto_garagem: z.boolean(),
});

export const InsurancePricingSchema = z.object({
  franquia_minima: z.number(),
  franquia_maxima: z.number(),
  preco_mensal_estimado_min: z.number(),
  preco_mensal_estimado_max: z.number(),
});

export const InsuranceScoreBreakdownSchema = z.object({
  key: z.string(),
  name: z.string(),
  raw_score: z.number(),
  weight: z.number(),
  contribution: z.number(),
  percentage: z.number(),
});

export const InsuranceRankingItemSchema = z.object({
  id: z.number(),
  name: z.string(),
  rank: z.number(),
  isBestOption: z.boolean(),
  company: z.string(),
  logo: z.string(),
  score: z.number(),
  coverage: InsuranceCoverageSchema,
  services: InsuranceServicesSchema,
  pricing: InsurancePricingSchema,
  avaliacao_clientes: z.number(),
  tempo_mercado_anos: z.number(),
  sinistros_aprovados_percentual: z.number(),
  observacoes: z.string().nullable(),
  url_contratacao: z.string(),
  url_avaliacao: z.string().nullable(),
  data_atualizacao: z.string(),
  scoreBreakdown: z.array(InsuranceScoreBreakdownSchema),
});

export const InsuranceRankingResponseSchema = z.object({
  items: z.array(InsuranceRankingItemSchema),
  total: z.number(),
  bestOption: InsuranceRankingItemSchema,
  criteria: z.array(RankingCriterionSchema),
  lastUpdated: z.string().or(z.date()),
});

export const InsuranceRankingQuerySchema = z.object({
  companies: z.array(z.string()).optional(),
  cobertura_total: z.boolean().optional(),
  assistencia_24h: z.boolean().optional(),
  carro_reserva: z.boolean().optional(),
  max_preco_mensal: z.number().optional(),
});

export type InsuranceCoverage = z.infer<typeof InsuranceCoverageSchema>;
export type InsuranceServices = z.infer<typeof InsuranceServicesSchema>;
export type InsurancePricing = z.infer<typeof InsurancePricingSchema>;
export type InsuranceScoreBreakdown = z.infer<
  typeof InsuranceScoreBreakdownSchema
>;
export type InsuranceRankingItem = z.infer<typeof InsuranceRankingItemSchema>;
export type InsuranceRankingResponse = z.infer<
  typeof InsuranceRankingResponseSchema
>;
export type InsuranceRankingQuery = z.infer<typeof InsuranceRankingQuerySchema>;
