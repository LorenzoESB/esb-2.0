import { useState } from 'react';
import { toast } from 'sonner';
import { simularFinanciamentoImobiliario } from '../api/financiamento-imobiliario';
import type {
  FinanciamentoImobiliarioInput,
  FinanciamentoImobiliarioOutput,
} from '../schemas/financiamento-imobiliario.schema';

/**
 * Custom hook para gerenciar estado e ações da simulação de financiamento imobiliário
 *
 * @returns Estado e funções para simular financiamento imobiliário
 */
export function useFinanciamentoImobiliario() {
  const [data, setData] = useState<FinanciamentoImobiliarioOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Executa a simulação de financiamento imobiliário
   */
  const simular = async (input: FinanciamentoImobiliarioInput) => {
    setIsLoading(true);
    setError(null);

    try {
      const resultado = await simularFinanciamentoImobiliario(input);
      setData(resultado);

      toast.success('Simulação calculada com sucesso!', {
        description: `${resultado.length} ofertas encontradas`,
      });
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : 'Erro ao simular financiamento imobiliário';
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
