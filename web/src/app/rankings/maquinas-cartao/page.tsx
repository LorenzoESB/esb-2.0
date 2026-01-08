'use client';

import { useCardMachinesRanking } from '@/lib/hooks/rankings/use-card-machines-ranking';
import { BestOptionHighlight } from '@/components/rankings/shared/best-option-highlight';
import { RankingTable } from '@/components/rankings/shared/ranking-table';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Skeleton } from '@/components/ui/skeleton';
import { AlertCircle, TrendingUp, Info } from 'lucide-react';
import { useAutoIframeHeight } from '@/lib/hooks/use-auto-iframe-height';
import { AdCard } from '@/components/ads/AdCard';
import { getStableAds } from '@/lib/ads';
import { usePathname } from 'next/navigation';
import { formatPostDateShort } from '@/utils/wordpress-formatter';

/**
 * Card Machines Ranking Page
 *
 * Displays pre-calculated ranking of card machines based on
 * weighted criteria (rates, transparency, features, etc.)
 *
 * Features:
 * - Best option highlighted with green theme
 * - Full ranking table with all machines
 * - Responsive design (mobile + desktop)
 * - Auto iframe height adjustment
 */
export default function CardMachinesRankingPage() {
  const { data, isLoading, error } = useCardMachinesRanking();
  const pathname = usePathname();
  const ad = getStableAds(pathname || '/rankings/maquinas-cartao', 1)[0];

  // Auto adjust iframe height for embedded views
  useAutoIframeHeight([data]);

  return (
    <div className="container mx-auto py-8 px-4 max-w-7xl">
      {/* Header */}
      <div className="mb-8 space-y-4">
        <div className="flex items-center gap-3">
          <TrendingUp className="h-8 w-8 text-primary" />
          <h1 className="text-3xl md:text-4xl font-bold">
            Ranking de Maquininhas de Cartão
          </h1>
        </div>
        <p className="text-lg text-muted-foreground">
          As melhores maquininhas de cartão classificadas por taxas, transparência, funcionalidades e reputação
        </p>
        {ad && (
          <div className="max-w-md">
            <AdCard ad={ad} />
          </div>
        )}
      </div>

      {/* Methodology Info */}
      <Alert className="mb-6">
        <Info className="h-4 w-4" />
        <AlertDescription>
          <strong>Como funciona o ranking:</strong> Cada maquininha é
          avaliada com base em 8 critérios ponderados. Taxas competitivas têm
          peso 3x maior que outros critérios. O ranking considera tanto aspectos
          financeiros quanto funcionais para identificar a melhor opção geral.
        </AlertDescription>
      </Alert>

      {/* Error State */}
      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Loading State */}
      {isLoading && (
        <div className="space-y-6">
          <Skeleton className="h-[400px] w-full" />
          <Skeleton className="h-[600px] w-full" />
        </div>
      )}

      {/* Content */}
      {!isLoading && data && (
        <div className="space-y-8">
          {/* Best Option Section */}
          <div>
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              🏆 Melhor Opção
            </h2>
            <BestOptionHighlight machine={data.bestOption} />
          </div>

          {/* Full Ranking Section */}
          <div>
            <h2 className="text-2xl font-bold mb-4">
              Ranking Completo ({data.total} maquininhas)
            </h2>
            <RankingTable items={data.items} />
          </div>

          {/* Criteria Info */}
          {data.criteria && data.criteria.length > 0 && (
            <div className="bg-muted p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-4">
                Critérios de Avaliação
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {data.criteria.map((criterion) => (
                  <div
                    key={criterion.key}
                    className="bg-background p-4 rounded-md"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">{criterion.name}</span>
                      <span className="text-sm text-muted-foreground">
                        Peso: {criterion.weight.toFixed(1)}x
                      </span>
                    </div>
                    {criterion.description && (
                      <p className="text-sm text-muted-foreground">
                        {criterion.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Last Updated */}
          <div className="text-center text-sm text-muted-foreground">
            Última atualização: {formatPostDateShort(typeof data.lastUpdated === 'string' ? data.lastUpdated : new Date(data.lastUpdated).toISOString())}
          </div>
        </div>
      )}

      {/* Empty State */}
      {!isLoading && !error && data && data.items.length === 0 && (
        <Alert>
          <Info className="h-4 w-4" />
          <AlertDescription>
            Nenhuma maquininha disponível no ranking no momento.
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}
