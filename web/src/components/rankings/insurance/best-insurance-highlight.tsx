import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import {
  ShieldCheck,
  Trophy,
  ExternalLink,
  Car,
  PhoneCall,
  Sparkles,
  Calendar,
  Star,
} from 'lucide-react';
import { InsuranceRankingItem } from '@/lib/schemas/rankings/insurance-ranking.schema';
import { Logo } from '../shared/Logo';

interface BestInsuranceHighlightProps {
  insurance: InsuranceRankingItem;
}

export function BestInsuranceHighlight({
  insurance,
}: BestInsuranceHighlightProps) {
  const { coverage, services, pricing } = insurance;

  const priceRange =
    pricing.preco_mensal_estimado_min === pricing.preco_mensal_estimado_max
      ? `R$ ${pricing.preco_mensal_estimado_min.toFixed(0)}/mês`
      : `R$ ${pricing.preco_mensal_estimado_min.toFixed(0)} - R$ ${pricing.preco_mensal_estimado_max.toFixed(0)}/mês`;

  return (
    <Card className="border-accent bg-gradient-to-br from-accent/10 to-accent/5 dark:from-accent/15 dark:to-accent/10 shadow-lg">
      <CardHeader className="relative">
        <div className="absolute top-4 right-4">
          <Trophy className="h-8 w-8 text-primary" />
        </div>
        <Badge className="w-fit bg-primary hover:bg-primary/90">Melhor Opção</Badge>
        <CardTitle className="text-2xl flex items-center gap-3 mt-3">
          <Logo src={insurance.logo} alt={insurance.name} className="h-10 w-auto object-contain" />
          <div>
            <div className="text-xl font-bold">{insurance.name}</div>
            <div className="text-sm text-muted-foreground">{insurance.company}</div>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white dark:bg-gray-900 p-4 rounded-lg border">
            <div className="text-xs text-muted-foreground mb-1">Score Final</div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-primary">
                {insurance.score.toFixed(2)}
              </span>
              <Badge variant="outline" className="bg-accent/10 text-accent-foreground">
                0-10
              </Badge>
            </div>
            <div className="text-xs text-muted-foreground mt-2">
              Ranking recalculado com critérios ponderados
            </div>
          </div>

          <div className="bg-white dark:bg-gray-900 p-4 rounded-lg border">
            <div className="text-xs text-muted-foreground mb-1">Preço Estimado</div>
            <div className="text-lg font-semibold">{priceRange}</div>
            <div className="text-sm text-muted-foreground">
              Franquia: R$ {pricing.franquia_minima.toFixed(0)} - R${' '}
              {pricing.franquia_maxima.toFixed(0)}
            </div>
          </div>

          <div className="bg-white dark:bg-gray-900 p-4 rounded-lg border">
            <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
              <ShieldCheck className="h-4 w-4" />
              Aprovação de Sinistros
            </div>
            <div className="flex items-center gap-3">
              <Progress value={insurance.sinistros_aprovados_percentual} />
              <span className="text-sm font-semibold">
                {insurance.sinistros_aprovados_percentual}%
              </span>
            </div>
            <div className="text-sm text-muted-foreground mt-1">
              Clientes: {insurance.avaliacao_clientes.toFixed(1)}{' '}
              <Star className="inline h-4 w-4 text-yellow-500" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="bg-white dark:bg-gray-900 p-4 rounded-lg border space-y-2">
            <div className="flex items-center gap-2 text-sm font-semibold">
              <Sparkles className="h-4 w-4 text-primary" />
              Coberturas Principais
            </div>
            <div className="flex flex-wrap gap-2">
              {coverage.cobertura_total && <Badge variant="secondary">Cobertura Total</Badge>}
              {coverage.cobertura_terceiros && (
                <Badge variant="secondary">Terceiros</Badge>
              )}
              {coverage.roubo_furto && <Badge variant="secondary">Roubo/Furto</Badge>}
              {coverage.vidros && <Badge variant="secondary">Vidros</Badge>}
              {coverage.colisao && <Badge variant="secondary">Colisão</Badge>}
              {coverage.fenomenos_naturais && (
                <Badge variant="secondary">Fenômenos Naturais</Badge>
              )}
            </div>
          </div>

          <div className="bg-white dark:bg-gray-900 p-4 rounded-lg border space-y-2">
            <div className="flex items-center gap-2 text-sm font-semibold">
              <Car className="h-4 w-4 text-primary" />
              Serviços e Assistência
            </div>
            <div className="flex flex-wrap gap-2">
              {coverage.assistencia_24h && (
                <Badge variant="secondary">Assistência 24h</Badge>
              )}
              {coverage.carro_reserva && <Badge variant="secondary">Carro Reserva</Badge>}
              {services.app_mobile && <Badge variant="secondary">App Mobile</Badge>}
              {services.atendimento_online && (
                <Badge variant="secondary">Atendimento Online</Badge>
              )}
              {services.guincho_km === null ? (
                <Badge variant="secondary">Guincho ilimitado</Badge>
              ) : (
                <Badge variant="secondary">Guincho {services.guincho_km}km</Badge>
              )}
            </div>
          </div>
        </div>

        {insurance.observacoes && (
          <div className="text-sm text-muted-foreground italic border-l-4 border-accent pl-3">
            {insurance.observacoes}
          </div>
        )}

        <div className="flex flex-col md:flex-row gap-3">
          <Button className="w-full md:w-auto bg-green-600 hover:bg-green-700" asChild>
            <a
              href={insurance.url_contratacao}
              target="_blank"
              rel="noopener noreferrer"
            >
              Contratar agora
              <ExternalLink className="ml-2 h-4 w-4" />
            </a>
          </Button>

          {insurance.url_avaliacao && (
            <Button variant="outline" className="w-full md:w-auto" asChild>
              <a
                href={insurance.url_avaliacao}
                target="_blank"
                rel="noopener noreferrer"
              >
                Ver análise completa
                <ExternalLink className="ml-2 h-4 w-4" />
              </a>
            </Button>
          )}
        </div>

        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Calendar className="h-3 w-3" />
          Atualizado em {insurance.data_atualizacao}
          <span className="mx-1">•</span>
          <PhoneCall className="h-3 w-3" />
          Rede de oficinas: {services.oficinas_referenciadas ?? 'N/D'}
        </div>
      </CardContent>
    </Card>
  );
}
