'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { JurosCompostosOutput } from '@/lib/schemas/juros-compostos.schema';
import { formatCurrency } from '@/utils/utils';

import { TrendingUp, DollarSign, Percent } from 'lucide-react';

interface JurosCompostosResultsProps {
    data: JurosCompostosOutput;
}

export function JurosCompostosResults({ data }: JurosCompostosResultsProps) {
    const { resumo, detalhesMensais } = data;

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                    <CardHeader className="pb-3">
                        <CardTitle className="text-sm font-medium flex items-center gap-2">
                            <DollarSign className="h-4 w-4" />
                            Valor Final
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{formatCurrency(resumo.valorTotalFinalBruto)}</div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="pb-3">
                        <CardTitle className="text-sm font-medium flex items-center gap-2">
                            <TrendingUp className="h-4 w-4" />
                            Total Investido
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{formatCurrency(resumo.totalInvestido)}</div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="pb-3">
                        <CardTitle className="text-sm font-medium flex items-center gap-2">
                            <Percent className="h-4 w-4" />
                            Juros Ganhos
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-green-600">
                            {formatCurrency(resumo.totalEmJurosBruto)}
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Card defaultValue="table" className="w-full">
                <CardHeader>
                    <CardTitle>Resumo do Investimento</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex justify-between">
                        <span className="text-gray-500">Valor Final:</span>
                        <span className="font-bold">{formatCurrency(resumo.valorTotalFinalBruto)}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-500">Total Investido:</span>
                        <span className="font-bold">{formatCurrency(resumo.totalInvestido)}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-500">Total em Juros:</span>
                        <span className="font-bold text-green-600">
                            {formatCurrency(resumo.totalEmJurosBruto)}
                        </span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-500">Rentabilidade:</span>
                        <span className="font-bold text-green-600">
                            {((resumo.totalEmJurosBruto / resumo.totalInvestido) * 100).toFixed(2)}%
                        </span>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}