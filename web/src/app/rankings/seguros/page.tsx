'use client';

import { useInsuranceRanking } from '@/lib/hooks/rankings/use-insurance-ranking';
import { BestInsuranceHighlight } from '@/components/rankings/insurance/best-insurance-highlight';
import { InsuranceRankingTable } from '@/components/rankings/insurance/insurance-ranking-table';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { useAutoIframeHeight } from '@/lib/hooks/use-auto-iframe-height';
import { ShieldCheck, AlertCircle, Info, Sparkles } from 'lucide-react';

export default function InsuranceRankingPage() {
  const { data, isLoading, error } = useInsuranceRanking();

  useAutoIframeHeight([data]);

  const bestOptionCriteria = data?.bestOption?.scoreBreakdown
    ?.slice()
    .sort((a, b) => b.percentage - a.percentage)
    .slice(0, 3);

  return (
    <div className="container mx-auto py-8 px-4 max-w-7xl">
      <div className="mb-8 space-y-4">
        <div className="flex items-center gap-3">
          <ShieldCheck className="h-8 w-8 text-primary" />
          <h1 className="text-3xl md:text-4xl font-bold">
            Ranking de Seguros de Automóvel
          </h1>
        </div>
        <p className="text-lg text-muted-foreground">
          As seguradoras mais completas ranqueadas por preço, cobertura, atendimento e confiança
        </p>
      </div>

      <Alert className="mb-6">
        <Info className="h-4 w-4" />
        <AlertDescription>
          <strong>Como funciona o ranking:</strong> 11 critérios ponderados avaliam cada seguradora.
          Preço competitivo e cobertura completa têm maior peso. O resultado exibe o score final e a contribuição dos principais critérios.
        </AlertDescription>
      </Alert>

      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {isLoading && (
        <div className="space-y-6">
          <Skeleton className="h-[360px] w-full" />
          <Skeleton className="h-[520px] w-full" />
        </div>
      )}

      {!isLoading && data && (
        <div className="space-y-8">
          <div>
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              🏆 Melhor Seguro
            </h2>
            <BestInsuranceHighlight insurance={data.bestOption} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="lg:col-span-2 space-y-4">
              <h2 className="text-2xl font-bold">
                Ranking Completo ({data.total} seguradoras)
              </h2>
              <InsuranceRankingTable items={data.items} />
            </div>

            <div className="space-y-4">
              <div className="bg-muted p-5 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Sparkles className="h-4 w-4 text-primary" />
                  <h3 className="text-lg font-semibold">Critérios Principais</h3>
                </div>
                {bestOptionCriteria && bestOptionCriteria.length > 0 ? (
                  <div className="space-y-2">
                    {bestOptionCriteria.map((criterion) => (
                      <div
                        key={criterion.key}
                        className="bg-background p-3 rounded-md border"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-medium">{criterion.name}</span>
                          <Badge className="text-xs">{criterion.percentage}%</Badge>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Peso {criterion.weight} • Nota {criterion.raw_score}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">
                    Critérios serão exibidos após carregar o ranking.
                  </p>
                )}
              </div>

              {data.criteria && data.criteria.length > 0 && (
                <div className="bg-muted p-5 rounded-lg">
                  <h3 className="text-lg font-semibold mb-3">Metodologia</h3>
                  <div className="space-y-2">
                    {data.criteria.map((criterion) => (
                      <div
                        key={criterion.key}
                        className="bg-background p-3 rounded-md border"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-medium">{criterion.name}</span>
                          <span className="text-sm text-muted-foreground">
                            Peso: {criterion.weight.toFixed(1)}x
                          </span>
                        </div>
                        {criterion.description && (
                          <p className="text-xs text-muted-foreground mt-1">
                            {criterion.description}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="text-center text-sm text-muted-foreground">
            Última atualização:{' '}
            {new Date(data.lastUpdated).toLocaleDateString('pt-BR', {
              day: '2-digit',
              month: 'long',
              year: 'numeric',
            })}
          </div>
        </div>
      )}

      {!isLoading && !error && data && data.items.length === 0 && (
        <Alert>
          <Info className="h-4 w-4" />
          <AlertDescription>
            Nenhuma seguradora disponível no ranking no momento.
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}
