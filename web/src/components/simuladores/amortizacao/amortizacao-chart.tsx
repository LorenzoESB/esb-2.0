'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
    LineChart,
    Line,
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts';
import { formatCurrency } from '@/utils/utils';
import { AmortizacaoSacOutput } from '@/lib/schemas/amortizacao.schema';

interface AmortizacaoSacChartProps {
    data: AmortizacaoSacOutput;
}

export function AmortizacaoSacChart({ data }: AmortizacaoSacChartProps) {
    const { situacaoAtual, amortizacaoPorPrazo, amortizacaoPorPrestacao } = data;

    const prepareChartData = (grafico: any) => {
        return grafico.labels.map((label: string, index: number) => ({
            mes: label,
            saldoDevedor: grafico.saldoDevedor[index],
            amortizacao: grafico.amortizacao[index],
            juros: grafico.juros[index],
            prestacao: grafico.prestacao[index],
        }));
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Gráficos de Progressão</CardTitle>
            </CardHeader>
            <CardContent>
                <Tabs defaultValue="atual" className="w-full">
                    <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="atual">Situação Atual</TabsTrigger>
                        {amortizacaoPorPrazo && <TabsTrigger value="prazo">Por Prazo</TabsTrigger>}
                        {amortizacaoPorPrestacao && <TabsTrigger value="prestacao">Por Prestação</TabsTrigger>}
                    </TabsList>

                    <TabsContent value="atual">
                        <ResponsiveContainer width="100%" height={300}>
                            <AreaChart data={prepareChartData(situacaoAtual.graficoProgressao)}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="mes" />
                                <YAxis tickFormatter={(value) => `R$ ${(value / 1000).toFixed(0)}k`} />
                                <Tooltip formatter={(value: number) => formatCurrency(value)} />
                                <Legend />
                                <Area
                                    type="monotone"
                                    dataKey="saldoDevedor"
                                    stackId="1"
                                    stroke="#8884d8"
                                    fill="#8884d8"
                                    name="Saldo Devedor"
                                />
                                <Area
                                    type="monotone"
                                    dataKey="amortizacao"
                                    stackId="2"
                                    stroke="#82ca9d"
                                    fill="#82ca9d"
                                    name="Amortização"
                                />
                                <Area
                                    type="monotone"
                                    dataKey="juros"
                                    stackId="2"
                                    stroke="#ffc658"
                                    fill="#ffc658"
                                    name="Juros"
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </TabsContent>

                    {amortizacaoPorPrazo && (
                        <TabsContent value="prazo">
                            <ResponsiveContainer width="100%" height={300}>
                                <LineChart data={prepareChartData(amortizacaoPorPrazo.graficoProgressao)}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="mes" />
                                    <YAxis tickFormatter={(value) => `R$ ${(value / 1000).toFixed(0)}k`} />
                                    <Tooltip formatter={(value: number) => formatCurrency(value)} />
                                    <Legend />
                                    <Line
                                        type="monotone"
                                        dataKey="saldoDevedor"
                                        stroke="#8884d8"
                                        name="Saldo Devedor"
                                        strokeWidth={2}
                                    />
                                    <Line
                                        type="monotone"
                                        dataKey="prestacao"
                                        stroke="#82ca9d"
                                        name="Prestação"
                                        strokeWidth={2}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </TabsContent>
                    )}

                    {amortizacaoPorPrestacao && (
                        <TabsContent value="prestacao">
                            <ResponsiveContainer width="100%" height={300}>
                                <LineChart data={prepareChartData(amortizacaoPorPrestacao.graficoProgressao)}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="mes" />
                                    <YAxis tickFormatter={(value) => `R$ ${(value / 1000).toFixed(0)}k`} />
                                    <Tooltip formatter={(value: number) => formatCurrency(value)} />
                                    <Legend />
                                    <Line
                                        type="monotone"
                                        dataKey="saldoDevedor"
                                        stroke="#8884d8"
                                        name="Saldo Devedor"
                                        strokeWidth={2}
                                    />
                                    <Line
                                        type="monotone"
                                        dataKey="prestacao"
                                        stroke="#82ca9d"
                                        name="Prestação"
                                        strokeWidth={2}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </TabsContent>
                    )}
                </Tabs>
            </CardContent>
        </Card>
    );
}