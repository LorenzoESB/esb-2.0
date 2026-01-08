'use client';

import { useMemo } from 'react';
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
import { Building2, AlertCircle, Wallet, TrendingUp, CheckCircle2, ExternalLink } from 'lucide-react';
import { Logo } from '@/components/rankings/shared/Logo';
import { useDigitalAccountsRanking } from '@/lib/hooks/rankings/use-digital-accounts-ranking';
import { useAutoIframeHeight } from '@/lib/hooks/use-auto-iframe-height';
import { AdCard } from '@/components/ads/AdCard';
import { getStableAds } from '@/lib/ads';
import { usePathname } from 'next/navigation';
import { formatPostDateShort } from '@/utils/wordpress-formatter';

export default function DigitalAccountsRankingPage() {
  const { data, isLoading, error } = useDigitalAccountsRanking();
  const pathname = usePathname();
  const ad = getStableAds(pathname || '/rankings/contas-digitais', 1)[0];

  useAutoIframeHeight([data]);

  const best = data?.bestOption;

  const criteria = useMemo(() => data?.criteria ?? [], [data]);

  return (
    <div className="container mx-auto py-8 px-4 max-w-7xl">
      <div className="mb-8 space-y-4">
        <div className="flex items-center gap-3">
          <Building2 className="h-8 w-8 text-primary" />
          <h1 className="text-3xl md:text-4xl font-bold">
            Ranking de Contas Digitais
          </h1>
        </div>
        <p className="text-lg text-muted-foreground">
          Avaliamos bancos e fintechs por tarifas, experiência digital, serviços essenciais e suporte. Dados alinhados ao ranking legado e revisados para o novo portal.
        </p>
        {ad && (
          <div className="max-w-md">
            <AdCard ad={ad} />
          </div>
        )}
      </div>

      <Alert className="mb-6">
        <AlertTitle className="flex items-center gap-2">
          <TrendingUp className="h-4 w-4" />
          Metodologia
        </AlertTitle>
        <AlertDescription>
          Pesos principais: tarifas (2.5), experiência digital (1.5), serviços essenciais (1.25), cartão de crédito (1.0), investimentos (0.75) e suporte/reputação (1.0). Notas seguem a escala 0-5 do ranking legado.
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
                  <div className="flex items-center gap-2">
                    <Wallet className="h-5 w-5 text-primary" />
                    <p className="text-sm uppercase tracking-wide text-primary">
                      Melhor opção
                    </p>
                  </div>
                  <CardTitle className="text-2xl">{best.name}</CardTitle>
                  <p className="text-muted-foreground">{best.bank}</p>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline" className="text-sm">
                      {best.account_type === 'pf'
                        ? 'Pessoa Física'
                        : best.account_type === 'pj'
                        ? 'Pessoa Jurídica'
                        : 'PF e PJ'}
                    </Badge>
                    <Badge variant="secondary" className="text-sm">
                      Mensalidade:{' '}
                      {best.monthly_fee === 0
                        ? 'R$ 0,00'
                        : `R$ ${best.monthly_fee.toFixed(2)}`}
                    </Badge>
                    <Badge variant="secondary" className="text-sm">
                      Score {best.score.toFixed(2)} / 5
                    </Badge>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-3">
                  <Logo src={best.logo} alt={best.name} className="h-12 w-auto object-contain" />
                  <Button
                    size="sm"
                    className="bg-green-600 hover:bg-green-700"
                    asChild
                  >
                    <a
                      href={best.url_ranking}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {best.call_to_action}
                      <ExternalLink className="h-4 w-4 ml-2" />
                    </a>
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="grid gap-3 md:grid-cols-2">
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground font-medium">
                    Destaques
                  </p>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    {best.highlights.map((highlight) => (
                      <li key={highlight} className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-600" />
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground font-medium">
                    Funcionalidades
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {best.features.credit_card && (
                      <Badge variant="outline">Crédito</Badge>
                    )}
                    {best.features.debit_card && (
                      <Badge variant="outline">Débito</Badge>
                    )}
                    {best.features.investments && (
                      <Badge variant="outline">Investimentos</Badge>
                    )}
                    {best.features.boletos && (
                      <Badge variant="outline">Boletos</Badge>
                    )}
                    {best.features.saques_ilimitados && (
                      <Badge variant="outline">Saques</Badge>
                    )}
                    {best.features.atendimento_humanizado && (
                      <Badge variant="outline">Atendimento humano</Badge>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">
                Ranking completo ({data.total} contas)
              </h2>
              <Badge variant="secondary">
                Última atualização: {formatPostDateShort(typeof data.lastUpdated === 'string' ? data.lastUpdated : new Date(data.lastUpdated).toISOString())}
              </Badge>
            </div>
            <div className="rounded-lg border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[80px]">Posição</TableHead>
                    <TableHead>Conta</TableHead>
                    <TableHead className="hidden md:table-cell">
                      Público
                    </TableHead>
                    <TableHead className="hidden lg:table-cell">
                      Funcionalidades
                    </TableHead>
                    <TableHead>Mensalidade</TableHead>
                    <TableHead>Score</TableHead>
                    <TableHead className="text-right">Ação</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.items.map((item) => (
                    <TableRow
                      key={item.id}
                      className={
                        item.isBestOption
                          ? 'bg-green-50 dark:bg-green-950'
                          : ''
                      }
                    >
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
                          <Logo src={item.logo} alt={item.name} className="h-6 w-auto object-contain" />
                          <div>
                            <div className="font-medium">{item.name}</div>
                            <div className="text-xs text-muted-foreground">
                              {item.bank}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {item.account_type === 'pf'
                          ? 'Pessoa Física'
                          : item.account_type === 'pj'
                          ? 'Pessoa Jurídica'
                          : 'PF e PJ'}
                      </TableCell>
                      <TableCell className="hidden lg:table-cell">
                        <div className="flex flex-wrap gap-1">
                          {item.features.credit_card && (
                            <Badge variant="secondary" className="text-xs">
                              Crédito
                            </Badge>
                          )}
                          {item.features.investments && (
                            <Badge variant="secondary" className="text-xs">
                              Investimentos
                            </Badge>
                          )}
                          {item.features.boletos && (
                            <Badge variant="secondary" className="text-xs">
                              Boletos
                            </Badge>
                          )}
                          {item.features.saques_ilimitados && (
                            <Badge variant="secondary" className="text-xs">
                              Saques
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        {item.monthly_fee === 0
                          ? 'R$ 0,00'
                          : `R$ ${item.monthly_fee.toFixed(2)}`}
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
                            href={item.url_ranking}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {item.call_to_action}
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

          {criteria.length > 0 && (
            <div className="bg-muted p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-3">
                Critérios de avaliação
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {criteria.map((criterion) => (
                  <Card key={criterion.key}>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">
                        {criterion.name}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-1 text-sm text-muted-foreground">
                      <p>Peso: {criterion.weight.toFixed(2)}</p>
                      {criterion.description && <p>{criterion.description}</p>}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
