'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ResultadoAposentadoria } from '@/lib/schemas/aposentadoria.schema';
import { formatCurrency } from '@/utils/utils';
import { TrendingUp, Wallet, Target, PiggyBank, Shield, Calculator } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { AcumulacaoChart } from './acumulacao-chart';
import { UsufrutoChart } from './usufruto-chart';

interface AposentadoriaResultsProps {
    data: ResultadoAposentadoria;
}

export function AposentadoriaResults({ data }: AposentadoriaResultsProps) {
    const { parametros, acumulacao, usufruto, sustentabilidade, resumo } = data;

    return (
        <div className="space-y-6">
            {/* Detalhes em abas - PRIMEIRO ITEM */}
            <Tabs defaultValue="acumulacao" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="acumulacao">Acumulacao</TabsTrigger>
                    <TabsTrigger value="usufruto">Usufruto</TabsTrigger>
                    <TabsTrigger value="sustentabilidade">Sustentabilidade</TabsTrigger>
                </TabsList>

                <TabsContent value="acumulacao">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <PiggyBank className="h-5 w-5" />
                                Fase de Acumulacao
                            </CardTitle>
                            <CardDescription>
                                Periodo: {acumulacao.anosContribuicao} anos ({acumulacao.mesesContribuicao} meses)
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-6">
                                <div className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
                                    <p className="text-4xl font-bold text-blue-600">
                                        {formatCurrency(acumulacao.contribuicaoMensal)}
                                    </p>
                                    <p className="text-sm text-gray-600 mt-2">
                                        Contribuicao mensal necessaria
                                    </p>
                                </div>
                                <div className="p-4 border-2 border-green-200 bg-green-50 rounded-lg">
                                    <p className="text-sm text-green-700 font-medium">Total Acumulado</p>
                                    <p className="text-3xl font-bold text-green-700">
                                        {formatCurrency(acumulacao.valorTotalAcumulado)}
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="usufruto">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Wallet className="h-5 w-5" />
                                Fase de Usufruto
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200">
                                <p className="text-4xl font-bold text-green-600">
                                    {formatCurrency(usufruto.rendaMensal)}
                                </p>
                                <p className="text-sm text-gray-600 mt-2">
                                    Renda mensal na aposentadoria
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="sustentabilidade">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Shield className="h-5 w-5" />
                                Projeção de Sustentabilidade
                            </CardTitle>
                            <CardDescription>
                                Análise de diferentes cenários de saque do patrimônio acumulado
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            {sustentabilidade.cenarios && sustentabilidade.cenarios.length > 0 ? (
                                <div className="space-y-4">
                                    {sustentabilidade.cenarios.map((cenario, index) => (
                                        <div
                                            key={index}
                                            className="p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                                        >
                                            <div className="flex items-start justify-between mb-2">
                                                <div>
                                                    <p className="font-semibold text-gray-900">
                                                        Saque Mensal: {formatCurrency(cenario.valorSaqueMensal)}
                                                    </p>
                                                    <p className="text-sm text-gray-600 mt-1">
                                                        {cenario.observacao}
                                                    </p>
                                                </div>
                                                <Badge
                                                    variant={cenario.consumePrincipal ? "destructive" : "default"}
                                                    className="ml-2"
                                                >
                                                    {cenario.consumePrincipal ? "Consome Capital" : "Sustentável"}
                                                </Badge>
                                            </div>
                                            {cenario.duracaoAnos > 0 && (
                                                <div className="mt-2 pt-2 border-t">
                                                    <p className="text-sm text-gray-600">
                                                        Duração: <span className="font-medium">{cenario.duracaoAnos} anos</span>
                                                    </p>
                                                    <p className="text-sm text-gray-600">
                                                        Saldo Final: <span className="font-medium">{formatCurrency(cenario.saldoFinal)}</span>
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-gray-500 text-center py-8">
                                    Nenhum cenário de sustentabilidade disponível.
                                    Marque a opção "Incluir cenários de saque" para visualizar esta análise.
                                </p>
                            )}
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>

            {/* Resumo do Seu Planejamento */}
            <Card className="border-blue-200 bg-blue-50">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Target className="h-5 w-5 text-blue-600" />
                        Resumo do Seu Planejamento
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                            <p className="text-sm text-gray-600">Total Investido</p>
                            <p className="text-2xl font-bold text-gray-900">
                                {formatCurrency(resumo.totalInvestido)}
                            </p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-600">Total a Receber</p>
                            <p className="text-2xl font-bold text-green-600">
                                {formatCurrency(resumo.totalRecebido)}
                            </p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-600">Ganho Patrimonial</p>
                            <p className="text-2xl font-bold text-blue-600">
                                {formatCurrency(resumo.saldoPatrimonial)}
                            </p>
                            <p className="text-xs text-gray-500 mt-1">
                                {((resumo.saldoPatrimonial / resumo.totalInvestido) * 100).toFixed(1)}% de retorno
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Graficos principais */}
            <div className="grid grid-cols-1 gap-6">
                <AcumulacaoChart data={data} />
                <UsufrutoChart data={data} />
            </div>
        </div>
    );
}
