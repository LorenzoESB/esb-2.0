import {
  ComparadorAssinaturaCarroInput,
  ComparadorAssinaturaCarroOutput,
  ComparadorAssinaturaCarroOutputSchema,
} from '../schemas/comparador-assinatura-carro.schema';

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

/**
 * Compara opções de aquisição de carro (compra, financiamento, assinatura)
 *
 * @param data - Dados de entrada da comparação
 * @returns Resultado da comparação com todas as opções
 * @throws Error se a requisição falhar
 */
export async function compararAssinaturaCarro(
  data: ComparadorAssinaturaCarroInput,
): Promise<ComparadorAssinaturaCarroOutput> {
  const response = await fetch(
    `${API_BASE_URL}/simuladores/comparador-assinatura-carro/simular`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    },
  );

  if (!response.ok) {
    const error = await response.json().catch(() => ({
      message: 'Erro ao comparar opções de aquisição',
    }));
    throw new Error(error.message || 'Erro ao comparar opções de aquisição');
  }

  const result = await response.json();

  // Validar resposta com Zod
  const parsed = ComparadorAssinaturaCarroOutputSchema.safeParse(result);

  if (!parsed.success) {
    console.error('Schema validation error:', parsed.error);
    throw new Error('Formato de resposta inválido do servidor');
  }

  return parsed.data;
}
