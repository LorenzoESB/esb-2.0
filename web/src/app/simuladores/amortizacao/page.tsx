'use client';
import { AmortizacaoSacChart } from '@/components/simuladores/amortizacao/amortizacao-chart';
import { AmortizacaoSacForm } from '@/components/simuladores/amortizacao/amortizacao-form';
import { AmortizacaoSacResults } from '@/components/simuladores/amortizacao/amortizacao-results';
import { Skeleton } from '@/components/ui/skeleton';
import { useAmortizacaoSac } from '@/lib/hooks/use-amortizacao';

export default function AmortizacaoSacPage() {
    const { data, isLoading, comparar } = useAmortizacaoSac();

    return (
        <div className="container mx-auto py-8 space-y-8">
            <div className="text-center space-y-2">
                <h1 className="text-4xl font-bold">Simulador de Amortização</h1>
                <p className="text-gray-600">
                    Calcule o impacto de amortizações extraordinárias no seu financiamento
                </p>
            </div>

            <div className="max-w-3xl mx-auto space-y-8">
                <AmortizacaoSacForm
                    onSubmit={async (input) => {
                        await comparar(input);
                    }}
                    isLoading={isLoading}
                />

                {isLoading && (
                    <div className="space-y-4">
                        <Skeleton className="h-48 w-full" />
                        <Skeleton className="h-96 w-full" />
                    </div>
                )}

                {data && !isLoading && (
                    <div className="space-y-6">
                        <AmortizacaoSacResults data={data} />
                    </div>
                )}
            </div>
        </div>
    );
}