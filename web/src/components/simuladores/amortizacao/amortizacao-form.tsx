'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

import { Calculator, Home } from 'lucide-react';
import { AmortizacaoSacInput, AmortizacaoSacInputSchema } from '@/lib/schemas/amortizacao.schema';
import { formatCurrency, parseCurrency, maskCurrency } from '@/lib/utils/input-masks';


interface AmortizacaoSacFormProps {
    onSubmit: (data: AmortizacaoSacInput) => Promise<void>;
    isLoading?: boolean;
}

export function AmortizacaoSacForm({ onSubmit, isLoading }: AmortizacaoSacFormProps) {
    const form = useForm<AmortizacaoSacInput>({
        resolver: zodResolver(AmortizacaoSacInputSchema),
        defaultValues: {
            saldoDevedorAtual: 128000,
            amortizacaoMensalAtual: 355.56,
            taxaJurosAnual: 9.0,
            prazoOperacaoMeses: 360,
            numeroParcela: 28,
            valorSeguroMensal: 40,
            taxaAdministracaoMensal: 25,
            amortizacaoExtraordinaria: 22000,
            nome: '',
            email: '',
        },
    });

    const handleSubmit = async (data: AmortizacaoSacInput) => {
        await onSubmit(data);
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Home className="h-5 w-5" />
                    Simulador de Amortização
                </CardTitle>
                <CardDescription>
                    Calcule o impacto de amortizações extraordinárias no seu financiamento
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            form.handleSubmit(handleSubmit)(e);
                        }}
                        className="space-y-6"
                    >
                        {/* Dados Pessoais */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="nome"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Nome Completo</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="text"
                                                placeholder="Seu nome completo"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>E-mail</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="email"
                                                placeholder="seu@email.com"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="saldoDevedorAtual"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Saldo Devedor Atual</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="text"
                                                placeholder="R$ 128.000,00"
                                                value={field.value ? formatCurrency(field.value) : ''}
                                                onChange={(e) => {
                                                    const masked = maskCurrency(e.target.value);
                                                    const numericValue = parseCurrency(masked);
                                                    field.onChange(numericValue);
                                                }}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="amortizacaoExtraordinaria"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Amortização Extraordinária</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="text"
                                                placeholder="R$ 22.000,00"
                                                value={field.value ? formatCurrency(field.value) : ''}
                                                onChange={(e) => {
                                                    const masked = maskCurrency(e.target.value);
                                                    const numericValue = parseCurrency(masked);
                                                    field.onChange(numericValue);
                                                }}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="amortizacaoMensalAtual"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Amortização Mensal Atual</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="text"
                                                placeholder="R$ 355,56"
                                                value={field.value ? formatCurrency(field.value) : ''}
                                                onChange={(e) => {
                                                    const masked = maskCurrency(e.target.value);
                                                    const numericValue = parseCurrency(masked);
                                                    field.onChange(numericValue);
                                                }}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="valorSeguroMensal"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Valor do Seguro Mensal (R$)</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="text"
                                                placeholder="R$ 40,00"
                                                value={(field.value ?? 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                                                onChange={(e) => {
                                                    const numericValue = e.target.value.replace(/\D/g, '');
                                                    field.onChange(parseFloat(numericValue) / 100 || 0);
                                                }}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="taxaAdministracaoMensal"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Taxa de Administração Mensal (R$)</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="text"
                                                placeholder="R$ 25,00"
                                                value={(field.value ?? 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                                                onChange={(e) => {
                                                    const numericValue = e.target.value.replace(/\D/g, '');
                                                    field.onChange(parseFloat(numericValue) / 100 || 0);
                                                }}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="prazoOperacaoMeses"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Prazo da Operação (meses)</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                placeholder="360"
                                                {...field}
                                                onChange={(e) => field.onChange(parseInt(e.target.value))}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="taxaJurosAnual"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Taxa de Juros Anual (%)</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="text"
                                                placeholder="9,0 %"
                                                value={`${new Intl.NumberFormat('pt-BR', { minimumFractionDigits: 0, maximumFractionDigits: 2 }).format(field.value ?? 0)} %`}
                                                onChange={(e) => {
                                                    const raw = String(e.target.value).replace(/[^0-9,.-]/g, '').replace(',', '.');
                                                    const parsed = parseFloat(raw);
                                                    field.onChange(Number.isFinite(parsed) ? parsed : 0);
                                                }}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="numeroParcela"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Número da Parcela Atual</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                placeholder="28"
                                                {...field}
                                                onChange={(e) => field.onChange(parseInt(e.target.value))}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <Button type="submit" className="w-full" disabled={isLoading}>
                            {isLoading ? (
                                'Simulando...'
                            ) : (
                                <>
                                    <Calculator className="mr-2 h-4 w-4" />
                                    Simular
                                </>
                            )}
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}