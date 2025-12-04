'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  TrendingDown,
  DollarSign,
  Percent,
  Trophy,
  ArrowDown,
  AlertCircle,
  Info,
} from 'lucide-react';
import type { OfertaFinanciamentoImobiliario } from '@/lib/schemas/financiamento-imobiliario.schema';

interface FinanciamentoImobiliarioResultsProps {
  oferta: OfertaFinanciamentoImobiliario;
}

export function FinanciamentoImobiliarioResults({
  oferta,
}: FinanciamentoImobiliarioResultsProps) {
  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  const formatPercentage = (value: number): string => {
    return `${value.toFixed(2)}%`;
  };

  const comprometimentoAlto = oferta.comprometimentoRenda > 30;
  const reducaoParcela = oferta.parcelaInicial - oferta.parcelaFinal;
  const percentualReducao =
    ((reducaoParcela / oferta.parcelaInicial) * 100).toFixed(1);

  return (
    <div className="space-y-6">
      {/* Melhor Oferta - Card Principal */}
      <Card className="border-green-200 bg-green-50">
        <CardHeader>
          <div className="flex items-center justify-between flex-wrap gap-2">
            <CardTitle className="flex items-center gap-2">
              <Trophy className="h-6 w-6 text-yellow-500" />
              Melhor Oferta Encontrada
            </CardTitle>
            <Badge variant="default" className="text-base px-3 py-1">
              Sistema SAC
            </Badge>
          </div>
          <CardDescription className="text-base">
            {oferta.nomeBanco} - {oferta.modalidade}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Primeira Parcela */}
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <DollarSign className="h-4 w-4" />
                Primeira Parcela
              </div>
              <p className="text-2xl font-bold text-blue-700">
                {formatCurrency(oferta.parcelaInicial)}
              </p>
              <p className="text-xs text-gray-500">Parcela mais alta (mês 1)</p>
            </div>

            {/* Última Parcela */}
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <TrendingDown className="h-4 w-4" />
                Última Parcela
              </div>
              <p className="text-2xl font-bold text-green-700">
                {formatCurrency(oferta.parcelaFinal)}
              </p>
              <p className="text-xs text-gray-500">
                Parcela mais baixa (último mês)
              </p>
            </div>

            {/* Taxa Mensal */}
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Percent className="h-4 w-4" />
                Taxa Mensal
              </div>
              <p className="text-2xl font-bold text-purple-700">
                {formatPercentage(oferta.taxaJurosMensal)}
              </p>
              <p className="text-xs text-gray-500">+ TR (pós-fixado)</p>
            </div>

            {/* Valor Total */}
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <DollarSign className="h-4 w-4" />
                Valor Total
              </div>
              <p className="text-2xl font-bold text-gray-700">
                {formatCurrency(oferta.valorTotal)}
              </p>
              <p className="text-xs text-gray-500">Total a pagar</p>
            </div>
          </div>

          {/* Redução da Parcela - Destaque SAC */}
          <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-green-50 rounded-lg border border-blue-200">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white rounded-full">
                <ArrowDown className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="font-semibold text-gray-800">
                  Redução de {formatCurrency(reducaoParcela)} nas parcelas
                </p>
                <p className="text-sm text-gray-600">
                  Suas parcelas diminuirão {percentualReducao}% ao longo do
                  financiamento no Sistema SAC
                </p>
              </div>
            </div>
          </div>

          {/* Informações Adicionais */}
          <div className="mt-6 pt-6 border-t border-green-200">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
              <div>
                <p className="text-gray-600">Taxa Anual</p>
                <p className="font-semibold text-lg">
                  {formatPercentage(oferta.taxaJurosAnual)}
                </p>
              </div>
              <div>
                <p className="text-gray-600">Comprometimento de Renda</p>
                <p
                  className={`font-semibold text-lg ${
                    comprometimentoAlto ? 'text-orange-600' : 'text-green-600'
                  }`}
                >
                  {formatPercentage(oferta.comprometimentoRenda)}
                </p>
              </div>
              <div>
                <p className="text-gray-600">Modalidade</p>
                <p className="font-semibold text-sm">SAC + TR</p>
              </div>
            </div>

            {/* Alerta de Comprometimento */}
            {comprometimentoAlto && (
              <Alert variant="destructive" className="mt-4">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  <span className="font-semibold">Atenção:</span> O comprometimento
                  da renda está acima de 30%. Bancos recomendam que o financiamento
                  não ultrapasse 30% da renda mensal para garantir segurança
                  financeira.
                </AlertDescription>
              </Alert>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Card Explicativo do SAC */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Info className="h-5 w-5 text-blue-500" />
            Como funciona o Sistema SAC?
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-sm text-gray-600">
            <p>
              <strong className="text-gray-800">
                Sistema de Amortização Constante (SAC):
              </strong>{' '}
              A amortização do principal é fixa todos os meses, mas os juros
              incidem sobre o saldo devedor, que diminui a cada mês.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div className="p-3 bg-blue-50 rounded-lg">
                <p className="font-semibold text-gray-800 mb-1">Vantagens</p>
                <ul className="list-disc list-inside space-y-1 text-xs">
                  <li>Parcelas decrescentes ao longo do tempo</li>
                  <li>Menor custo total de juros</li>
                  <li>Redução do comprometimento de renda gradual</li>
                </ul>
              </div>
              <div className="p-3 bg-orange-50 rounded-lg">
                <p className="font-semibold text-gray-800 mb-1">Atenção</p>
                <ul className="list-disc list-inside space-y-1 text-xs">
                  <li>Primeira parcela mais alta</li>
                  <li>Taxa indexada à TR (pode variar)</li>
                  <li>Requer planejamento financeiro inicial</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
