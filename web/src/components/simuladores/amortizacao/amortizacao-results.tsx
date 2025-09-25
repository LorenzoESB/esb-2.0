'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AmortizacaoSacOutput } from '@/lib/schemas/amortizacao.schema';
import { formatCurrency } from '@/utils/utils';
import { Clock, DollarSign, TrendingDown } from 'lucide-react';

interface AmortizacaoSacResultsProps {
    data: AmortizacaoSacOutput;
}

export function AmortizacaoSacResults({ data }: AmortizacaoSacResultsProps) {
    const { situacaoAtual, amortizacaoPorPrazo, amortizacaoPorPrestacao } = data;

    return (
        <div className="space-y-6">
            {/* Current Situation */}
            <Card>
                <CardHeader>
                    <CardTitle>Situação Atual</CardTitle>
                    <CardDescription>
                        Informações do seu financiamento sem amortização extraordinária
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <p className="text-sm text-gray-500">Prestação Atual</p>
                            <p className="text-xl font-bold">{formatCurrency(situacaoAtual.prestacaoAtual)}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Prazo Restante</p>
                            <p className="text-xl font-bold">{situacaoAtual.prazoRestanteAtual} meses</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Saldo Devedor</p>
                            <p className="text-xl font-bold">{formatCurrency(situacaoAtual.saldoDevedorAtual)}</p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Amortization Options */}
            {(amortizacaoPorPrazo || amortizacaoPorPrestacao) && (
                <Tabs defaultValue="prazo" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="prazo">Amortização por Prazo</TabsTrigger>
                        <TabsTrigger value="prestacao">Amortização por Prestação</TabsTrigger>
                    </TabsList>

                    {amortizacaoPorPrazo && (
                        <TabsContent value="prazo">
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Clock className="h-5 w-5" />
                                        Amortização por Prazo
                                    </CardTitle>
                                    <CardDescription>
                                        Mantém o valor da parcela e reduz o prazo do financiamento
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-4">
                                            <div>
                                                <p className="text-sm text-gray-500">Nova Prestação</p>
                                                <p className="text-2xl font-bold">
                                                    {formatCurrency(amortizacaoPorPrazo.novaPrestacao)}
                                                </p>
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-500">Prazo Restante</p>
                                                <p className="text-xl font-semibold">
                                                    {amortizacaoPorPrazo.prazoRestante} meses
                                                </p>
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-500">Saldo Devedor</p>
                                                <p className="text-xl font-semibold">
                                                    {formatCurrency(amortizacaoPorPrazo.saldoDevedor)}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="space-y-4">
                                            <div className="p-4 bg-green-50 rounded-lg">
                                                <p className="text-sm text-green-700">Economia de Juros</p>
                                                <p className="text-2xl font-bold text-green-700">
                                                    {formatCurrency(amortizacaoPorPrazo.economiaJuros)}
                                                </p>
                                            </div>
                                            <div className="p-4 bg-blue-50 rounded-lg">
                                                <p className="text-sm text-blue-700">Redução no Prazo</p>
                                                <p className="text-2xl font-bold text-blue-700">
                                                    {amortizacaoPorPrazo.reducaoPrazo} meses
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>
                    )}

                    {amortizacaoPorPrestacao && (
                        <TabsContent value="prestacao">
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <DollarSign className="h-5 w-5" />
                                        Amortização por Prestação
                                    </CardTitle>
                                    <CardDescription>
                                        Mantém o prazo e reduz o valor da parcela mensal
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-4">
                                            <div>
                                                <p className="text-sm text-gray-500">Nova Prestação</p>
                                                <p className="text-2xl font-bold">
                                                    {formatCurrency(amortizacaoPorPrestacao.novaPrestacao)}
                                                </p>
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-500">Prazo Restante</p>
                                                <p className="text-xl font-semibold">
                                                    {amortizacaoPorPrestacao.prazoRestante} meses
                                                </p>
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-500">Saldo Devedor</p>
                                                <p className="text-xl font-semibold">
                                                    {formatCurrency(amortizacaoPorPrestacao.saldoDevedor)}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="space-y-4">
                                            <div className="p-4 bg-green-50 rounded-lg">
                                                <p className="text-sm text-green-700">Economia de Juros</p>
                                                <p className="text-2xl font-bold text-green-700">
                                                    {formatCurrency(amortizacaoPorPrestacao.economiaJuros)}
                                                </p>
                                            </div>
                                            <div className="p-4 bg-orange-50 rounded-lg">
                                                <p className="text-sm text-orange-700">Redução na Prestação</p>
                                                <p className="text-2xl font-bold text-orange-700">
                                                    {formatCurrency(amortizacaoPorPrestacao.reducaoPrestacao)}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>
                    )}
                </Tabs>
            )}
        </div>
    );
}