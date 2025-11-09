import { z } from 'zod';

export const CombustivelInputSchema = z.object({
    precoGasolina: z.number().min(0).optional(),
    precoEtanol: z.number().min(0).optional(),
    consumoGasolina: z.number().min(0).optional(),
    consumoEtanol: z.number().min(0).optional(),
    distanciaMensal: z.number().min(0).optional(),
});

export const CombustivelOutputSchema = z.object({
    custoMensalGasolina: z.number(),
    custoMensalEtanol: z.number(),
    melhorOpcao: z.enum(['gasolina', 'etanol', 'indiferente']),
});

export type CombustivelOutput = z.infer<typeof CombustivelOutputSchema>;
export type CombustivelInput = z.infer<typeof CombustivelInputSchema>;