import {
  TollPassRankingQuery,
  TollPassRankingQuerySchema,
  TollPassRankingResponse,
  TollPassRankingResponseSchema,
} from '@/lib/schemas/rankings/toll-passes-ranking.schema';
import { RankingCriterion, RankingCriterionSchema } from '@/lib/schemas/rankings/card-machines-ranking.schema';

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3030';

function buildQueryString(filters?: TollPassRankingQuery): string {
  if (!filters) return '';

  const params = new URLSearchParams();

  if (filters.companies && filters.companies.length > 0) {
    params.append('companies', filters.companies.join(','));
  }
  if (filters.max_mensalidade !== undefined) {
    params.append('max_mensalidade', String(filters.max_mensalidade));
  }
  if (filters.exige_estacionamento !== undefined) {
    params.append('exige_estacionamento', String(filters.exige_estacionamento));
  }

  const queryString = params.toString();
  return queryString ? `?${queryString}` : '';
}

export async function fetchTollPassRanking(
  filters?: TollPassRankingQuery,
): Promise<TollPassRankingResponse> {
  const parsedFilters = filters
    ? TollPassRankingQuerySchema.parse(filters)
    : undefined;

  const queryString = buildQueryString(parsedFilters);
  const url = `${API_BASE_URL}/rankings/pedagios${queryString}`;

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({
      message: 'Erro ao buscar ranking de pedágio expresso',
    }));
    throw new Error(error.message || 'Erro ao buscar ranking de pedágio expresso');
  }

  const result = await response.json();
  const parsed = TollPassRankingResponseSchema.safeParse(result);

  if (!parsed.success) {
    console.error('Schema validation error:', parsed.error);
    throw new Error('Formato de resposta inválido do servidor');
  }

  return parsed.data;
}

export async function fetchTollPassCriteria(): Promise<RankingCriterion[]> {
  const url = `${API_BASE_URL}/rankings/pedagios/criteria`;

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({
      message: 'Erro ao buscar critérios de pedágio',
    }));
    throw new Error(error.message || 'Erro ao buscar critérios de pedágio');
  }

  const result = await response.json();
  const parsed = RankingCriterionSchema.array().safeParse(result);

  if (!parsed.success) {
    console.error('Schema validation error:', parsed.error);
    throw new Error('Formato de resposta inválido do servidor');
  }

  return parsed.data;
}
