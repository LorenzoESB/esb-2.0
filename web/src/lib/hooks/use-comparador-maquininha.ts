import { useState } from 'react';
import { toast } from 'sonner';
import { compararMaquininhas } from '../api/comparador-maquininha';
import type {
  ComparadorMaquininhaInput,
  ResultadoComparacao,
} from '../schemas/comparador-maquininha.schema';

/**
 * Custom hook para gerenciar estado e ações da comparação de maquininhas
 *
 * @returns Estado e funções para comparar maquininhas
 */
export function useComparadorMaquininha() {
  const [data, setData] = useState<ResultadoComparacao | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Executa a comparação de maquininhas
   */
  const comparar = async (input: ComparadorMaquininhaInput) => {
    setIsLoading(true);
    setError(null);

    try {
      const resultado = await compararMaquininhas(input);
      setData(resultado);

      toast.success('Comparação realizada com sucesso!', {
        description: `${resultado.total} maquininhas comparadas`,
      });
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : 'Erro ao comparar maquininhas';
      setError(errorMessage);

      toast.error('Erro na comparação', {
        description: errorMessage,
      });
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Limpa os dados da comparação
   */
  const limpar = () => {
    setData(null);
    setError(null);
  };

  return {
    data,
    isLoading,
    error,
    comparar,
    limpar,
  };
}
