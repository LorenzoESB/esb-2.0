import { useState } from 'react';
import { toast } from 'sonner';
import { aposentadoriaApi } from '../api/aposentadoria';
import type { SimularAposentadoriaInput, ResultadoAposentadoria } from '../schemas/aposentadoria.schema';

export const useAposentadoria = () => {
    const [data, setData] = useState<ResultadoAposentadoria | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const simular = async (input: SimularAposentadoriaInput) => {
        setIsLoading(true);
        setError(null);

        try {
            const result = await aposentadoriaApi.simular(input);
            setData(result);
            toast('Simulação realizada com sucesso!', {
                description: 'Os resultados foram atualizados.',
            });
            return result;
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Erro ao simular aposentadoria';
            setError(errorMessage);
            toast('Erro na simulação', {
                description: errorMessage,
            });
            throw err;
        } finally {
            setIsLoading(false);
        }
    };

    const limpar = () => {
        setData(null);
        setError(null);
    };

    return {
        data,
        isLoading,
        error,
        simular,
        limpar,
    };
};
