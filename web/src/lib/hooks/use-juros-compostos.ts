import { useState } from 'react';

import { JurosCompostosInput, JurosCompostosOutput } from '../schemas/juros-compostos.schema';
import { jurosCompostosApi } from '../api/juros-composts';
import { toast } from 'sonner';


export const useJurosCompostos = () => {
    const [data, setData] = useState<JurosCompostosOutput | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const calcular = async (input: JurosCompostosInput) => {
        setIsLoading(true);
        setError(null);

        try {
            const result = await jurosCompostosApi.calcular(input);
            setData(result);
            toast.success('Cálculo realizado com sucesso!', {
                description: 'Os resultados foram atualizados.',
            });
            return result;
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Erro ao calcular juros compostos';
            setError(errorMessage);
            toast.error('Erro no cálculo', {
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
        calcular,
        reset,
    };
};