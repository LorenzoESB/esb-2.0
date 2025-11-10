import { z } from 'zod';

export const CombustivelInputSchema = z.object({
    precoGasolina: z.number().min(0).optional(),
    precoEtanol: z.number().min(0).optional(),
    consumoGasolina: z.number().min(0).optional(),
    consumoEtanol: z.number().min(0).optional(),
});

export const CombustivelOutputSchema = z.object({
    recomendacao: z.enum(['Gasolina', 'Etanol']),
    custos: z.object({
        gasolina: z.object({
            custoPorKm: z.number(),
            custoFormatado: z.string(),
        }),
        etanol: z.object({
            custoPorKm: z.number(),
            custoFormatado: z.string(),
        }),
    }),
    economia: z.object({
        valor: z.number(),
        valorFormatado: z.string(),
        percentual: z.number(),
    }),
    mensagem: z.string(),
});

export type CombustivelOutput = z.infer<typeof CombustivelOutputSchema>;
export type CombustivelInput = z.infer<typeof CombustivelInputSchema>;