'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

import { Calculator, Home } from 'lucide-react';
import { AmortizacaoSacInput, AmortizacaoSacInputSchema } from '@/lib/schemas/amortizacao.schema';


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
            amortizacaoExtraordinaria: 0,
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
                    Simulador de Amortização SAC
                </CardTitle>
                <CardDescription>
                    Calcule o impacto de amortizações extraordinárias no seu financiamento
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="saldoDevedorAtual"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Saldo Devedor Atual (R$)</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                placeholder="128000"
                                                {...field}
                                                onChange={(e) => field.onChange(parseFloat(e.target.value))}
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
                                        <FormLabel>Amortização Extraordinária (R$)</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                placeholder="22000"
                                                {...field}
                                                onChange={(e) => field.onChange(parseFloat(e.target.value))}
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
                                        <FormLabel>Amortização Mensal Atual (R$)</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                step="0.01"
                                                placeholder="355.56"
                                                {...field}
                                                onChange={(e) => field.onChange(parseFloat(e.target.value))}
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
                                                type="number"
                                                step="0.01"
                                                placeholder="40"
                                                {...field}
                                                onChange={(e) => field.onChange(parseFloat(e.target.value))}
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
                                                type="number"
                                                step="0.01"
                                                placeholder="25"
                                                {...field}
                                                onChange={(e) => field.onChange(parseFloat(e.target.value))}
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
                                                type="number"
                                                step="0.1"
                                                placeholder="9.0"
                                                {...field}
                                                onChange={(e) => field.onChange(parseFloat(e.target.value))}
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