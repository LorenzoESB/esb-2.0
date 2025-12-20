import { useCallback, useEffect, useState } from 'react';
import {
  TollPassRankingQuery,
  TollPassRankingResponse,
} from '@/lib/schemas/rankings/toll-passes-ranking.schema';
import {
  fetchTollPassCriteria,
  fetchTollPassRanking,
} from '@/lib/api/rankings/toll-passes-ranking.api';
import { RankingCriterion } from '@/lib/schemas/rankings/card-machines-ranking.schema';

interface UseTollPassRankingReturn {
  data: TollPassRankingResponse | null;
  criteria: RankingCriterion[];
  isLoading: boolean;
  error: string | null;
  refetch: (filters?: TollPassRankingQuery) => Promise<void>;
}

export function useTollPassRanking(): UseTollPassRankingReturn {
  const [data, setData] = useState<TollPassRankingResponse | null>(null);
  const [criteria, setCriteria] = useState<RankingCriterion[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refetch = useCallback(
    async (filters?: TollPassRankingQuery) => {
      try {
        setIsLoading(true);
        setError(null);
        const result = await fetchTollPassRanking(filters);
        setData(result);
      } catch (err) {
        const errorMessage =
          err instanceof Error
            ? err.message
            : 'Erro ao carregar ranking de pedágio expresso';
        setError(errorMessage);
        console.error('Error fetching toll pass ranking:', err);
      } finally {
        setIsLoading(false);
      }
    },
    [],
  );

  useEffect(() => {
    const loadCriteria = async () => {
      try {
        const result = await fetchTollPassCriteria();
        setCriteria(result);
      } catch (err) {
        console.error('Error fetching toll pass criteria:', err);
      }
    };

    loadCriteria();
  }, []);

  useEffect(() => {
    refetch();
  }, [refetch]);

  return { data, criteria, isLoading, error, refetch };
}
