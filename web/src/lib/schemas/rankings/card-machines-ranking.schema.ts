import { z } from 'zod';

/**
 * Ranking criterion schema
 */
export const RankingCriterionSchema = z.object({
  key: z.string(),
  name: z.string(),
  weight: z.number(),
  type: z.enum(['boolean', 'numeric', 'scale']),
  description: z.string().optional(),
});

/**
 * Machine plan schema
 */
export const MachinePlanSchema = z.object({
  id: z.number(),
  nome: z.string(),
  taxa_debito: z.string(),
  taxa_credito_vista: z.string(),
  taxa_credito_parcelado_min: z.string(),
  dias_repasse_debito: z.number(),
  dias_repasse_credito: z.number(),
  avaliacao: z.number(),
});

/**
 * Machine features schema
 */
export const MachineFeaturesSchema = z.object({
  chip: z.boolean(),
  tarja: z.boolean(),
  nfc: z.boolean(),
  com_fio: z.boolean(),
  imprime_recibo: z.boolean(),
  precisa_smartphone: z.boolean(),
  permite_antecipacao: z.boolean(),
  atende_pf: z.boolean(),
  atende_pj: z.boolean(),
  vale_refeicao: z.boolean(),
  ecommerce: z.boolean(),
  max_parcelas: z.number(),
  garantia: z.number().nullable(),
  tipos_conexao: z.array(z.string()),
  bandeiras: z.array(z.string()),
  formas_recebimento: z.array(z.string()),
});

/**
 * Machine pricing schema
 */
export const MachinePricingSchema = z.object({
  preco: z.number(),
  preco_promocional: z.number().nullable(),
  mensalidade: z.number(),
});

/**
 * Card machine ranking item schema
 */
export const CardMachineRankingItemSchema = z.object({
  id: z.number(),
  name: z.string(),
  rank: z.number(),
  isBestOption: z.boolean(),
  empresa: z.string(),
  logo: z.string(),
  imagem: z.string(),
  features: MachineFeaturesSchema,
  pricing: MachinePricingSchema,
  planos: z.array(MachinePlanSchema),
  observacoes: z.string().nullable(),
  url_contratacao: z.string(),
  cupom: z.string().nullable(),
  transparencia: z.number().nullable(),
  url_avaliacao: z.string().nullable(),
  data_atualizacao: z.string(),
});

/**
 * Card machine ranking response schema
 */
export const CardMachineRankingResponseSchema = z.object({
  items: z.array(CardMachineRankingItemSchema),
  total: z.number(),
  bestOption: CardMachineRankingItemSchema,
  criteria: z.array(RankingCriterionSchema),
  lastUpdated: z.string().or(z.date()),
});

/**
 * Ranking query filters schema
 */
export const CardMachineRankingQuerySchema = z.object({
  nfc: z.boolean().optional(),
  imprime_recibo: z.boolean().optional(),
  precisa_smartphone: z.boolean().optional(),
  permite_antecipacao: z.boolean().optional(),
  vale_refeicao: z.boolean().optional(),
  ecommerce: z.boolean().optional(),
  companies: z.array(z.string()).optional(),
  sem_mensalidade: z.boolean().optional(),
});

// Type exports
export type RankingCriterion = z.infer<typeof RankingCriterionSchema>;
export type MachinePlan = z.infer<typeof MachinePlanSchema>;
export type MachineFeatures = z.infer<typeof MachineFeaturesSchema>;
export type MachinePricing = z.infer<typeof MachinePricingSchema>;
export type CardMachineRankingItem = z.infer<
  typeof CardMachineRankingItemSchema
>;
export type CardMachineRankingResponse = z.infer<
  typeof CardMachineRankingResponseSchema
>;
export type CardMachineRankingQuery = z.infer<
  typeof CardMachineRankingQuerySchema
>;
