import { useState } from 'react';
import { toast } from 'sonner';
import { simularEmprestimo } from '../api/emprestimo';
import type { EmprestimoInput, EmprestimoOutput } from '../schemas/emprestimo.schema';

/**
 * Custom hook para gerenciar estado e ações da simulação de empréstimo
 *
 * @returns Estado e funções para simular empréstimo
 */
export function useEmprestimo() {
  const [data, setData] = useState<EmprestimoOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Executa a simulação de empréstimo
   */
  const simular = async (input: EmprestimoInput) => {
    setIsLoading(true);
    setError(null);

    try {
      const resultado = await simularEmprestimo(input);
      setData(resultado);

      toast.success('Simulação calculada com sucesso!', {
        description: `${resultado.totalOfertas} ofertas encontradas`,
      });
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Erro ao simular empréstimo';
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
