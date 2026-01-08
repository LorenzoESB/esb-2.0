'use client';

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Car, AlertCircle, Info, ExternalLink } from 'lucide-react';
import { useCarSubscriptionRanking } from '@/lib/hooks/rankings/use-car-subscription-ranking';
import { useAutoIframeHeight } from '@/lib/hooks/use-auto-iframe-height';
import { AdCard } from '@/components/ads/AdCard';
import { getRandomAds } from '@/lib/ads';

export default function CarSubscriptionRankingPage() {
  const { data, isLoading, error } = useCarSubscriptionRanking();
  const ad = getRandomAds(1)[0];

  useAutoIframeHeight([data]);

  const best = data?.bestOption;

  return (
    <div className="container mx-auto py-8 px-4 max-w-7xl">
      <div className="mb-8 space-y-4">
        <div className="flex items-center gap-3">
          <Car className="h-8 w-8 text-primary" />
          <h1 className="text-3xl md:text-4xl font-bold">
            Ranking de Carros por Assinatura
          </h1>
        </div>
        <p className="text-lg text-muted-foreground">
          Compare serviços de assinatura por custo total, franquia de km, cobertura de seguro e benefícios incluídos.
        </p>
        {ad && (
          <div className="max-w-md">
            <AdCard ad={ad} />
          </div>
        )}
      </div>

      <Alert className="mb-6">
        <AlertTitle className="flex items-center gap-2">
          <Info className="h-4 w-4" />
          Metodologia
        </AlertTitle>
        <AlertDescription>
          Pesos: custo total (2.25), franquia de km (1.5), serviços inclusos (1.25),
          flexibilidade (1.0), reputação/rede (1.0) e cobertura do seguro (1.0).
          Notas seguem a escala 0-5 do ranking legado.
        </AlertDescription>
      </Alert>

      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {isLoading && (
        <div className="space-y-4">
          <Skeleton className="h-[220px] w-full" />
          <Skeleton className="h-[520px] w-full" />
        </div>
      )}

      {!isLoading && data && (
        <div className="space-y-8">
          {best && (
            <Card className="border-primary/50 shadow-sm">
              <CardHeader className="flex flex-row items-start justify-between gap-4">
                <div className="space-y-2">
                  <p className="text-sm uppercase tracking-wide text-primary">
                    Melhor custo-benefício
                  </p>
                  <CardTitle className="text-2xl">{best.name}</CardTitle>
                  <p className="text-muted-foreground">{best.empresa}</p>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">
                      R$ {best.pricing.preco_mensal_min.toFixed(0)} - R${' '}
                      {best.pricing.preco_mensal_max.toFixed(0)}
                    </Badge>
                    <Badge variant="outline">
                      {best.pricing.franquia_km} km/mês
                    </Badge>
                    {best.desconto && (
                      <Badge variant="secondary">{best.desconto}</Badge>
                    )}
                  </div>
                </div>
                <div className="flex flex-col items-end gap-3">
                  {best.logo && best.logo.trim() !== '' && (
                    <img
                      src={best.logo}
                      alt={best.name}
                      className="h-12 w-auto object-contain"
                      onError={(e) => {
                        const t = e.currentTarget;
                        t.src = 'https://via.placeholder.com/80x24?text=Logo';
                      }}
                    />
                  )}
                  <Button
                    size="sm"
                    className="bg-green-600 hover:bg-green-700"
                    asChild
                  >
                    <a
                      href={best.url_contratacao}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Contratar
                      <ExternalLink className="h-4 w-4 ml-2" />
                    </a>
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="grid gap-3 md:grid-cols-2">
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground font-medium">
                    Benefícios inclusos
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {best.beneficios.seguro_incluso && (
                      <Badge variant="outline">Seguro</Badge>
                    )}
                    {best.beneficios.manutencao_inclusa && (
                      <Badge variant="outline">Manutenção</Badge>
                    )}
                    {best.beneficios.ipva_incluso && (
                      <Badge variant="outline">IPVA</Badge>
                    )}
                    {best.beneficios.revisao_inclusa && (
                      <Badge variant="outline">Revisões</Badge>
                    )}
                    {best.beneficios.observacoes?.slice(0, 2).map((obs) => (
                      <Badge key={obs} variant="secondary">
                        {obs}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground font-medium">
                    Score consolidado
                  </p>
                  <div className="text-3xl font-bold">
                    {best.score.toFixed(2)} / 5
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">
                Ranking completo ({data.total} empresas)
              </h2>
              <Badge variant="secondary">
                Atualizado em{' '}
                {new Date(data.lastUpdated).toLocaleDateString('pt-BR')}
              </Badge>
            </div>
            <div className="rounded-lg border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[80px]">Posição</TableHead>
                    <TableHead>Empresa</TableHead>
                    <TableHead className="hidden md:table-cell">
                      Preço mensal
                    </TableHead>
                    <TableHead>Franquia</TableHead>
                    <TableHead className="hidden md:table-cell">
                      Inclusões
                    </TableHead>
                    <TableHead>Score</TableHead>
                    <TableHead className="text-right">Ação</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.items.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>
                        <Badge
                          className={
                            item.rank === 1
                              ? 'bg-yellow-500 text-white'
                              : 'bg-muted text-foreground'
                          }
                        >
                          {item.rank}º
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          {item.logo && item.logo.trim() !== '' && (
                            <img
                              src={item.logo}
                              alt={item.name}
                              className="h-6 w-auto object-contain"
                              onError={(e) => {
                                const t = e.currentTarget;
                                t.src = 'https://via.placeholder.com/60x20?text=Logo';
                              }}
                            />
                          )}
                          <div>
                            <div className="font-medium">{item.name}</div>
                            <p className="text-xs text-muted-foreground">
                              {item.empresa}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        R$ {item.pricing.preco_mensal_min.toFixed(0)} - R${' '}
                        {item.pricing.preco_mensal_max.toFixed(0)}
                      </TableCell>
                      <TableCell>
                        {item.pricing.franquia_km} km/mês
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        <div className="flex flex-wrap gap-1">
                          {item.beneficios.seguro_incluso && (
                            <Badge variant="secondary" className="text-xs">
                              Seguro
                            </Badge>
                          )}
                          {item.beneficios.manutencao_inclusa && (
                            <Badge variant="secondary" className="text-xs">
                              Manutenção
                            </Badge>
                          )}
                          {item.beneficios.ipva_incluso && (
                            <Badge variant="secondary" className="text-xs">
                              IPVA
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="font-semibold">
                        {item.score.toFixed(2)}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          size="sm"
                          variant={item.isBestOption ? 'default' : 'outline'}
                          className={
                            item.isBestOption
                              ? 'bg-green-600 hover:bg-green-700'
                              : ''
                          }
                          asChild
                        >
                          <a
                            href={item.url_contratacao}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Contratar
                            <ExternalLink className="h-4 w-4 ml-2" />
                          </a>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
