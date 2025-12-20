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
import { Ticket, AlertCircle, ShieldCheck, ExternalLink } from 'lucide-react';
import { useTollPassRanking } from '@/lib/hooks/rankings/use-toll-passes-ranking';
import { useAutoIframeHeight } from '@/lib/hooks/use-auto-iframe-height';
import { AdCard } from '@/components/ads/AdCard';
import { getRandomAds } from '@/lib/ads';

export default function TollPassRankingPage() {
  const { data, isLoading, error } = useTollPassRanking();
  const ad = getRandomAds(1)[0];

  useAutoIframeHeight([data]);

  const best = data?.bestOption;

  return (
    <div className="container mx-auto py-8 px-4 max-w-7xl">
      <div className="mb-8 space-y-4">
        <div className="flex items-center gap-3">
          <Ticket className="h-8 w-8 text-primary" />
          <h1 className="text-3xl md:text-4xl font-bold">
            Ranking de Pedágio Expresso
          </h1>
        </div>
        <p className="text-lg text-muted-foreground">
          Compare as principais tags de pedágio por custo, cobertura e benefícios em estacionamentos e rodovias.
        </p>
        {ad && (
          <div className="max-w-md">
            <AdCard ad={ad} />
          </div>
        )}
      </div>

      <Alert className="mb-6">
        <AlertTitle className="flex items-center gap-2">
          <ShieldCheck className="h-4 w-4" />
          Metodologia resumida
        </AlertTitle>
        <AlertDescription>
          Pesos: custo mensal (2.0), cobertura (1.5), benefícios (1.0), facilidade (1.0) e transparência (0.5). Notas herdadas do ranking legado e revisadas em 12/2024.
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
          <Skeleton className="h-[200px] w-full" />
          <Skeleton className="h-[480px] w-full" />
        </div>
      )}

      {!isLoading && data && (
        <div className="space-y-8">
          {best && (
            <Card className="border-primary/50 shadow-sm">
              <CardHeader className="flex flex-row items-start justify-between gap-4">
                <div className="space-y-2">
                  <p className="text-sm uppercase tracking-wide text-primary">
                    Melhor opção
                  </p>
                  <CardTitle className="text-2xl">{best.name}</CardTitle>
                  <p className="text-muted-foreground">{best.empresa}</p>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">
                      Mensalidade:{' '}
                      {best.pricing.mensalidade === 0
                        ? 'Isento'
                        : `R$ ${best.pricing.mensalidade.toFixed(2)}`}
                    </Badge>
                    <Badge variant="secondary">
                      Adesão:{' '}
                      {best.pricing.adesao === 0
                        ? 'Grátis'
                        : `R$ ${best.pricing.adesao.toFixed(2)}`}
                    </Badge>
                    <Badge variant="outline">
                      Cobertura: {best.cobertura_rodovias}+ praças
                    </Badge>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-3">
                  <img
                    src={best.logo}
                    alt={best.name}
                    className="h-10 w-auto object-contain"
                  />
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
                <div>
                  <p className="text-sm text-muted-foreground font-medium mb-2">
                    Benefícios
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {best.beneficios.estacionamento && (
                      <Badge variant="outline">Estacionamentos</Badge>
                    )}
                    {best.beneficios.cashback && (
                      <Badge variant="outline">Cashback</Badge>
                    )}
                    {best.beneficios.parceiros.map((p) => (
                      <Badge key={p} variant="secondary">
                        {p}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground font-medium mb-2">
                    Score
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
                Ranking completo ({data.total} opções)
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
                      Cobertura
                    </TableHead>
                    <TableHead>Mensalidade</TableHead>
                    <TableHead className="hidden md:table-cell">
                      Benefícios
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
                          <img
                            src={item.logo}
                            alt={item.name}
                            className="h-6 w-auto object-contain"
                          />
                          <div>
                            <div className="font-medium">{item.name}</div>
                            <p className="text-xs text-muted-foreground">
                              {item.empresa}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {item.cobertura_rodovias}+ praças
                      </TableCell>
                      <TableCell>
                        {item.pricing.mensalidade === 0
                          ? 'Isento'
                          : `R$ ${item.pricing.mensalidade.toFixed(2)}`}
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        <div className="flex flex-wrap gap-1">
                          {item.beneficios.estacionamento && (
                            <Badge variant="secondary" className="text-xs">
                              Estacionamento
                            </Badge>
                          )}
                          {item.beneficios.parceiros.slice(0, 2).map((p) => (
                            <Badge key={p} variant="secondary" className="text-xs">
                              {p}
                            </Badge>
                          ))}
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
