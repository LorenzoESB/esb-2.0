import {
  EmprestimoInput,
  EmprestimoOutput,
  EmprestimoOutputSchema,
} from '../schemas/emprestimo.schema';

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

/**
 * Simula empréstimo pessoal chamando o backend
 *
 * @param data - Dados de entrada da simulação
 * @returns Resultado com todas as ofertas disponíveis
 * @throws Error se a requisição falhar
 */
export async function simularEmprestimo(
  data: EmprestimoInput,
): Promise<EmprestimoOutput> {
  const response = await fetch(`${API_BASE_URL}simuladores/emprestimo/simular`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({
      message: 'Erro ao simular empréstimo',
    }));
    throw new Error(error.message || 'Erro ao simular empréstimo');
  }

  const result = await response.json();

  // Validar resposta com Zod
  const parsed = EmprestimoOutputSchema.safeParse(result);

  if (!parsed.success) {
    console.error('Schema validation error:', parsed.error);
    throw new Error('Formato de resposta inválido do servidor');
  }

  return parsed.data;
}
