import { useCallback, useEffect, useState } from 'react';
import {
  DigitalAccountRankingQuery,
  DigitalAccountRankingResponse,
} from '@/lib/schemas/rankings/digital-accounts-ranking.schema';
import {
  fetchDigitalAccountCriteria,
  fetchDigitalAccountsRanking,
} from '@/lib/api/rankings/digital-accounts-ranking.api';
import { RankingCriterion } from '@/lib/schemas/rankings/card-machines-ranking.schema';

interface UseDigitalAccountsRankingReturn {
  data: DigitalAccountRankingResponse | null;
  criteria: RankingCriterion[];
  isLoading: boolean;
  error: string | null;
  refetch: (filters?: DigitalAccountRankingQuery) => Promise<void>;
}

export function useDigitalAccountsRanking(): UseDigitalAccountsRankingReturn {
  const [data, setData] = useState<DigitalAccountRankingResponse | null>(null);
  const [criteria, setCriteria] = useState<RankingCriterion[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refetch = useCallback(
    async (filters?: DigitalAccountRankingQuery) => {
      try {
        setIsLoading(true);
        setError(null);
        const result = await fetchDigitalAccountsRanking(filters);
        setData(result);
      } catch (err) {
        const errorMessage =
          err instanceof Error
            ? err.message
            : 'Erro ao carregar ranking de contas digitais';
        setError(errorMessage);
        console.error('Error fetching digital accounts ranking:', err);
      } finally {
        setIsLoading(false);
      }
    },
    [],
  );

  useEffect(() => {
    const loadCriteria = async () => {
      try {
        const result = await fetchDigitalAccountCriteria();
        setCriteria(result);
      } catch (err) {
        console.error('Error fetching digital account criteria:', err);
      }
    };

    loadCriteria();
  }, []);

  useEffect(() => {
    refetch();
  }, [refetch]);

  return { data, criteria, isLoading, error, refetch };
}
