"use client";

import { AlertTriangle, CheckCircle2, Clock } from "lucide-react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { ResultadoAposentadoria } from "@/lib/schemas/aposentadoria.schema";
import {
  calcularDadosUsufruto,
  formatarValorGrafico,
} from "@/lib/utils/aposentadoria-charts";

interface UsufrutoChartProps {
  data: ResultadoAposentadoria;
}

export function UsufrutoChart({ data }: UsufrutoChartProps) {
  const chartData = calcularDadosUsufruto(data);
  const ultimoDado = chartData[chartData.length - 1];
  const saldoEsgotado = ultimoDado.saldo === 0;
  const anoEsgotamento = saldoEsgotado ? ultimoDado.ano : null;
  const idadeEsgotamento = saldoEsgotado ? ultimoDado.idade : null;

  // Verifica se e sustentavel (nao consome o principal)
  const rendimentoMensalPuro = data.sustentabilidade.rendimentoMensalPuro;
  const rendaMensal = data.usufruto.rendaMensal;
  const isSustentavel = rendaMensal <= rendimentoMensalPuro;

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
              Saldo: {formatarValorGrafico(data.saldo)}
            </p>
            <p className="text-gray-600">
              Saque mensal: {formatarValorGrafico(data.rendaMensal)}
            </p>
            <p className="font-semibold">
              Status:{" "}
              <span
                className={
                  data.tipo === "Sustentavel"
                    ? "text-green-600"
                    : data.tipo === "Com Principal"
                      ? "text-orange-600"
                      : "text-red-600"
                }
              >
                {data.tipo}
              </span>
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
          <Clock className="h-5 w-5" />
          Projecao de Sustentabilidade
        </CardTitle>
        <CardDescription>
          Evolucao do saldo durante a aposentadoria
        </CardDescription>
      </CardHeader>
      <CardContent>
        {/* Status da sustentabilidade */}
        <div className="mb-6 space-y-3">
          {isSustentavel ? (
            <div className="flex items-start gap-3 p-4 bg-green-50 border border-green-200 rounded-lg">
              <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5" />
              <div>
                <p className="font-semibold text-green-900">
                  Aposentadoria Sustentavel
                </p>
                <p className="text-sm text-green-700 mt-1">
                  A renda mensal de {formatarValorGrafico(rendaMensal)} esta
                  dentro do rendimento puro de{" "}
                  {formatarValorGrafico(rendimentoMensalPuro)}. Seu patrimonio
                  nao sera consumido e pode durar indefinidamente.
                </p>
              </div>
            </div>
          ) : saldoEsgotado ? (
            <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-lg">
              <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5" />
              <div>
                <p className="font-semibold text-red-900">
                  Patrimonio se Esgotara
                </p>
                <p className="text-sm text-red-700 mt-1">
                  Com a renda mensal de {formatarValorGrafico(rendaMensal)}, seu
                  patrimonio se esgotara em aproximadamente{" "}
                  <strong>{anoEsgotamento} anos</strong>, quando voce tiver{" "}
                  <strong>{idadeEsgotamento} anos</strong>.
                </p>
              </div>
            </div>
          ) : (
            <div className="flex items-start gap-3 p-4 bg-orange-50 border border-orange-200 rounded-lg">
              <AlertTriangle className="h-5 w-5 text-orange-600 mt-0.5" />
              <div>
                <p className="font-semibold text-orange-900">
                  Consumindo o Principal
                </p>
                <p className="text-sm text-orange-700 mt-1">
                  A renda mensal de {formatarValorGrafico(rendaMensal)} excede o
                  rendimento puro de{" "}
                  {formatarValorGrafico(rendimentoMensalPuro)}. Voce esta
                  consumindo o principal. O grafico mostra ate{" "}
                  {chartData.length - 1} anos de projecao.
                </p>
              </div>
            </div>
          )}

          {/* Badges informativos */}
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className="bg-blue-50">
              Saldo inicial:{" "}
              {formatarValorGrafico(data.acumulacao.valorTotalAcumulado)}
            </Badge>
            <Badge variant="outline" className="bg-green-50">
              Renda mensal: {formatarValorGrafico(rendaMensal)}
            </Badge>
            <Badge variant="outline" className="bg-purple-50">
              Rendimento puro: {formatarValorGrafico(rendimentoMensalPuro)}
            </Badge>
          </div>
        </div>

        {/* Grafico */}
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={chartData}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorSaldo" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                className="stroke-gray-200"
              />
              <XAxis
                dataKey="ano"
                label={{
                  value: "Anos de Aposentadoria",
                  position: "insideBottom",
                  offset: -5,
                }}
                className="text-xs"
              />
              <YAxis tickFormatter={formatarValorGrafico} className="text-xs" />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ paddingTop: "20px" }} iconType="rect" />
              {/* Linha de referencia para o saldo inicial */}
              <ReferenceLine
                y={data.acumulacao.valorTotalAcumulado}
                stroke="#8b5cf6"
                strokeDasharray="3 3"
                label={{
                  value: "Saldo Inicial",
                  position: "right",
                  fill: "#8b5cf6",
                }}
              />
              <Area
                type="monotone"
                dataKey="saldo"
                stroke="#3b82f6"
                fill="url(#colorSaldo)"
                name="Saldo Disponivel"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Informacoes adicionais */}
        {saldoEsgotado && (
          <div className="mt-4 p-4 bg-red-50 rounded-lg border border-red-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-red-900">
                  Tempo ate Esgotamento
                </p>
                <p className="text-xs text-red-700 mt-1">
                  O patrimonio sera consumido completamente
                </p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-red-700">
                  {anoEsgotamento} anos
                </p>
                <p className="text-xs text-red-600">
                  Ate os {idadeEsgotamento} anos
                </p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
