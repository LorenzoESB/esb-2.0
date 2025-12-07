import {
  CardMachineRankingResponse,
  CardMachineRankingResponseSchema,
  CardMachineRankingQuery,
  RankingCriterion,
  RankingCriterionSchema,
} from '@/lib/schemas/rankings/card-machines-ranking.schema';

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3030';

/**
 * Build query string from filter object
 */
function buildQueryString(filters?: CardMachineRankingQuery): string {
  if (!filters) return '';

  const params = new URLSearchParams();

  if (filters.nfc !== undefined) {
    params.append('nfc', String(filters.nfc));
  }
  if (filters.imprime_recibo !== undefined) {
    params.append('imprime_recibo', String(filters.imprime_recibo));
  }
  if (filters.precisa_smartphone !== undefined) {
    params.append('precisa_smartphone', String(filters.precisa_smartphone));
  }
  if (filters.permite_antecipacao !== undefined) {
    params.append('permite_antecipacao', String(filters.permite_antecipacao));
  }
  if (filters.vale_refeicao !== undefined) {
    params.append('vale_refeicao', String(filters.vale_refeicao));
  }
  if (filters.ecommerce !== undefined) {
    params.append('ecommerce', String(filters.ecommerce));
  }
  if (filters.companies && filters.companies.length > 0) {
    params.append('companies', filters.companies.join(','));
  }
  if (filters.sem_mensalidade !== undefined) {
    params.append('sem_mensalidade', String(filters.sem_mensalidade));
  }

  const queryString = params.toString();
  return queryString ? `?${queryString}` : '';
}

/**
 * Fetch card machine ranking with optional filters
 *
 * @param filters - Optional filters (NFC, printer, companies, etc.)
 * @returns Ranked list of card machines
 * @throws Error if the request fails or response is invalid
 */
export async function fetchCardMachinesRanking(
  filters?: CardMachineRankingQuery,
): Promise<CardMachineRankingResponse> {
  const queryString = buildQueryString(filters);
  const url = `${API_BASE_URL}/rankings/card-machines${queryString}`;

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({
      message: 'Erro ao buscar ranking de maquininhas',
    }));
    throw new Error(error.message || 'Erro ao buscar ranking de maquininhas');
  }

  const result = await response.json();

  // Validate response with Zod
  const parsed = CardMachineRankingResponseSchema.safeParse(result);

  if (!parsed.success) {
    console.error('Schema validation error:', parsed.error);
    throw new Error('Formato de resposta inválido do servidor');
  }

  return parsed.data;
}

/**
 * Fetch ranking criteria details
 *
 * @returns Array of criteria with weights and descriptions
 * @throws Error if the request fails or response is invalid
 */
export async function fetchRankingCriteria(): Promise<RankingCriterion[]> {
  const url = `${API_BASE_URL}/rankings/card-machines/criteria`;

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({
      message: 'Erro ao buscar critérios de ranking',
    }));
    throw new Error(error.message || 'Erro ao buscar critérios de ranking');
  }

  const result = await response.json();

  // Validate response with Zod
  const parsed = RankingCriterionSchema.array().safeParse(result);

  if (!parsed.success) {
    console.error('Schema validation error:', parsed.error);
    throw new Error('Formato de resposta inválido do servidor');
  }

  return parsed.data;
}
