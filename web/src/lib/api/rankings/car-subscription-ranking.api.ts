import {
  CarSubscriptionRankingQuery,
  CarSubscriptionRankingQuerySchema,
  CarSubscriptionRankingResponse,
  CarSubscriptionRankingResponseSchema,
} from '@/lib/schemas/rankings/car-subscription-ranking.schema';
import { RankingCriterion, RankingCriterionSchema } from '@/lib/schemas/rankings/card-machines-ranking.schema';

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3030';

function buildQueryString(filters?: CarSubscriptionRankingQuery): string {
  if (!filters) return '';

  const params = new URLSearchParams();

  if (filters.companies && filters.companies.length > 0) {
    params.append('companies', filters.companies.join(','));
  }
  if (filters.max_preco_mensal !== undefined) {
    params.append('max_preco_mensal', String(filters.max_preco_mensal));
  }
  if (filters.exige_seguro_incluso !== undefined) {
    params.append('exige_seguro_incluso', String(filters.exige_seguro_incluso));
  }

  const queryString = params.toString();
  return queryString ? `?${queryString}` : '';
}

export async function fetchCarSubscriptionRanking(
  filters?: CarSubscriptionRankingQuery,
): Promise<CarSubscriptionRankingResponse> {
  const parsedFilters = filters
    ? CarSubscriptionRankingQuerySchema.parse(filters)
    : undefined;

  const queryString = buildQueryString(parsedFilters);
  const url = `${API_BASE_URL}/rankings/assinatura-carro${queryString}`;

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({
      message: 'Erro ao buscar ranking de carros por assinatura',
    }));
    throw new Error(
      error.message || 'Erro ao buscar ranking de carros por assinatura',
    );
  }

  const result = await response.json();
  const parsed = CarSubscriptionRankingResponseSchema.safeParse(result);

  if (!parsed.success) {
    console.error('Schema validation error:', parsed.error);
    throw new Error('Formato de resposta inválido do servidor');
  }

  return parsed.data;
}

export async function fetchCarSubscriptionCriteria(): Promise<
  RankingCriterion[]
> {
  const url = `${API_BASE_URL}/rankings/assinatura-carro/criteria`;

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({
      message: 'Erro ao buscar critérios de carro por assinatura',
    }));
    throw new Error(
      error.message || 'Erro ao buscar critérios de carro por assinatura',
    );
  }

  const result = await response.json();
  const parsed = RankingCriterionSchema.array().safeParse(result);

  if (!parsed.success) {
    console.error('Schema validation error:', parsed.error);
    throw new Error('Formato de resposta inválido do servidor');
  }

  return parsed.data;
}
