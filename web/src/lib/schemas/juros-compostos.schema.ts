import { z } from 'zod';

export const TempoAplicacaoUnidadeEnum = z.enum(['meses', 'anos']);

export const JurosCompostosInputSchema = z.object({
    valorInicial: z
        .number()
        .min(0, 'Valor inicial deve ser maior ou igual a zero')
        .transform((val) => Number(val)),
    aporteMensal: z
        .number()
        .min(0, 'Aporte mensal deve ser maior ou igual a zero')
        .transform((val) => Number(val)),
    tempoAplicacao: z
        .number()
        .min(1, 'Tempo de aplicação deve ser maior que zero')
        .transform((val) => Number(val)),
    tempoAplicacaoUnidade: TempoAplicacaoUnidadeEnum,
    taxaJuros: z
        .number()
        .min(0, 'Taxa de juros deve ser maior ou igual a zero')
        .max(100, 'Taxa de juros deve ser menor ou igual a 100')
        .transform((val) => Number(val)),
    email: z.string().email('Email inválido').optional().or(z.literal('')),
});

export const JurosCompostosMensalSchema = z.object({
    mes: z.number(),
    valorInvestido: z.number(),
    valorComJuros: z.number(),
    jurosDoMes: z.number(),
    jurosAcumulados: z.number(),
});

export const JurosCompostosResumoSchema = z.object({
    valorTotalFinalBruto: z.number(),
    totalInvestido: z.number(),
    totalEmJurosBruto: z.number(),
});

export const JurosCompostosOutputSchema = z.object({
    resumo: JurosCompostosResumoSchema,
    detalhesMensais: z.array(JurosCompostosMensalSchema),
});

export type JurosCompostosInput = z.infer<typeof JurosCompostosInputSchema>;
export type JurosCompostosOutput = z.infer<typeof JurosCompostosOutputSchema>;
export type JurosCompostosResumo = z.infer<typeof JurosCompostosResumoSchema>;
export type JurosCompostosMensal = z.infer<typeof JurosCompostosMensalSchema>;