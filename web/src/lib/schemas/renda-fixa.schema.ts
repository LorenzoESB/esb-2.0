import { z } from 'zod';

export const RendaFixaInputSchema = z.object({
  investimentoInicial: z
    .number()
    .min(0, 'Investimento inicial deve ser maior ou igual a zero')
    .transform((val) => Number(val)),
  aporteMensal: z
    .number()
    .min(0, 'Aporte mensal deve ser maior ou igual a zero')
    .optional()
    .default(0)
    .transform((val) => Number(val)),
  prazoMeses: z
    .number()
    .min(1, 'Prazo deve ser pelo menos 1 mês')
    .transform((val) => Number(val)),
  nome: z.string().min(1, 'Nome é obrigatório'),
  email: z.string().email('Email inválido'),
});

export const ResultadoModalidadeSchema = z.object({
  taxa: z.number(),
  resultado: z.number(),
  imposto: z.number(),
  rendimentoLiquido: z.number(),
  percentualRendimento: z.number(),
});

export const RendaFixaOutputSchema = z.object({
  poupanca: ResultadoModalidadeSchema,
  tesouroDireto: ResultadoModalidadeSchema,
  lci: ResultadoModalidadeSchema,
  cdb: ResultadoModalidadeSchema,
  melhorInvestimento: z.string(),
  melhorRendimento: z.number(),
  totalInvestido: z.number(),
  taxaSelic: z.number(),
  taxaCdi: z.number(),
  taxaTr: z.number(),
});

export type RendaFixaInput = z.infer<typeof RendaFixaInputSchema>;
export type RendaFixaOutput = z.infer<typeof RendaFixaOutputSchema>;
export type ResultadoModalidade = z.infer<typeof ResultadoModalidadeSchema>;
