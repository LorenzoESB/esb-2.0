import {
  DigitalAccountRankingQuery,
  DigitalAccountRankingQuerySchema,
  DigitalAccountRankingResponse,
  DigitalAccountRankingResponseSchema,
} from '@/lib/schemas/rankings/digital-accounts-ranking.schema';
import { RankingCriterion, RankingCriterionSchema } from '@/lib/schemas/rankings/card-machines-ranking.schema';

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3030';

function buildQueryString(filters?: DigitalAccountRankingQuery): string {
  if (!filters) return '';

  const params = new URLSearchParams();

  if (filters.companies && filters.companies.length > 0) {
    params.append('companies', filters.companies.join(','));
  }
  if (filters.tipo_conta) {
    params.append('tipo_conta', filters.tipo_conta);
  }
  if (filters.max_mensalidade !== undefined) {
    params.append('max_mensalidade', String(filters.max_mensalidade));
  }
  if (filters.exige_cartao_credito !== undefined) {
    params.append('exige_cartao_credito', String(filters.exige_cartao_credito));
  }
  if (filters.exige_investimentos !== undefined) {
    params.append('exige_investimentos', String(filters.exige_investimentos));
  }

  const queryString = params.toString();
  return queryString ? `?${queryString}` : '';
}

export async function fetchDigitalAccountsRanking(
  filters?: DigitalAccountRankingQuery,
): Promise<DigitalAccountRankingResponse> {
  const parsedFilters = filters
    ? DigitalAccountRankingQuerySchema.parse(filters)
    : undefined;

  const queryString = buildQueryString(parsedFilters);
  const url = `${API_BASE_URL}/rankings/contas-digitais${queryString}`;

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({
      message: 'Erro ao buscar ranking de contas digitais',
    }));
    throw new Error(error.message || 'Erro ao buscar ranking de contas digitais');
  }

  const result = await response.json();
  const parsed = DigitalAccountRankingResponseSchema.safeParse(result);

  if (!parsed.success) {
    console.error('Schema validation error:', parsed.error);
    throw new Error('Formato de resposta inválido do servidor');
  }

  return parsed.data;
}

export async function fetchDigitalAccountCriteria(): Promise<RankingCriterion[]> {
  const url = `${API_BASE_URL}/rankings/contas-digitais/criteria`;

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({
      message: 'Erro ao buscar critérios de contas digitais',
    }));
    throw new Error(
      error.message || 'Erro ao buscar critérios de contas digitais',
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
