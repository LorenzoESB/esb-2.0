'use client';

import { useState } from 'react';
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
import { ArrowUpDown, Trophy, TrendingDown } from 'lucide-react';
import type { OfertaFinanciamentoVeiculo } from '@/lib/schemas/financiamento-veiculo.schema';

interface FinanciamentoVeiculoOfertasProps {
  ofertas: OfertaFinanciamentoVeiculo[];
}

type SortField =
  | 'parcelaMensal'
  | 'valorTotal'
  | 'taxaJurosMensal'
  | 'comprometimentoRenda'
  | 'valorIOF';
type SortDirection = 'asc' | 'desc';

export function FinanciamentoVeiculoOfertas({
  ofertas,
}: FinanciamentoVeiculoOfertasProps) {
  const [sortField, setSortField] = useState<SortField>('parcelaMensal');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const sortedOfertas = [...ofertas].sort((a, b) => {
    const aValue = a[sortField];
    const bValue = b[sortField];
    const multiplier = sortDirection === 'asc' ? 1 : -1;
    return (aValue - bValue) * multiplier;
  });

  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  const formatPercentage = (value: number): string => {
    return `${value.toFixed(2)}%`;
  };

  // Melhor oferta é a primeira quando ordenado por parcela mensal crescente
  const melhorOferta = [...ofertas].sort(
    (a, b) => a.parcelaMensal - b.parcelaMensal
  )[0];

  const isMelhorOferta = (oferta: OfertaFinanciamentoVeiculo): boolean => {
    return (
      oferta.nomeBanco === melhorOferta.nomeBanco &&
      oferta.modalidade === melhorOferta.modalidade &&
      oferta.parcelaMensal === melhorOferta.parcelaMensal
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingDown className="h-5 w-5" />
          Todas as Ofertas Disponíveis
        </CardTitle>
        <CardDescription>
          Compare todas as opções de financiamento - Clique nos cabeçalhos para
          ordenar
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]"></TableHead>
                <TableHead className="min-w-[150px]">Banco</TableHead>
                <TableHead className="min-w-[200px]">Modalidade</TableHead>
                <TableHead
                  className="cursor-pointer hover:bg-gray-50 min-w-[130px]"
                  onClick={() => handleSort('parcelaMensal')}
                >
                  <div className="flex items-center gap-1">
                    Parcela Mensal
                    <ArrowUpDown className="h-4 w-4" />
                  </div>
                </TableHead>
                <TableHead
                  className="cursor-pointer hover:bg-gray-50 min-w-[100px]"
                  onClick={() => handleSort('taxaJurosMensal')}
                >
                  <div className="flex items-center gap-1">
                    Taxa Mensal
                    <ArrowUpDown className="h-4 w-4" />
                  </div>
                </TableHead>
                <TableHead className="min-w-[100px]">Taxa Anual</TableHead>
                <TableHead
                  className="cursor-pointer hover:bg-gray-50 min-w-[130px]"
                  onClick={() => handleSort('valorTotal')}
                >
                  <div className="flex items-center gap-1">
                    Total Pago
                    <ArrowUpDown className="h-4 w-4" />
                  </div>
                </TableHead>
                <TableHead
                  className="cursor-pointer hover:bg-gray-50 min-w-[100px]"
                  onClick={() => handleSort('valorIOF')}
                >
                  <div className="flex items-center gap-1">
                    IOF
                    <ArrowUpDown className="h-4 w-4" />
                  </div>
                </TableHead>
                <TableHead
                  className="cursor-pointer hover:bg-gray-50 min-w-[120px]"
                  onClick={() => handleSort('comprometimentoRenda')}
                >
                  <div className="flex items-center gap-1">
                    Comprometimento
                    <ArrowUpDown className="h-4 w-4" />
                  </div>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedOfertas.map((oferta, index) => {
                const isBest = isMelhorOferta(oferta);
                const comprometimentoAlto = oferta.comprometimentoRenda > 30;

                return (
                  <TableRow
                    key={index}
                    className={isBest ? 'bg-green-50 font-medium' : ''}
                  >
                    <TableCell>
                      {isBest && <Trophy className="h-5 w-5 text-yellow-500" />}
                    </TableCell>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        {oferta.nomeBanco}
                        {isBest && (
                          <Badge className="text-xs" variant="default">
                            Melhor
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-sm">{oferta.modalidade}</TableCell>
                    <TableCell className="font-semibold text-blue-600">
                      {formatCurrency(oferta.parcelaMensal)}
                    </TableCell>
                    <TableCell className="font-semibold">
                      {formatPercentage(oferta.taxaJurosMensal)}
                    </TableCell>
                    <TableCell>
                      {formatPercentage(oferta.taxaJurosAnual)}
                    </TableCell>
                    <TableCell className="font-semibold">
                      {formatCurrency(oferta.valorTotal)}
                    </TableCell>
                    <TableCell>{formatCurrency(oferta.valorIOF)}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span
                          className={`font-semibold ${
                            comprometimentoAlto
                              ? 'text-orange-600'
                              : 'text-green-600'
                          }`}
                        >
                          {formatPercentage(oferta.comprometimentoRenda)}
                        </span>
                        {comprometimentoAlto && (
                          <Badge variant="destructive" className="text-xs">
                            Alto
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>

        {/* Legenda */}
        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-600 mb-2">
            <strong>Legenda:</strong>
          </p>
          <ul className="text-xs text-gray-600 space-y-1">
            <li>
              • <strong>Parcela Mensal:</strong> Valor fixo mensal a ser pago
            </li>
            <li>
              • <strong>Taxa:</strong> Juros cobrados (mensal e anual)
            </li>
            <li>
              • <strong>Total Pago:</strong> Soma de todas as parcelas + IOF
            </li>
            <li>
              • <strong>IOF:</strong> Imposto sobre Operações Financeiras
            </li>
            <li>
              • <strong>Comprometimento:</strong> Percentual da renda mensal
              comprometido com a parcela
            </li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
