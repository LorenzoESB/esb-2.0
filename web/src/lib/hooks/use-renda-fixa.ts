import { useState } from 'react';
import { RendaFixaInput, RendaFixaOutput } from '../schemas/renda-fixa.schema';
import { rendaFixaApi } from '../api/renda-fixa';
import { toast } from 'sonner';

export const useRendaFixa = () => {
  const [data, setData] = useState<RendaFixaOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const simular = async (input: RendaFixaInput) => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await rendaFixaApi.simular(input);
      setData(result);
      toast.success('Simulação realizada com sucesso!', {
        description: `Melhor investimento: ${result.melhorInvestimento}`,
      });
      return result;
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Erro ao simular investimentos em renda fixa';
      setError(errorMessage);
      toast.error('Erro na simulação', {
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
