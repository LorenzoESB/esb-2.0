import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Trophy, ExternalLink, Tag, Calendar } from 'lucide-react';
import { CardMachineRankingItem } from '@/lib/schemas/rankings/card-machines-ranking.schema';
import { Logo } from './Logo';

interface BestOptionHighlightProps {
  machine: CardMachineRankingItem;
}

/**
 * Highlight component for the best option in ranking
 *
 * Displays the top-ranked machine with green theme,
 * trophy icon, and prominent call-to-action
 */
export function BestOptionHighlight({ machine }: BestOptionHighlightProps) {
  const hasPromo =
    machine.pricing.preco_promocional !== null &&
    machine.pricing.preco_promocional < machine.pricing.preco;

  return (
    <Card className="border-green-500 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950 shadow-lg">
      <CardHeader className="relative">
        <div className="absolute top-4 right-4">
          <Trophy className="h-8 w-8 text-yellow-500" />
        </div>
        <Badge className="w-fit bg-green-600 hover:bg-green-700">
          Melhor Opção
        </Badge>
        <CardTitle className="text-2xl flex items-center gap-3 mt-2">
          <Logo src={machine.logo} alt={machine.empresa} className="h-10 w-auto object-contain" />
          <div>
            <div className="text-xl font-bold">{machine.name}</div>
            <div className="text-sm font-normal text-muted-foreground">
              {machine.empresa}
            </div>
          </div>
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Image */}
        <div className="flex justify-center">
          <Logo src={machine.imagem} alt={machine.name} className="h-40 w-auto object-contain" />
        </div>

        {/* Key Features */}
        <div className="grid grid-cols-2 gap-3">
          {/* Pricing */}
          <div className="bg-white dark:bg-gray-900 p-3 rounded-lg">
            <div className="text-xs text-muted-foreground mb-1">
              Preço da Maquininha
            </div>
            {hasPromo ? (
              <div className="space-y-1">
                <div className="text-sm line-through text-muted-foreground">
                  R$ {machine.pricing.preco.toFixed(2)}
                </div>
                <div className="text-lg font-bold text-green-600">
                  R$ {machine.pricing.preco_promocional!.toFixed(2)}
                </div>
              </div>
            ) : (
              <div className="text-lg font-bold">
                {machine.pricing.preco === 0
                  ? 'Grátis'
                  : `R$ ${machine.pricing.preco.toFixed(2)}`}
              </div>
            )}
          </div>

          {/* Monthly Fee */}
          <div className="bg-white dark:bg-gray-900 p-3 rounded-lg">
            <div className="text-xs text-muted-foreground mb-1">
              Mensalidade
            </div>
            <div className="text-lg font-bold">
              {machine.pricing.mensalidade === 0
                ? 'Sem mensalidade'
                : `R$ ${machine.pricing.mensalidade.toFixed(2)}`}
            </div>
          </div>
        </div>

        {/* Best Plan */}
        {machine.planos.length > 0 && (
          <div className="bg-white dark:bg-gray-900 p-4 rounded-lg space-y-2">
            <div className="font-semibold text-sm">
              {machine.planos[0].nome}
            </div>
            <div className="grid grid-cols-3 gap-2 text-xs">
              <div>
                <div className="text-muted-foreground">Débito</div>
                <div className="font-medium">
                  {machine.planos[0].taxa_debito}
                </div>
              </div>
              <div>
                <div className="text-muted-foreground">Crédito</div>
                <div className="font-medium">
                  {machine.planos[0].taxa_credito_vista}
                </div>
              </div>
              <div>
                <div className="text-muted-foreground">Parcelado</div>
                <div className="font-medium">
                  {machine.planos[0].taxa_credito_parcelado_min}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Feature Badges */}
        <div className="flex flex-wrap gap-2">
          {machine.features.nfc && (
            <Badge variant="secondary">NFC/Aproximação</Badge>
          )}
          {machine.features.imprime_recibo && (
            <Badge variant="secondary">Imprime Recibo</Badge>
          )}
          {machine.features.permite_antecipacao && (
            <Badge variant="secondary">Antecipação</Badge>
          )}
          {machine.features.vale_refeicao && (
            <Badge variant="secondary">Vale Refeição</Badge>
          )}
          {machine.pricing.mensalidade === 0 && (
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              Sem Mensalidade
            </Badge>
          )}
        </div>

        {/* Observations */}
        {machine.observacoes && (
          <p className="text-sm text-muted-foreground italic">
            {machine.observacoes}
          </p>
        )}

        {/* Coupon */}
        {machine.cupom && (
          <div className="flex items-center gap-2 bg-yellow-50 dark:bg-yellow-950 p-3 rounded-lg">
            <Tag className="h-4 w-4 text-yellow-600" />
            <div className="text-sm">
              <span className="font-semibold">Cupom: </span>
              <code className="bg-yellow-100 dark:bg-yellow-900 px-2 py-1 rounded">
                {machine.cupom}
              </code>
            </div>
          </div>
        )}

        {/* Last Updated */}
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Calendar className="h-3 w-3" />
          Atualizado em {machine.data_atualizacao}
        </div>

        {/* CTA Button */}
        <Button className="w-full bg-green-600 hover:bg-green-700" size="lg" asChild>
          <a
            href={machine.url_contratacao}
            target="_blank"
            rel="noopener noreferrer"
          >
            Contratar Esta Opção
            <ExternalLink className="ml-2 h-4 w-4" />
          </a>
        </Button>

        {/* Review Link */}
        {machine.url_avaliacao && (
          <Button variant="outline" className="w-full" asChild>
            <a
              href={machine.url_avaliacao}
              target="_blank"
              rel="noopener noreferrer"
            >
              Ver Análise Completa
              <ExternalLink className="ml-2 h-4 w-4" />
            </a>
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
