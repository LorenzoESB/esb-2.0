'use client';

import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  PieChart,
  Info,
} from 'lucide-react';
import type {
  OpcaoAquisicao,
  BreakdownCustos,
} from '@/lib/schemas/comparador-assinatura-carro.schema';

interface ComparadorBreakdownProps {
  compraVista: OpcaoAquisicao;
  financiamento: OpcaoAquisicao;
  assinatura: OpcaoAquisicao;
}

export function ComparadorBreakdown({
  compraVista,
  financiamento,
  assinatura,
}: ComparadorBreakdownProps) {
  const [selectedTab, setSelectedTab] = useState('compraVista');

  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  const calculatePercentage = (
    value: number,
    total: number
  ): string => {
    if (total === 0) return '0%';
    return `${((Math.abs(value) / total) * 100).toFixed(1)}%`;
  };

  const renderBreakdownDetails = (
    breakdown: BreakdownCustos,
    opcao: OpcaoAquisicao,
    tipo: 'compraVista' | 'financiamento' | 'assinatura'
  ) => {
    const items = [
      {
        label: 'Custo de Aquisição/Mensalidades',
        value: breakdown.custoAquisicao,
        description:
          tipo === 'assinatura'
            ? 'Soma de todas as mensalidades da assinatura'
            : 'Valor pago pelo veículo (à vista ou financiado)',
        color: 'text-blue-600',
        bgColor: 'bg-blue-50',
      },
      {
        label: 'Manutenção',
        value: breakdown.manutencao,
        description: 'Custos estimados com manutenção preventiva e corretiva',
        color: 'text-purple-600',
        bgColor: 'bg-purple-50',
      },
      {
        label: 'Seguro',
        value: breakdown.seguro,
        description: 'Custo do seguro do veículo no período',
        color: 'text-green-600',
        bgColor: 'bg-green-50',
      },
    ];

    if (tipo !== 'assinatura') {
      items.push(
        {
          label: 'IPVA',
          value: breakdown.ipva,
          description: 'Imposto sobre Propriedade de Veículos Automotores',
          color: 'text-orange-600',
          bgColor: 'bg-orange-50',
        },
        {
          label: 'Taxas de Licenciamento',
          value: breakdown.taxasLicenciamento,
          description: 'Taxas anuais de licenciamento do veículo',
          color: 'text-yellow-600',
          bgColor: 'bg-yellow-50',
        },
        {
          label: 'Depreciação',
          value: breakdown.depreciacao,
          description: 'Perda de valor do veículo ao longo do tempo',
          color: 'text-red-600',
          bgColor: 'bg-red-50',
        },
        {
          label: 'Custo de Oportunidade',
          value: breakdown.custoOportunidade,
          description:
            'Rendimento que o capital investido poderia gerar se aplicado',
          color: 'text-indigo-600',
          bgColor: 'bg-indigo-50',
        }
      );
    }

    return (
      <div className="space-y-3">
        {/* Resumo */}
        <div className="grid grid-cols-3 gap-3 mb-4">
          <div className="bg-gray-100 rounded-lg p-3">
            <p className="text-xs text-gray-600 mb-1">Custo Total</p>
            <p className="text-lg font-bold text-gray-800">
              {formatCurrency(opcao.custoTotal)}
            </p>
          </div>
          <div className="bg-green-100 rounded-lg p-3">
            <p className="text-xs text-gray-600 mb-1">Valor Revenda</p>
            <p className="text-lg font-bold text-green-700">
              {formatCurrency(opcao.valorRevenda)}
            </p>
          </div>
          <div className="bg-blue-100 rounded-lg p-3">
            <p className="text-xs text-gray-600 mb-1">Custo Líquido</p>
            <p className="text-lg font-bold text-blue-700">
              {formatCurrency(opcao.custoLiquido)}
            </p>
          </div>
        </div>

        {/* Itens do Breakdown */}
        <div className="space-y-2">
          {items.map((item, index) => (
            <div
              key={index}
              className={`${item.bgColor} rounded-lg p-4 border border-gray-200`}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className={`font-semibold text-sm ${item.color}`}>
                      {item.label}
                    </h4>
                    <Badge variant="outline" className="text-xs">
                      {calculatePercentage(item.value, opcao.custoTotal)}
                    </Badge>
                  </div>
                  <p className="text-xs text-gray-600 flex items-start gap-1">
                    <Info className="h-3 w-3 mt-0.5 flex-shrink-0" />
                    {item.description}
                  </p>
                </div>
                <div className="text-right ml-3">
                  <p className={`text-lg font-bold ${item.color}`}>
                    {item.label.includes('Depreciação') ? '-' : ''}
                    {formatCurrency(item.value)}
                  </p>
                </div>
              </div>
              {/* Barra de Progresso */}
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div
                  className={`h-2 rounded-full ${item.color.replace(
                    'text',
                    'bg'
                  )}`}
                  style={{
                    width: calculatePercentage(item.value, opcao.custoTotal),
                  }}
                ></div>
              </div>
            </div>
          ))}
        </div>

        {/* Cálculo do Custo Líquido */}
        <div className="bg-gray-50 rounded-lg p-4 border-2 border-gray-300 mt-4">
          <h4 className="font-semibold text-sm text-gray-700 mb-3">
            Cálculo do Custo Líquido:
          </h4>
          <div className="space-y-1 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Custo Total:</span>
              <span className="font-medium">
                {formatCurrency(opcao.custoTotal)}
              </span>
            </div>
            <div className="flex justify-between text-green-600">
              <span>(-) Valor de Revenda:</span>
              <span className="font-medium">
                {formatCurrency(opcao.valorRevenda)}
              </span>
            </div>
            <div className="border-t border-gray-300 my-2"></div>
            <div className="flex justify-between text-lg font-bold text-blue-600">
              <span>(=) Custo Líquido:</span>
              <span>{formatCurrency(opcao.custoLiquido)}</span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <PieChart className="h-5 w-5" />
          Detalhamento de Custos
        </CardTitle>
        <CardDescription>
          Veja a composição detalhada dos custos de cada opção
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={selectedTab} onValueChange={setSelectedTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="compraVista" className="gap-2">
              <DollarSign className="h-4 w-4" />
              Compra à Vista
            </TabsTrigger>
            <TabsTrigger value="financiamento" className="gap-2">
              <TrendingUp className="h-4 w-4" />
              Financiamento
            </TabsTrigger>
            <TabsTrigger value="assinatura" className="gap-2">
              <TrendingDown className="h-4 w-4" />
              Assinatura
            </TabsTrigger>
          </TabsList>

          <TabsContent value="compraVista" className="mt-6">
            {renderBreakdownDetails(
              compraVista.breakdown,
              compraVista,
              'compraVista'
            )}
          </TabsContent>

          <TabsContent value="financiamento" className="mt-6">
            {renderBreakdownDetails(
              financiamento.breakdown,
              financiamento,
              'financiamento'
            )}
          </TabsContent>

          <TabsContent value="assinatura" className="mt-6">
            {renderBreakdownDetails(
              assinatura.breakdown,
              assinatura,
              'assinatura'
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
