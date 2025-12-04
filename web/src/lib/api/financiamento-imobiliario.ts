import {
  FinanciamentoImobiliarioInput,
  FinanciamentoImobiliarioOutput,
  FinanciamentoImobiliarioOutputSchema,
} from '../schemas/financiamento-imobiliario.schema';

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

/**
 * Simula financiamento imobiliário chamando o backend
 *
 * @param data - Dados de entrada da simulação
 * @returns Array com todas as ofertas de financiamento disponíveis
 * @throws Error se a requisição falhar
 */
export async function simularFinanciamentoImobiliario(
  data: FinanciamentoImobiliarioInput,
): Promise<FinanciamentoImobiliarioOutput> {
  const response = await fetch(
    `${API_BASE_URL}/simuladores/financiamento-imovel/simular`,
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
      message: 'Erro ao simular financiamento imobiliário',
    }));
    throw new Error(error.message || 'Erro ao simular financiamento imobiliário');
  }

  const result = await response.json();

  // Validar resposta com Zod
  const parsed = FinanciamentoImobiliarioOutputSchema.safeParse(result);

  if (!parsed.success) {
    console.error('Schema validation error:', parsed.error);
    throw new Error('Formato de resposta inválido do servidor');
  }

  return parsed.data;
}
