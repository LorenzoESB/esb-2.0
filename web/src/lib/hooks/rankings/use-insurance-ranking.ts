import { useState, useEffect, useCallback } from 'react';
import {
  InsuranceRankingResponse,
  InsuranceRankingQuery,
  InsuranceRankingItem,
} from '@/lib/schemas/rankings/insurance-ranking.schema';
import {
  fetchInsuranceRanking,
  fetchInsuranceRankingCriteria,
} from '@/lib/api/rankings/insurance-ranking.api';
import { RankingCriterion } from '@/lib/schemas/rankings/card-machines-ranking.schema';

interface UseInsuranceRankingReturn {
  data: InsuranceRankingResponse | null;
  criteria: RankingCriterion[];
  isLoading: boolean;
  error: string | null;
  refetch: (filters?: InsuranceRankingQuery) => Promise<void>;
}

/**
 * Custom hook for insurance ranking
 *
 * Fetches ranking data on mount and provides refetch functionality
 */
export function useInsuranceRanking(): UseInsuranceRankingReturn {
  const [data, setData] = useState<InsuranceRankingResponse | null>(null);
  const [criteria, setCriteria] = useState<RankingCriterion[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refetch = useCallback(
    async (filters?: InsuranceRankingQuery) => {
      try {
        setIsLoading(true);
        setError(null);

        const result = await fetchInsuranceRanking(filters);
        setData(result);
      } catch (err) {
        const errorMessage =
          err instanceof Error
            ? err.message
            : 'Erro ao carregar ranking de seguros';
        setError(errorMessage);
        console.error('Error fetching insurance ranking:', err);
      } finally {
        setIsLoading(false);
      }
    },
    [],
  );

  useEffect(() => {
    const loadCriteria = async () => {
      try {
        const result = await fetchInsuranceRankingCriteria();
        setCriteria(result);
      } catch (err) {
        console.error('Error fetching insurance ranking criteria:', err);
      }
    };

    loadCriteria();
  }, []);

  useEffect(() => {
    refetch();
  }, [refetch]);

  return {
    data,
    criteria,
    isLoading,
    error,
    refetch,
  };
}
