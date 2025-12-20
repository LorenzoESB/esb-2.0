import { useCallback, useEffect, useState } from 'react';
import {
  CarSubscriptionRankingQuery,
  CarSubscriptionRankingResponse,
} from '@/lib/schemas/rankings/car-subscription-ranking.schema';
import {
  fetchCarSubscriptionCriteria,
  fetchCarSubscriptionRanking,
} from '@/lib/api/rankings/car-subscription-ranking.api';
import { RankingCriterion } from '@/lib/schemas/rankings/card-machines-ranking.schema';

interface UseCarSubscriptionRankingReturn {
  data: CarSubscriptionRankingResponse | null;
  criteria: RankingCriterion[];
  isLoading: boolean;
  error: string | null;
  refetch: (filters?: CarSubscriptionRankingQuery) => Promise<void>;
}

export function useCarSubscriptionRanking(): UseCarSubscriptionRankingReturn {
  const [data, setData] =
    useState<CarSubscriptionRankingResponse | null>(null);
  const [criteria, setCriteria] = useState<RankingCriterion[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refetch = useCallback(
    async (filters?: CarSubscriptionRankingQuery) => {
      try {
        setIsLoading(true);
        setError(null);
        const result = await fetchCarSubscriptionRanking(filters);
        setData(result);
      } catch (err) {
        const errorMessage =
          err instanceof Error
            ? err.message
            : 'Erro ao carregar ranking de carros por assinatura';
        setError(errorMessage);
        console.error('Error fetching car subscription ranking:', err);
      } finally {
        setIsLoading(false);
      }
    },
    [],
  );

  useEffect(() => {
    const loadCriteria = async () => {
      try {
        const result = await fetchCarSubscriptionCriteria();
        setCriteria(result);
      } catch (err) {
        console.error('Error fetching car subscription criteria:', err);
      }
    };

    loadCriteria();
  }, []);

  useEffect(() => {
    refetch();
  }, [refetch]);

  return { data, criteria, isLoading, error, refetch };
}
