import { useState } from 'react';
import { toast } from 'sonner';
import { simularContasDigitais } from '../api/contas-digitais';
import type {
  ContasDigitaisFisicaInput,
  ContasDigitaisJuridicaInput,
  ContasDigitaisOutput,
} from '../schemas/contas-digitais.schema';

/**
 * Custom hook para gerenciar estado e ações da simulação de contas digitais
 *
 * @returns Estado e funções para simular contas digitais
 */
export function useContasDigitais() {
  const [data, setData] = useState<ContasDigitaisOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Executa a simulação de contas digitais
   */
  const simular = async (
    input: ContasDigitaisFisicaInput | ContasDigitaisJuridicaInput,
  ) => {
    setIsLoading(true);
    setError(null);

    try {
      const resultado = await simularContasDigitais(input);
      setData(resultado);

      if (resultado.length === 0) {
        toast.warning('Nenhuma conta encontrada', {
          description:
            'Não encontramos contas digitais que atendam aos seus requisitos.',
        });
      } else {
        toast.success('Simulação calculada com sucesso!', {
          description: `${resultado.length} ${resultado.length === 1 ? 'conta encontrada' : 'contas encontradas'}`,
        });
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Erro ao simular contas digitais';
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
