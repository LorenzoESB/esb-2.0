import {
  ContasDigitaisFisicaInput,
  ContasDigitaisJuridicaInput,
  ContasDigitaisOutput,
  ContasDigitaisOutputSchema,
  TipoPessoa,
} from '../schemas/contas-digitais.schema';

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

/**
 * Simula comparação de contas digitais para Pessoa Física
 *
 * @param data - Dados de entrada da simulação (Pessoa Física)
 * @returns Lista de contas digitais ordenadas por menor custo
 * @throws Error se a requisição falhar
 */
export async function simularContasDigitaisFisica(
  data: ContasDigitaisFisicaInput,
): Promise<ContasDigitaisOutput> {
  const response = await fetch(
    `${API_BASE_URL}/simuladores/contas-digitais/pessoa-fisica`,
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
      message: 'Erro ao simular contas digitais',
    }));
    throw new Error(error.message || 'Erro ao simular contas digitais');
  }

  const result = await response.json();

  // Validar resposta com Zod
  const parsed = ContasDigitaisOutputSchema.safeParse(result);

  if (!parsed.success) {
    console.error('Schema validation error:', parsed.error);
    throw new Error('Formato de resposta inválido do servidor');
  }

  return parsed.data;
}

/**
 * Simula comparação de contas digitais para Pessoa Jurídica
 *
 * @param data - Dados de entrada da simulação (Pessoa Jurídica)
 * @returns Lista de contas digitais PJ ordenadas por menor custo
 * @throws Error se a requisição falhar
 */
export async function simularContasDigitaisJuridica(
  data: ContasDigitaisJuridicaInput,
): Promise<ContasDigitaisOutput> {
  const response = await fetch(
    `${API_BASE_URL}/simuladores/contas-digitais/pessoa-juridica`,
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
      message: 'Erro ao simular contas digitais',
    }));
    throw new Error(error.message || 'Erro ao simular contas digitais');
  }

  const result = await response.json();

  // Validar resposta com Zod
  const parsed = ContasDigitaisOutputSchema.safeParse(result);

  if (!parsed.success) {
    console.error('Schema validation error:', parsed.error);
    throw new Error('Formato de resposta inválido do servidor');
  }

  return parsed.data;
}

/**
 * Função unificada para simular contas digitais
 * Decide automaticamente qual endpoint chamar com base no tipo de pessoa
 *
 * @param data - Dados de entrada da simulação (PF ou PJ)
 * @returns Lista de contas digitais ordenadas por menor custo
 */
export async function simularContasDigitais(
  data: ContasDigitaisFisicaInput | ContasDigitaisJuridicaInput,
): Promise<ContasDigitaisOutput> {
  if (data.tipoPessoa === TipoPessoa.FISICA) {
    return simularContasDigitaisFisica(data as ContasDigitaisFisicaInput);
  } else {
    return simularContasDigitaisJuridica(data as ContasDigitaisJuridicaInput);
  }
}
