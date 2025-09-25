'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { JurosCompostosOutput } from '@/lib/schemas/juros-compostos.schema';
import { formatCurrency } from '@/utils/utils';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts';


interface JurosCompostosChartProps {
    data: JurosCompostosOutput;
}

export function JurosCompostosChart({ data }: JurosCompostosChartProps) {
    const chartData = data.detalhesMensais.filter((_, index) =>
        index === 0 || index % Math.ceil(data.detalhesMensais.length / 20) === 0 || index === data.detalhesMensais.length - 1
    ).map(mes => ({
        mes: `Mês ${mes.mes}`,
        valorInvestido: mes.valorInvestido,
        valorComJuros: mes.valorComJuros,
        jurosAcumulados: mes.jurosAcumulados,
    }));

    return (
        <Card>
            <CardHeader>
                <CardTitle>Evolução do Investimento</CardTitle>
            </CardHeader>
            <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="mes" />
                        <YAxis tickFormatter={(value) => `R$ ${(value / 1000).toFixed(0)}k`} />
                        <Tooltip formatter={(value: number) => formatCurrency(value)} />
                        <Legend />
                        <Line
                            type="monotone"
                            dataKey="valorInvestido"
                            stroke="#8884d8"
                            name="Valor Investido"
                            strokeWidth={2}
                        />
                        <Line
                            type="monotone"
                            dataKey="valorComJuros"
                            stroke="#82ca9d"
                            name="Valor Total"
                            strokeWidth={2}
                        />
                        <Line
                            type="monotone"
                            dataKey="jurosAcumulados"
                            stroke="#ffc658"
                            name="Juros Acumulados"
                            strokeWidth={2}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
}