import { useState, useEffect, useCallback } from 'react';
import {
  CardMachineRankingResponse,
  CardMachineRankingQuery,
  RankingCriterion,
} from '@/lib/schemas/rankings/card-machines-ranking.schema';
import {
  fetchCardMachinesRanking,
  fetchRankingCriteria,
} from '@/lib/api/rankings/card-machines-ranking.api';

interface UseCardMachinesRankingReturn {
  data: CardMachineRankingResponse | null;
  criteria: RankingCriterion[];
  isLoading: boolean;
  error: string | null;
  refetch: (filters?: CardMachineRankingQuery) => Promise<void>;
}

/**
 * Custom hook for card machines ranking
 *
 * Fetches ranking data on mount and provides refetch functionality
 * for applying filters
 *
 * @returns Ranking data, loading state, error state, and refetch function
 */
export function useCardMachinesRanking(): UseCardMachinesRankingReturn {
  const [data, setData] = useState<CardMachineRankingResponse | null>(null);
  const [criteria, setCriteria] = useState<RankingCriterion[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  /**
   * Fetch ranking with optional filters
   */
  const refetch = useCallback(
    async (filters?: CardMachineRankingQuery) => {
      try {
        setIsLoading(true);
        setError(null);

        const result = await fetchCardMachinesRanking(filters);
        setData(result);
      } catch (err) {
        const errorMessage =
          err instanceof Error
            ? err.message
            : 'Erro ao carregar ranking de maquininhas';
        setError(errorMessage);
        console.error('Error fetching card machines ranking:', err);
      } finally {
        setIsLoading(false);
      }
    },
    [],
  );

  /**
   * Fetch criteria on mount
   */
  useEffect(() => {
    const loadCriteria = async () => {
      try {
        const result = await fetchRankingCriteria();
        setCriteria(result);
      } catch (err) {
        console.error('Error fetching ranking criteria:', err);
      }
    };

    loadCriteria();
  }, []);

  /**
   * Fetch initial ranking on mount
   */
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
