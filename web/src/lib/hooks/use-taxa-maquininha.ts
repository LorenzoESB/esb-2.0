import { useState } from 'react';
import { toast } from 'sonner';
import { simularTaxaMaquininha } from '../api/taxa-maquininha';
import type {
  TaxaMaquininhaInput,
  TaxaMaquininhaOutput,
} from '../schemas/taxa-maquininha.schema';

/**
 * Custom hook para gerenciar estado e ações da simulação de taxa de maquininha
 *
 * @returns Estado e funções para simular taxas de maquininha
 */
export function useTaxaMaquininha() {
  const [data, setData] = useState<TaxaMaquininhaOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Executa a simulação de taxas de maquininha
   */
  const simular = async (input: TaxaMaquininhaInput) => {
    setIsLoading(true);
    setError(null);

    try {
      const resultado = await simularTaxaMaquininha(input);
      setData(resultado);

      toast.success('Simulação calculada com sucesso!', {
        description: `${resultado.total} maquininhas encontradas. Melhor opção: ${resultado.melhor_opcao.nome}`,
      });
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : 'Erro ao simular taxas de maquininha';
      setError(errorMessage);

      toast.error('Erro na simulação', {
        description: errorMessage,
      });
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Limpa os dados da simulação
   */
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
}
