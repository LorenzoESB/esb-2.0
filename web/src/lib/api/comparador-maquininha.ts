import {
  ComparadorMaquininhaInput,
  ResultadoComparacao,
  ResultadoComparacaoSchema,
  ListaMaquininhas,
  ListaMaquininhasSchema,
} from '../schemas/comparador-maquininha.schema';

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3030';

/**
 * Busca lista de maquininhas disponíveis para comparação
 *
 * @returns Lista de maquininhas com id, nome, empresa e logo
 * @throws Error se a requisição falhar
 */
export async function buscarMaquininhasDisponiveis(): Promise<ListaMaquininhas> {
  const response = await fetch(
    `${API_BASE_URL}/simuladores/comparador-maquininha/maquininhas`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );

  if (!response.ok) {
    const error = await response.json().catch(() => ({
      message: 'Erro ao buscar maquininhas disponíveis',
    }));
    throw new Error(error.message || 'Erro ao buscar maquininhas disponíveis');
  }

  const result = await response.json();

  // Validar resposta com Zod
  const parsed = ListaMaquininhasSchema.safeParse(result);

  if (!parsed.success) {
    console.error('Schema validation error:', parsed.error);
    throw new Error('Formato de resposta inválido do servidor');
  }

  return parsed.data;
}

/**
 * Compara maquininhas de cartão lado a lado
 *
 * @param data - Dados de entrada com IDs das maquininhas
 * @returns Comparação detalhada das maquininhas
 * @throws Error se a requisição falhar
 */
export async function compararMaquininhas(
  data: ComparadorMaquininhaInput,
): Promise<ResultadoComparacao> {
  const response = await fetch(
    `${API_BASE_URL}/simuladores/comparador-maquininha/comparar`,
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
      message: 'Erro ao comparar maquininhas',
    }));
    throw new Error(error.message || 'Erro ao comparar maquininhas');
  }

  const result = await response.json();

  // Validar resposta com Zod
  const parsed = ResultadoComparacaoSchema.safeParse(result);

  if (!parsed.success) {
    console.error('Schema validation error:', parsed.error);
    throw new Error('Formato de resposta inválido do servidor');
  }

  return parsed.data;
}
