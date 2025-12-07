import {
  InsuranceRankingResponse,
  InsuranceRankingResponseSchema,
  InsuranceRankingQuery,
  InsuranceRankingQuerySchema,
  InsuranceRankingItem,
} from '@/lib/schemas/rankings/insurance-ranking.schema';
import {
  RankingCriterion,
  RankingCriterionSchema,
} from '@/lib/schemas/rankings/card-machines-ranking.schema';

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3030';

function buildQueryString(filters?: InsuranceRankingQuery): string {
  if (!filters) return '';

  const params = new URLSearchParams();

  if (filters.companies && filters.companies.length > 0) {
    params.append('companies', filters.companies.join(','));
  }
  if (filters.cobertura_total !== undefined) {
    params.append('cobertura_total', String(filters.cobertura_total));
  }
  if (filters.assistencia_24h !== undefined) {
    params.append('assistencia_24h', String(filters.assistencia_24h));
  }
  if (filters.carro_reserva !== undefined) {
    params.append('carro_reserva', String(filters.carro_reserva));
  }
  if (filters.max_preco_mensal !== undefined) {
    params.append('max_preco_mensal', String(filters.max_preco_mensal));
  }

  const queryString = params.toString();
  return queryString ? `?${queryString}` : '';
}

export async function fetchInsuranceRanking(
  filters?: InsuranceRankingQuery,
): Promise<InsuranceRankingResponse> {
  const parsedFilters = filters
    ? InsuranceRankingQuerySchema.parse(filters)
    : undefined;

  const queryString = buildQueryString(parsedFilters);
  const url = `${API_BASE_URL}/rankings/insurance${queryString}`;

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({
      message: 'Erro ao buscar ranking de seguros',
    }));
    throw new Error(error.message || 'Erro ao buscar ranking de seguros');
  }

  const result = await response.json();
  const parsed = InsuranceRankingResponseSchema.safeParse(result);

  if (!parsed.success) {
    console.error('Schema validation error:', parsed.error);
    throw new Error('Formato de resposta inválido do servidor');
  }

  return parsed.data;
}

export async function fetchInsuranceRankingCriteria(): Promise<
  RankingCriterion[]
> {
  const url = `${API_BASE_URL}/rankings/insurance/criteria`;

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({
      message: 'Erro ao buscar critérios de seguros',
    }));
    throw new Error(error.message || 'Erro ao buscar critérios de seguros');
  }

  const result = await response.json();
  const parsed = RankingCriterionSchema.array().safeParse(result);

  if (!parsed.success) {
    console.error('Schema validation error:', parsed.error);
    throw new Error('Formato de resposta inválido do servidor');
  }

  return parsed.data;
}

export type InsuranceRankingItemResponse = InsuranceRankingItem;
