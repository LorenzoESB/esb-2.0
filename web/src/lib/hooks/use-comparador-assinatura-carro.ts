import { useState } from 'react';
import { toast } from 'sonner';
import { compararAssinaturaCarro } from '../api/comparador-assinatura-carro';
import type {
  ComparadorAssinaturaCarroInput,
  ComparadorAssinaturaCarroOutput,
} from '../schemas/comparador-assinatura-carro.schema';

/**
 * Custom hook para gerenciar estado e ações da comparação de aquisição de carro
 *
 * @returns Estado e funções para comparar opções de aquisição
 */
export function useComparadorAssinaturaCarro() {
  const [data, setData] = useState<ComparadorAssinaturaCarroOutput | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Executa a comparação de opções de aquisição
   */
  const comparar = async (input: ComparadorAssinaturaCarroInput) => {
    setIsLoading(true);
    setError(null);

    try {
      const resultado = await compararAssinaturaCarro(input);
      setData(resultado);

      toast.success('Comparação calculada com sucesso!', {
        description: `Melhor opção: ${
          resultado.melhorOpcao === 'compraVista'
            ? 'Compra à Vista'
            : resultado.melhorOpcao === 'financiamento'
            ? 'Financiamento'
            : 'Assinatura'
        }`,
      });
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : 'Erro ao comparar opções de aquisição';
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
