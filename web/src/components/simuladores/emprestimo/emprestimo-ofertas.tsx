'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { ArrowUpDown, Trophy } from 'lucide-react';
import type { OfertaEmprestimo } from '@/lib/schemas/emprestimo.schema';

interface EmprestimoOfertasProps {
  ofertas: OfertaEmprestimo[];
  melhorOferta: OfertaEmprestimo;
}

type SortField = 'taxaMensal' | 'parcelaMensal' | 'totalPago' | 'totalJuros';
type SortDirection = 'asc' | 'desc';

export function EmprestimoOfertas({ ofertas, melhorOferta }: EmprestimoOfertasProps) {
  const [sortField, setSortField] = useState<SortField>('taxaMensal');
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

  const isMelhorOferta = (oferta: OfertaEmprestimo): boolean => {
    return (
      oferta.nomeBanco === melhorOferta.nomeBanco &&
      oferta.modalidade === melhorOferta.modalidade &&
      oferta.taxaMensal === melhorOferta.taxaMensal
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Todas as Ofertas Disponíveis</CardTitle>
        <CardDescription>
          Compare todas as opções de empréstimo - Clique nos cabeçalhos para ordenar
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]"></TableHead>
                <TableHead>Banco</TableHead>
                <TableHead>Modalidade</TableHead>
                <TableHead
                  className="cursor-pointer hover:bg-gray-50"
                  onClick={() => handleSort('taxaMensal')}
                >
                  <div className="flex items-center gap-1">
                    Taxa Mensal
                    <ArrowUpDown className="h-4 w-4" />
                  </div>
                </TableHead>
                <TableHead>Taxa Anual</TableHead>
                <TableHead
                  className="cursor-pointer hover:bg-gray-50"
                  onClick={() => handleSort('parcelaMensal')}
                >
                  <div className="flex items-center gap-1">
                    Parcela
                    <ArrowUpDown className="h-4 w-4" />
                  </div>
                </TableHead>
                <TableHead
                  className="cursor-pointer hover:bg-gray-50"
                  onClick={() => handleSort('totalPago')}
                >
                  <div className="flex items-center gap-1">
                    Total Pago
                    <ArrowUpDown className="h-4 w-4" />
                  </div>
                </TableHead>
                <TableHead
                  className="cursor-pointer hover:bg-gray-50"
                  onClick={() => handleSort('totalJuros')}
                >
                  <div className="flex items-center gap-1">
                    Total Juros
                    <ArrowUpDown className="h-4 w-4" />
                  </div>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedOfertas.map((oferta, index) => {
                const isBest = isMelhorOferta(oferta);
                return (
                  <TableRow
                    key={index}
                    className={isBest ? 'bg-green-50 font-medium' : ''}
                  >
                    <TableCell>
                      {isBest && (
                        <Trophy className="h-5 w-5 text-yellow-500" />
                      )}
                    </TableCell>
                    <TableCell className="font-medium">
                      {oferta.nomeBanco}
                      {isBest && (
                        <Badge className="ml-2" variant="default">
                          Melhor
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell>{oferta.modalidade}</TableCell>
                    <TableCell className="font-semibold text-blue-600">
                      {formatPercentage(oferta.taxaMensal)}
                    </TableCell>
                    <TableCell>{formatPercentage(oferta.taxaAnual)}</TableCell>
                    <TableCell>{formatCurrency(oferta.parcelaMensal)}</TableCell>
                    <TableCell>{formatCurrency(oferta.totalPago)}</TableCell>
                    <TableCell className="text-red-600">
                      {formatCurrency(oferta.totalJuros)}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
