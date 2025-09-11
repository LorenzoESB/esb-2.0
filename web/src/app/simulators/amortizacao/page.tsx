"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Calculator, TrendingDown, TrendingUp, Target } from "lucide-react";


interface LoanData {
    principal: number;
    monthlyRate: number;
    currentTerm: number;
    extraPayment: number;
    strategy: 'payment' | 'term';
}

interface AmortizationResult {
    originalPayment: number;
    originalTotalPaid: number;
    originalTotalInterest: number;
    newPayment: number;
    newTerm: number;
    newTotalPaid: number;
    newTotalInterest: number;
    savings: number;
    timeSaved: number;
}

export default function AmortizacaoSimulator() {
    const [formData, setFormData] = useState({
        loanValue: '',
        interestRate: '',
        loanTerm: '',
        extraPayment: '',
        strategy: 'payment' as 'payment' | 'term'
    });

    const [result, setResult] = useState<AmortizationResult | null>(null);

    const calculateAmortization = () => {
        const principal = parseFloat(formData.loanValue.replace(/\D/g, ''));
        const annualRate = parseFloat(formData.interestRate);
        const termYears = parseInt(formData.loanTerm);
        const extra = parseFloat(formData.extraPayment.replace(/\D/g, '')) || 0;

        if (!principal || !annualRate || !termYears) return;

        const monthlyRate = annualRate / 100 / 12;
        const termMonths = termYears * 12;

        // Original loan calculation
        const originalPayment = (principal * monthlyRate * Math.pow(1 + monthlyRate, termMonths)) / 
                               (Math.pow(1 + monthlyRate, termMonths) - 1);
        
        const originalTotalPaid = originalPayment * termMonths;
        const originalTotalInterest = originalTotalPaid - principal;

        let newPayment = originalPayment;
        let newTerm = termMonths;
        let newTotalPaid = originalTotalPaid;
        let newTotalInterest = originalTotalInterest;

        if (extra > 0) {
            if (formData.strategy === 'payment') {
                // Strategy: Reduce payment amount
                const newPrincipal = Math.max(0, principal - extra);
                if (newPrincipal > 0) {
                    newPayment = (newPrincipal * monthlyRate * Math.pow(1 + monthlyRate, termMonths)) / 
                                (Math.pow(1 + monthlyRate, termMonths) - 1);
                    newTotalPaid = newPayment * termMonths + extra;
                    newTotalInterest = newTotalPaid - principal;
                } else {
                    newPayment = 0;
                    newTerm = 0;
                    newTotalPaid = extra;
                    newTotalInterest = 0;
                }
            } else {
                // Strategy: Reduce term
                const paymentWithExtra = originalPayment + extra;
                
                // Calculate new term with extra payment
                if (paymentWithExtra > monthlyRate * principal) {
                    newTerm = Math.ceil(Math.log(1 + (principal * monthlyRate) / paymentWithExtra) / Math.log(1 + monthlyRate));
                    newTotalPaid = paymentWithExtra * newTerm;
                    newTotalInterest = newTotalPaid - principal;
                }
            }
        }

        const savings = originalTotalPaid - newTotalPaid;
        const timeSaved = termMonths - newTerm;

        setResult({
            originalPayment,
            originalTotalPaid,
            originalTotalInterest,
            newPayment,
            newTerm,
            newTotalPaid,
            newTotalInterest,
            savings,
            timeSaved
        });
    };

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(value);
    };

    const formatNumber = (value: string) => {
        const numbers = value.replace(/\D/g, '');
        return new Intl.NumberFormat('pt-BR').format(parseInt(numbers) || 0);
    };

    const handleCurrencyChange = (field: string, value: string) => {
        setFormData(prev => ({
            ...prev,
            [field]: formatNumber(value)
        }));
    };

    return (
        <div className="min-h-screen bg-background">
            {/* Header */}
            <section className="bg-muted/30 py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div className="flex items-center justify-center mb-6">
                        <Calculator className="w-8 h-8 text-primary mr-3" />
                        <h1 className="text-2xl sm:text-4xl font-bold text-foreground">
                            Simulador de Amortização
                        </h1>
                    </div>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        Compare estratégias de amortização e descubra a melhor forma de quitar seu empréstimo.
                    </p>
                </div>
            </section>

            <section className="py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Input Form */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Target className="w-5 h-5 text-primary" />
                                    Dados do Empréstimo
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="space-y-2">
                                    <Label htmlFor="loanValue">Valor do Empréstimo</Label>
                                    <Input
                                        id="loanValue"
                                        value={formData.loanValue}
                                        onChange={(e) => handleCurrencyChange('loanValue', e.target.value)}
                                        placeholder="R$ 100.000"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="interestRate">Taxa de Juros (% ao ano)</Label>
                                    <Input
                                        id="interestRate"
                                        type="number"
                                        step="0.01"
                                        value={formData.interestRate}
                                        onChange={(e) => setFormData(prev => ({...prev, interestRate: e.target.value}))}
                                        placeholder="12.5"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="loanTerm">Prazo (anos)</Label>
                                    <Input
                                        id="loanTerm"
                                        type="number"
                                        value={formData.loanTerm}
                                        onChange={(e) => setFormData(prev => ({...prev, loanTerm: e.target.value}))}
                                        placeholder="30"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="extraPayment">Valor Extra Disponível</Label>
                                    <Input
                                        id="extraPayment"
                                        value={formData.extraPayment}
                                        onChange={(e) => handleCurrencyChange('extraPayment', e.target.value)}
                                        placeholder="R$ 5.000"
                                    />
                                </div>

                                <div className="space-y-4">
                                    <Label>Estratégia de Amortização</Label>
                                    <div className="flex gap-4">
                                        <Button
                                            type="button"
                                            variant={formData.strategy === 'payment' ? 'default' : 'outline'}
                                            onClick={() => setFormData(prev => ({...prev, strategy: 'payment'}))}
                                            className="flex-1"
                                        >
                                            <TrendingDown className="w-4 h-4 mr-2" />
                                            Reduzir Parcela
                                        </Button>
                                        <Button
                                            type="button"
                                            variant={formData.strategy === 'term' ? 'default' : 'outline'}
                                            onClick={() => setFormData(prev => ({...prev, strategy: 'term'}))}
                                            className="flex-1"
                                        >
                                            <TrendingUp className="w-4 h-4 mr-2" />
                                            Reduzir Prazo
                                        </Button>
                                    </div>
                                </div>

                                <Button onClick={calculateAmortization} className="w-full" size="lg">
                                    <Calculator className="w-4 h-4 mr-2" />
                                    Calcular Amortização
                                </Button>
                            </CardContent>
                        </Card>

                        {/* Results */}
                        {result && (
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <TrendingUp className="w-5 h-5 text-green-600" />
                                        Comparativo de Estratégias
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="text-center p-4 bg-muted/50 rounded-lg">
                                            <p className="text-sm text-muted-foreground mb-1">Cenário Original</p>
                                            <p className="text-lg font-semibold">{formatCurrency(result.originalPayment)}</p>
                                            <p className="text-xs text-muted-foreground">parcela mensal</p>
                                        </div>
                                        <div className="text-center p-4 bg-primary/10 rounded-lg">
                                            <p className="text-sm text-muted-foreground mb-1">Com Amortização</p>
                                            <p className="text-lg font-semibold text-primary">{formatCurrency(result.newPayment)}</p>
                                            <p className="text-xs text-muted-foreground">parcela mensal</p>
                                        </div>
                                    </div>

                                    {result.savings > 0 && (
                                        <div className="space-y-4">
                                            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                                                <div className="flex items-center justify-between mb-2">
                                                    <span className="text-sm font-medium text-green-800">Economia Total</span>
                                                    <Badge className="bg-green-100 text-green-800 border-green-200">
                                                        {formatCurrency(result.savings)}
                                                    </Badge>
                                                </div>
                                                {formData.strategy === 'term' && result.timeSaved > 0 && (
                                                    <p className="text-sm text-green-700">
                                                        Você economizará {Math.floor(result.timeSaved / 12)} anos e {result.timeSaved % 12} meses
                                                    </p>
                                                )}
                                            </div>

                                            <div className="space-y-3">
                                                <div className="flex justify-between">
                                                    <span className="text-sm text-muted-foreground">Total pago (original):</span>
                                                    <span className="text-sm font-medium">{formatCurrency(result.originalTotalPaid)}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-sm text-muted-foreground">Total pago (com amortização):</span>
                                                    <span className="text-sm font-medium text-primary">{formatCurrency(result.newTotalPaid)}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-sm text-muted-foreground">Juros economizados:</span>
                                                    <span className="text-sm font-medium text-green-600">
                                                        {formatCurrency(result.originalTotalInterest - result.newTotalInterest)}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {formData.strategy === 'payment' ? (
                                        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                                            <h4 className="font-medium text-blue-800 mb-2">💡 Recomendação: Reduzir Parcela</h4>
                                            <p className="text-sm text-blue-700">
                                                Esta estratégia reduz o valor da parcela mensal, liberando dinheiro para outros investimentos ou gastos.
                                            </p>
                                        </div>
                                    ) : (
                                        <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                                            <h4 className="font-medium text-purple-800 mb-2">💡 Recomendação: Reduzir Prazo</h4>
                                            <p className="text-sm text-purple-700">
                                                Esta estratégia acelera a quitação do empréstimo, economizando mais em juros no longo prazo.
                                            </p>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        )}
                    </div>
                </div>
            </section>
            
            {/* Simple Footer */}
            <footer className="bg-muted/50 border-t border-border/50 py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <p className="text-muted-foreground">
                        © 2024 Educando Seu Bolso. Todos os direitos reservados.
                    </p>
                </div>
            </footer>
        </div>
    );
}