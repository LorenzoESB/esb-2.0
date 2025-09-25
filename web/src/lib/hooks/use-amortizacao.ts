import { useState } from 'react';
import { toast } from 'sonner';
import { amortizacaoSacApi } from '../api/amortizacao';
import { AmortizacaoSacOutput, AmortizacaoSacInput } from '../schemas/amortizacao.schema';




export const useAmortizacaoSac = () => {
    const [data, setData] = useState<AmortizacaoSacOutput | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const simular = async (input: AmortizacaoSacInput) => {
        setIsLoading(true);
        setError(null);

        try {
            const result = await amortizacaoSacApi.simular(input);
            setData(result);
            toast('Simulação realizada com sucesso!', {
                description: 'Os resultados foram atualizados.',
            });
            return result;
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Erro ao simular amortização';
            setError(errorMessage);
            toast('Erro na simulação', {
                description: errorMessage,
            });
            throw err;
        } finally {
            setIsLoading(false);
        }
    };

    const reset = () => {
        setData(null);
        setError(null);
    };

    return {
        data,
        isLoading,
        error,
        simular,
        reset,
    };
};