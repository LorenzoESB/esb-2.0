'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { RendaFixaOutput } from '@/lib/schemas/renda-fixa.schema';
import { Trophy, TrendingUp, AlertCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { RendaFixaDetailedOptions } from './renda-fixa-detailed-options';

interface RendaFixaResultsProps {
  data: RendaFixaOutput;
}

export function RendaFixaResults({ data }: RendaFixaResultsProps) {
  const [showDetailedOptions, setShowDetailedOptions] = useState(false);
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  const formatPercentage = (value: number) => {
    return `${value.toFixed(2)}%`;
  };

  const investimentos = [
    {
      nome: 'Poupança',
      dados: data.poupanca,
      descricao: 'Isenta de IR',
      color: 'bg-blue-50 border-blue-200',
      icon: '💰',
    },
    {
      nome: 'Tesouro Direto',
      dados: data.tesouroDireto,
      descricao: 'Taxa Selic com IR',
      color: 'bg-green-50 border-green-200',
      icon: '🏛️',
    },
    {
      nome: 'LCI',
      dados: data.lci,
      descricao: '90% CDI - Isenta de IR',
      color: 'bg-purple-50 border-purple-200',
      icon: '🏠',
    },
    {
      nome: 'CDB',
      dados: data.cdb,
      descricao: '110% CDI com IR',
      color: 'bg-orange-50 border-orange-200',
      icon: '🏦',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Card de Melhor Investimento */}
      <Card className="border-2 border-yellow-400 bg-gradient-to-br from-yellow-50 to-yellow-100">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-yellow-900">
            <Trophy className="h-6 w-6" />
            Melhor Investimento
          </CardTitle>
          <CardDescription className="text-yellow-800">
            Recomendação baseada no maior retorno líquido
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="text-3xl font-bold text-yellow-900">
              {data.melhorInvestimento}
            </div>
            <div className="text-xl text-yellow-800">
              Rendimento: {formatCurrency(data.melhorRendimento)}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Card de Resumo */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Resumo do Investimento
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-1">
              <p className="text-sm text-gray-600">Total Investido</p>
              <p className="text-2xl font-bold">{formatCurrency(data.totalInvestido)}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-gray-600">Taxa Selic</p>
              <p className="text-2xl font-bold text-green-600">{formatPercentage(data.taxaSelic)}</p>
              <p className="text-xs text-gray-500">ao ano</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-gray-600">Taxa CDI</p>
              <p className="text-2xl font-bold text-blue-600">{formatPercentage(data.taxaCdi)}</p>
              <p className="text-xs text-gray-500">ao ano</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Cards de Comparação */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {investimentos.map((investimento) => {
          const isMelhor = investimento.nome === data.melhorInvestimento;
          return (
            <Card
              key={investimento.nome}
              className={`${investimento.color} ${isMelhor ? 'ring-2 ring-yellow-400' : ''}`}
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <span className="text-2xl">{investimento.icon}</span>
                    {investimento.nome}
                  </CardTitle>
                  {isMelhor && (
                    <Badge className="bg-yellow-500 text-white">
                      <Trophy className="h-3 w-3 mr-1" />
                      Melhor
                    </Badge>
                  )}
                </div>
                <CardDescription>{investimento.descricao}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-gray-600">Valor Final</p>
                    <p className="text-lg font-bold">
                      {formatCurrency(investimento.dados.resultado)}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600">Rendimento</p>
                    <p className="text-lg font-bold text-green-600">
                      {formatCurrency(investimento.dados.rendimentoLiquido)}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-gray-600">% Rendimento</p>
                    <p className="text-md font-semibold">
                      {formatPercentage(investimento.dados.percentualRendimento)}
                    </p>
                  </div>
                  {investimento.dados.imposto > 0 && (
                    <div>
                      <p className="text-xs text-gray-600">IR Retido</p>
                      <p className="text-md font-semibold text-red-600">
                        {formatCurrency(investimento.dados.imposto)}
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Botão para Detalhar Opções */}
      {data.ofertasDetalhadas && data.ofertasDetalhadas.length > 0 && (
        <div className="flex justify-center">
          <Button
            variant="outline"
            size="lg"
            onClick={() => setShowDetailedOptions(!showDetailedOptions)}
            className="w-full md:w-auto"
          >
            {showDetailedOptions ? (
              <>
                <ChevronUp className="mr-2 h-4 w-4" />
                Ocultar Ofertas Detalhadas
              </>
            ) : (
              <>
                <ChevronDown className="mr-2 h-4 w-4" />
                Ver Ofertas Detalhadas do Mercado
              </>
            )}
          </Button>
        </div>
      )}

      {/* Ofertas Detalhadas */}
      {showDetailedOptions && data.ofertasDetalhadas && (
        <RendaFixaDetailedOptions
          ofertas={data.ofertasDetalhadas}
          melhorInvestimento={data.melhorInvestimento}
        />
      )}

      {/* Card de Observações */}
      <Card className="bg-blue-50 border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-900 text-base">
            <AlertCircle className="h-5 w-5" />
            Informações Importantes
          </CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-blue-800 space-y-2">
          <ul className="list-disc list-inside space-y-1">
            <li>As taxas são atualizadas diariamente do Banco Central</li>
            <li>Poupança e LCI são isentas de Imposto de Renda</li>
            <li>Tesouro Direto e CDB têm IR regressivo (22,5% a 15%)</li>
            <li>Não consideramos taxas de administração ou custódia</li>
            <li>Simulação considera aportes mensais constantes</li>
            {data.ofertasDetalhadas && data.ofertasDetalhadas.length > 0 && (
              <li>Ofertas detalhadas fornecidas por App Renda Fixa em tempo real</li>
            )}
            <li>Esta é uma simulação educacional, consulte um especialista</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
