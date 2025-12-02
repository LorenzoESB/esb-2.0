'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Building2, TrendingUp, Calendar, DollarSign } from 'lucide-react';
import type {
  InvestimentoOferta,
  OfertaTesouro,
} from '@/lib/schemas/renda-fixa.schema';

interface RendaFixaDetailedOptionsProps {
  ofertas: InvestimentoOferta[] | OfertaTesouro[];
  melhorInvestimento: string;
}

/**
 * Verifica se as ofertas são do tipo CDB/LCI
 */
function isInvestimentoOferta(
  oferta: InvestimentoOferta | OfertaTesouro,
): oferta is InvestimentoOferta {
  return 'corretora' in oferta;
}

/**
 * Componente que exibe ofertas detalhadas de investimentos
 * Mostra tabela com corretoras, emissores, taxas, vencimentos e valores
 */
export function RendaFixaDetailedOptions({
  ofertas,
  melhorInvestimento,
}: RendaFixaDetailedOptionsProps) {
  if (!ofertas || ofertas.length === 0) {
    return (
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Ofertas Detalhadas</CardTitle>
          <CardDescription>
            Não foi possível carregar ofertas detalhadas no momento.
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  const isTesouro =
    melhorInvestimento === 'Tesouro Direto' ||
    melhorInvestimento === 'SELIC';

  return (
    <Card className="mt-6">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-green-600" />
              Ofertas Detalhadas - {melhorInvestimento}
            </CardTitle>
            <CardDescription>
              {ofertas.length} {ofertas.length === 1 ? 'oferta disponível' : 'ofertas disponíveis'} no mercado
            </CardDescription>
          </div>
          <Badge variant="outline" className="text-xs">
            Dados fornecidos por App Renda Fixa
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          {isTesouro ? (
            <TesouroTable ofertas={ofertas as OfertaTesouro[]} />
          ) : (
            <InvestimentoTable ofertas={ofertas as InvestimentoOferta[]} />
          )}
        </div>
      </CardContent>
    </Card>
  );
}

/**
 * Tabela para ofertas de CDB/LCI
 */
function InvestimentoTable({ ofertas }: { ofertas: InvestimentoOferta[] }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>
            <div className="flex items-center gap-2">
              <Building2 className="h-4 w-4" />
              Corretora
            </div>
          </TableHead>
          <TableHead>
            <div className="flex items-center gap-2">
              <Building2 className="h-4 w-4" />
              Emissor
            </div>
          </TableHead>
          <TableHead className="text-right">
            <div className="flex items-center justify-end gap-2">
              <TrendingUp className="h-4 w-4" />
              Taxa Bruta
            </div>
          </TableHead>
          <TableHead className="text-center">
            <div className="flex items-center justify-center gap-2">
              <Calendar className="h-4 w-4" />
              Vencimento
            </div>
          </TableHead>
          <TableHead className="text-right">
            <div className="flex items-center justify-end gap-2">
              <DollarSign className="h-4 w-4" />
              Investimento Mínimo
            </div>
          </TableHead>
          <TableHead className="text-right">
            <div className="flex items-center justify-end gap-2">
              <DollarSign className="h-4 w-4" />
              Valor Líquido
            </div>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {ofertas.map((oferta, index) => (
          <TableRow key={index} className="hover:bg-muted/50">
            <TableCell className="font-medium">{oferta.corretora}</TableCell>
            <TableCell>{oferta.emissor}</TableCell>
            <TableCell className="text-right">
              <Badge variant="secondary">{oferta.taxa}</Badge>
            </TableCell>
            <TableCell className="text-center">{oferta.vencimento}</TableCell>
            <TableCell className="text-right font-mono">
              {formatCurrency(oferta.qtdMinima)}
            </TableCell>
            <TableCell className="text-right font-mono font-semibold text-green-600">
              {formatCurrency(oferta.vl)}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

/**
 * Tabela para ofertas de Tesouro Direto/SELIC
 */
function TesouroTable({ ofertas }: { ofertas: OfertaTesouro[] }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>
            <div className="flex items-center gap-2">
              <Building2 className="h-4 w-4" />
              Nome do Título
            </div>
          </TableHead>
          <TableHead>Tipo</TableHead>
          <TableHead className="text-right">
            <div className="flex items-center justify-end gap-2">
              <TrendingUp className="h-4 w-4" />
              Taxa
            </div>
          </TableHead>
          <TableHead className="text-center">
            <div className="flex items-center justify-center gap-2">
              <Calendar className="h-4 w-4" />
              Vencimento
            </div>
          </TableHead>
          <TableHead className="text-right">
            <div className="flex items-center justify-end gap-2">
              <DollarSign className="h-4 w-4" />
              Valor
            </div>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {ofertas.map((oferta, index) => (
          <TableRow key={index} className="hover:bg-muted/50">
            <TableCell className="font-medium">{oferta.nom}</TableCell>
            <TableCell>
              <Badge variant="outline">{oferta.tipo}</Badge>
            </TableCell>
            <TableCell className="text-right">
              <Badge variant="secondary">{oferta.tx.toFixed(2)}%</Badge>
            </TableCell>
            <TableCell className="text-center">{oferta.data_vencto}</TableCell>
            <TableCell className="text-right font-mono font-semibold text-green-600">
              {formatCurrency(oferta.vlr)}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

/**
 * Formata valor como moeda brasileira
 */
function formatCurrency(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
}
