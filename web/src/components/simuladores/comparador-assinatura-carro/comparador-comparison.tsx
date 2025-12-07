'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Trophy,
  DollarSign,
  ExternalLink,
  TrendingDown,
  TrendingUp,
} from 'lucide-react';
import type {
  OpcaoAquisicao,
  ComparadorAssinaturaCarroOutput,
} from '@/lib/schemas/comparador-assinatura-carro.schema';

interface ComparadorComparisonProps {
  resultado: ComparadorAssinaturaCarroOutput;
}

export function ComparadorComparison({
  resultado,
}: ComparadorComparisonProps) {
  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  const renderOpcaoCard = (
    opcao: OpcaoAquisicao,
    tipo: 'compraVista' | 'financiamento' | 'assinatura',
    isMelhor: boolean
  ) => {
    const icons = {
      compraVista: DollarSign,
      financiamento: TrendingUp,
      assinatura: TrendingDown,
    };
    const Icon = icons[tipo];

    return (
      <Card
        className={`relative ${
          isMelhor
            ? 'border-green-500 border-2 bg-green-50'
            : 'border-gray-200'
        }`}
      >
        {isMelhor && (
          <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
            <Badge className="px-4 py-1 text-sm">
              <Trophy className="h-3 w-3 mr-1 inline" />
              Melhor Opção
            </Badge>
          </div>
        )}
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2">
            <Icon className="h-5 w-5" />
            {opcao.nome}
          </CardTitle>
          <CardDescription>
            {tipo === 'compraVista' && 'Compra à vista do veículo'}
            {tipo === 'financiamento' && 'Financiamento bancário'}
            {tipo === 'assinatura' && 'Assinatura de veículo'}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Custo Líquido - Destaque Principal */}
          <div
            className={`rounded-lg p-4 text-center ${
              isMelhor ? 'bg-green-100 border-2 border-green-500' : 'bg-gray-50'
            }`}
          >
            <p className="text-xs text-gray-600 mb-1">Custo Líquido Total</p>
            <p
              className={`text-2xl font-bold ${
                isMelhor ? 'text-green-700' : 'text-gray-800'
              }`}
            >
              {formatCurrency(opcao.custoLiquido)}
            </p>
          </div>

          {/* Custos e Valor de Revenda */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-gray-50 rounded-lg p-3">
              <p className="text-xs text-gray-600 mb-1">Custo Total</p>
              <p className="text-sm font-semibold text-gray-800">
                {formatCurrency(opcao.custoTotal)}
              </p>
            </div>
            <div className="bg-gray-50 rounded-lg p-3">
              <p className="text-xs text-gray-600 mb-1">Valor Revenda</p>
              <p className="text-sm font-semibold text-green-600">
                {formatCurrency(opcao.valorRevenda)}
              </p>
            </div>
          </div>

          {/* Breakdown Simplificado */}
          <div className="text-xs text-gray-600 space-y-1 border-t pt-3">
            <div className="flex justify-between">
              <span>Aquisição/Mensalidades:</span>
              <span className="font-medium text-gray-800">
                {formatCurrency(opcao.breakdown.custoAquisicao)}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Manutenção:</span>
              <span className="font-medium text-gray-800">
                {formatCurrency(opcao.breakdown.manutencao)}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Seguro:</span>
              <span className="font-medium text-gray-800">
                {formatCurrency(opcao.breakdown.seguro)}
              </span>
            </div>
            {tipo !== 'assinatura' && (
              <>
                <div className="flex justify-between">
                  <span>IPVA:</span>
                  <span className="font-medium text-gray-800">
                    {formatCurrency(opcao.breakdown.ipva)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Licenciamento:</span>
                  <span className="font-medium text-gray-800">
                    {formatCurrency(opcao.breakdown.taxasLicenciamento)}
                  </span>
                </div>
              </>
            )}
            {tipo !== 'assinatura' && (
              <div className="flex justify-between text-orange-600">
                <span>Depreciação:</span>
                <span className="font-medium">
                  -{formatCurrency(opcao.breakdown.depreciacao)}
                </span>
              </div>
            )}
            {tipo !== 'assinatura' && (
              <div className="flex justify-between text-blue-600">
                <span>Custo Oportunidade:</span>
                <span className="font-medium">
                  {formatCurrency(opcao.breakdown.custoOportunidade)}
                </span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="space-y-6">
      {/* Resumo da Comparação */}
      <Card className="bg-blue-50 border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-yellow-500" />
            Resultado da Comparação
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-700">
              Melhor opção para {resultado.periodoAnos}{' '}
              {resultado.periodoAnos === 1 ? 'ano' : 'anos'}:
            </span>
            <Badge className="text-base px-4 py-1">
              {resultado.melhorOpcao === 'compraVista'
                ? 'Compra à Vista'
                : resultado.melhorOpcao === 'financiamento'
                ? 'Financiamento'
                : 'Assinatura'}
            </Badge>
          </div>
          <div className="flex items-center justify-between bg-white rounded-lg p-3">
            <span className="text-sm font-medium text-gray-700">
              Economia máxima:
            </span>
            <span className="text-xl font-bold text-green-600">
              {formatCurrency(resultado.economiaMaxima)}
            </span>
          </div>
          <p className="text-xs text-gray-600">
            Comparando a melhor opção com a alternativa mais cara
          </p>
        </CardContent>
      </Card>

      {/* Comparação das 3 Opções */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {renderOpcaoCard(
          resultado.compraVista,
          'compraVista',
          resultado.melhorOpcao === 'compraVista'
        )}
        {renderOpcaoCard(
          resultado.financiamento,
          'financiamento',
          resultado.melhorOpcao === 'financiamento'
        )}
        {renderOpcaoCard(
          resultado.assinatura,
          'assinatura',
          resultado.melhorOpcao === 'assinatura'
        )}
      </div>

      {/* Links Úteis */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Links Úteis</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button variant="outline" className="w-full justify-start" asChild>
            <a
              href={resultado.urls.assinatura}
              target="_blank"
              rel="noopener noreferrer"
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              Simulador de Assinatura de Carros
            </a>
          </Button>
          <Button variant="outline" className="w-full justify-start" asChild>
            <a
              href={resultado.urls.financiamento}
              target="_blank"
              rel="noopener noreferrer"
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              Simulador de Financiamento de Veículos
            </a>
          </Button>
        </CardContent>
      </Card>

      {/* Observações */}
      <Card className="bg-gray-50">
        <CardContent className="pt-6">
          <div className="text-xs text-gray-600 space-y-2">
            <p>
              <strong>Observações importantes:</strong>
            </p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>
                Esta simulação considera custos médios e pode variar conforme o
                veículo e região
              </li>
              <li>
                O custo de oportunidade é calculado considerando o rendimento
                que o capital investido poderia gerar
              </li>
              <li>
                A depreciação varia muito conforme marca, modelo e estado de
                conservação do veículo
              </li>
              <li>
                Assinatura geralmente inclui seguro e manutenção, reduzindo
                custos adicionais
              </li>
              <li>
                Compare sempre as condições específicas oferecidas por cada
                fornecedor
              </li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
