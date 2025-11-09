import { useState } from "react";
import { CombustivelInput, CombustivelOutput } from "../schemas/combustivel.schema";
import { toast } from "sonner";
import { combustivelApi } from "../api/combustivel";

export const useCombustivel = () => {
    const [data, setData] = useState<CombustivelOutput | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const calcular = async (input: CombustivelInput) => {
        setIsLoading(true);
        setError(null);

        try {
            const result = await combustivelApi.calcular(input);
            setData(result);
            toast.success('Cálculo realizado com sucesso!', {
                description: 'Os resultados foram atualizados.',
            });
            return result;
        }
        catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Erro ao calcular combustível';
            setError(errorMessage);
            toast.error('Erro no cálculo', {
                description: errorMessage,
            });
            throw err;
        }
        finally {
            setIsLoading(false);
        }
    }

    const reset = () => {
        setData(null);
        setError(null);
    }

    return {
        data,
        isLoading,
        error,
        calcular,
        reset,
    };
};