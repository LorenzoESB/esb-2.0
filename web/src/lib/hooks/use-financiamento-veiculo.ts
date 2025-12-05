import { useState } from 'react';
import { toast } from 'sonner';
import { simularFinanciamentoVeiculo } from '../api/financiamento-veiculo';
import type {
  FinanciamentoVeiculoInput,
  FinanciamentoVeiculoOutput,
} from '../schemas/financiamento-veiculo.schema';

/**
 * Custom hook para gerenciar estado e ações da simulação de financiamento de veículos
 *
 * @returns Estado e funções para simular financiamento de veículos
 */
export function useFinanciamentoVeiculo() {
  const [data, setData] = useState<FinanciamentoVeiculoOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Executa a simulação de financiamento de veículos
   */
  const simular = async (input: FinanciamentoVeiculoInput) => {
    setIsLoading(true);
    setError(null);

    try {
      const resultado = await simularFinanciamentoVeiculo(input);
      setData(resultado);

      toast.success('Simulação calculada com sucesso!', {
        description: `${resultado.length} ofertas encontradas`,
      });
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : 'Erro ao simular financiamento de veículo';
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
