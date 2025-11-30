"use client";

import { TrendingUp } from "lucide-react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { ResultadoAposentadoria } from "@/lib/schemas/aposentadoria.schema";
import {
  calcularDadosAcumulacao,
  formatarValorGrafico,
} from "@/lib/utils/aposentadoria-charts";

interface AcumulacaoChartProps {
  data: ResultadoAposentadoria;
}

export function AcumulacaoChart({ data }: AcumulacaoChartProps) {
  const chartData = calcularDadosAcumulacao(data);

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-4 rounded-lg border shadow-lg">
          <p className="font-bold text-sm mb-2">
            Ano {data.ano} - {data.idade} anos
          </p>
          <div className="space-y-1 text-xs">
            <p className="text-blue-600">
              Contribuicoes: {formatarValorGrafico(data.contribuicaoAcumulada)}
            </p>
            <p className="text-green-600">
              Rendimentos: {formatarValorGrafico(data.rendimentos)}
            </p>
            <p className="font-bold text-purple-600">
              Total: {formatarValorGrafico(data.saldoTotal)}
            </p>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5" />
          Evolucao da Acumulacao
        </CardTitle>
        <CardDescription>
          Crescimento do patrimonio durante {data.acumulacao.anosContribuicao}{" "}
          anos de contribuicao
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={chartData}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient
                  id="colorContribuicao"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1} />
                </linearGradient>
                <linearGradient
                  id="colorRendimentos"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0.1} />
                </linearGradient>
                <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                className="stroke-gray-200"
              />
              <XAxis
                dataKey="ano"
                label={{
                  value: "Anos de Contribuicao",
                  position: "insideBottom",
                  offset: -5,
                }}
                className="text-xs"
              />
              <YAxis tickFormatter={formatarValorGrafico} className="text-xs" />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ paddingTop: "20px" }} iconType="rect" />
              <Area
                type="monotone"
                dataKey="contribuicaoAcumulada"
                stackId="1"
                stroke="#3b82f6"
                fill="url(#colorContribuicao)"
                name="Contribuicoes"
              />
              <Area
                type="monotone"
                dataKey="rendimentos"
                stackId="1"
                stroke="#10b981"
                fill="url(#colorRendimentos)"
                name="Rendimentos"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 p-4 bg-purple-50 rounded-lg border border-purple-200">
          <p className="text-sm text-gray-600">Valor Total Acumulado</p>
          <p className="text-2xl font-bold text-purple-700">
            {formatarValorGrafico(data.acumulacao.valorTotalAcumulado)}
          </p>
          <p className="text-xs text-gray-500 mt-1">
            Aos {data.parametros.idadeAposentadoria} anos
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
