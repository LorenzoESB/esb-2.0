'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Trophy, TrendingUp } from 'lucide-react';
import type { OfertaFinanciamentoVeiculo } from '@/lib/schemas/financiamento-veiculo.schema';

interface FinanciamentoVeiculoResultsProps {
  melhorOferta: OfertaFinanciamentoVeiculo;
}

export function FinanciamentoVeiculoResults({
  melhorOferta,
}: FinanciamentoVeiculoResultsProps) {
  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  const formatPercentage = (value: number): string => {
    return `${value.toFixed(2)}%`;
  };

  const comprometimentoAlto = melhorOferta.comprometimentoRenda > 30;

  return (
    <Card className="border-green-200 bg-green-50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Trophy className="h-5 w-5 text-yellow-500" />
          Melhor Oferta Encontrada
        </CardTitle>
        <CardDescription>
          Opção com menor parcela mensal entre todas as ofertas
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Banco e Modalidade */}
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold text-gray-800">
                {melhorOferta.nomeBanco}
              </h3>
              <p className="text-sm text-gray-600">{melhorOferta.modalidade}</p>
            </div>
            <Badge className="text-lg px-3 py-1">Melhor Opção</Badge>
          </div>

          {/* Parcela Mensal - Destaque */}
          <div className="bg-white rounded-lg p-6 text-center border-2 border-blue-500">
            <p className="text-sm text-gray-600 mb-1">Parcela Mensal</p>
            <p className="text-4xl font-bold text-blue-600">
              {formatCurrency(melhorOferta.parcelaMensal)}
            </p>
          </div>

          {/* Grid de Informações */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white rounded-lg p-4">
              <p className="text-xs text-gray-600 mb-1">Taxa Mensal</p>
              <p className="text-lg font-semibold text-gray-800">
                {formatPercentage(melhorOferta.taxaJurosMensal)}
              </p>
            </div>

            <div className="bg-white rounded-lg p-4">
              <p className="text-xs text-gray-600 mb-1">Taxa Anual</p>
              <p className="text-lg font-semibold text-gray-800">
                {formatPercentage(melhorOferta.taxaJurosAnual)}
              </p>
            </div>

            <div className="bg-white rounded-lg p-4">
              <p className="text-xs text-gray-600 mb-1">Total a Pagar</p>
              <p className="text-lg font-semibold text-gray-800">
                {formatCurrency(melhorOferta.valorTotal)}
              </p>
            </div>

            <div className="bg-white rounded-lg p-4">
              <p className="text-xs text-gray-600 mb-1">IOF</p>
              <p className="text-lg font-semibold text-gray-800">
                {formatCurrency(melhorOferta.valorIOF)}
              </p>
            </div>
          </div>

          {/* Comprometimento de Renda */}
          <div
            className={`rounded-lg p-4 ${
              comprometimentoAlto
                ? 'bg-orange-100 border border-orange-300'
                : 'bg-white'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <TrendingUp
                  className={`h-5 w-5 ${
                    comprometimentoAlto ? 'text-orange-600' : 'text-green-600'
                  }`}
                />
                <span className="text-sm font-medium text-gray-700">
                  Comprometimento de Renda
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span
                  className={`text-2xl font-bold ${
                    comprometimentoAlto ? 'text-orange-600' : 'text-green-600'
                  }`}
                >
                  {formatPercentage(melhorOferta.comprometimentoRenda)}
                </span>
                {comprometimentoAlto && (
                  <Badge variant="destructive">Alto</Badge>
                )}
              </div>
            </div>
            {comprometimentoAlto && (
              <p className="text-xs text-orange-700 mt-2">
                Comprometimento acima de 30% pode indicar risco financeiro.
                Recomenda-se manter abaixo desse limite.
              </p>
            )}
          </div>

          {/* Observações */}
          <div className="text-xs text-gray-600 space-y-1 bg-white p-4 rounded-lg">
            <p>
              <strong>Importante:</strong> Esta é uma simulação. A aprovação do
              crédito depende da análise da instituição financeira.
            </p>
            <p>
              Os valores podem variar de acordo com a política de crédito de
              cada banco e seu perfil de crédito.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
