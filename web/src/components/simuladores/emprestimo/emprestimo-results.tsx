'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingDown, DollarSign, Calendar, Percent, Trophy } from 'lucide-react';
import type { EmprestimoOutput } from '@/lib/schemas/emprestimo.schema';
import { EmprestimoOfertas } from './emprestimo-ofertas';

interface EmprestimoResultsProps {
  resultado: EmprestimoOutput;
}

export function EmprestimoResults({ resultado }: EmprestimoResultsProps) {
  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  const formatPercentage = (value: number): string => {
    return `${value.toFixed(2)}%`;
  };

  const { melhorOferta, totalOfertas, inputData } = resultado;

  return (
    <div className="space-y-6">
      {/* Melhor Oferta - Card Principal */}
      <Card className="border-green-200 bg-green-50">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Trophy className="h-6 w-6 text-yellow-500" />
              Melhor Oferta Encontrada
            </CardTitle>
            <Badge variant="default" className="text-lg px-3 py-1">
              {totalOfertas} ofertas disponíveis
            </Badge>
          </div>
          <CardDescription className="text-base">
            {melhorOferta.nomeBanco} - {melhorOferta.modalidade}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <DollarSign className="h-4 w-4" />
                Parcela Mensal
              </div>
              <p className="text-2xl font-bold text-green-700">
                {formatCurrency(melhorOferta.parcelaMensal)}
              </p>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Percent className="h-4 w-4" />
                Taxa Mensal
              </div>
              <p className="text-2xl font-bold text-blue-700">
                {formatPercentage(melhorOferta.taxaMensal)}
              </p>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Calendar className="h-4 w-4" />
                Total Pago
              </div>
              <p className="text-2xl font-bold text-gray-700">
                {formatCurrency(melhorOferta.totalPago)}
              </p>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <TrendingDown className="h-4 w-4" />
                Total Juros
              </div>
              <p className="text-2xl font-bold text-red-700">
                {formatCurrency(melhorOferta.totalJuros)}
              </p>
            </div>
          </div>

          {/* Informa��es Adicionais */}
          <div className="mt-6 pt-6 border-t border-green-200">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <p className="text-gray-600">Taxa Anual</p>
                <p className="font-semibold">{formatPercentage(melhorOferta.taxaAnual)}</p>
              </div>
              <div>
                <p className="text-gray-600">Taxa Efetiva Anual</p>
                <p className="font-semibold">{formatPercentage(melhorOferta.taxaEfetivaAnual)}</p>
              </div>
              <div>
                <p className="text-gray-600">Valor Emprestado</p>
                <p className="font-semibold">{formatCurrency(inputData.valorDesejado)}</p>
              </div>
              <div>
                <p className="text-gray-600">Prazo</p>
                <p className="font-semibold">{inputData.prazoMeses} meses</p>
              </div>
            </div>

            {melhorOferta.comprometimentoRenda && (
              <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-sm text-gray-700">
                  <span className="font-semibold">Comprometimento de Renda:</span>{' '}
                  {formatPercentage(melhorOferta.comprometimentoRenda)} da sua renda mensal
                  {melhorOferta.comprometimentoRenda > 30 && (
                    <span className="ml-2 text-orange-600 font-medium">
                      � Acima do recomendado (30%)
                    </span>
                  )}
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Tabela de Todas as Ofertas */}
      <EmprestimoOfertas ofertas={resultado.ofertas} melhorOferta={melhorOferta} />
    </div>
  );
}
