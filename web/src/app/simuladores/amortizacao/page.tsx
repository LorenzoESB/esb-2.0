'use client';
import { AmortizacaoSacChart } from '@/components/simuladores/amortizacao/amortizacao-chart';
import { AmortizacaoSacForm } from '@/components/simuladores/amortizacao/amortizacao-form';
import { AmortizacaoSacResults } from '@/components/simuladores/amortizacao/amortizacao-results';
import { Skeleton } from '@/components/ui/skeleton';
import { useAmortizacaoSac } from '@/lib/hooks/use-amortizacao';

export default function AmortizacaoSacPage() {
    const { data, isLoading, simular } = useAmortizacaoSac();

    return (
        <div className="container mx-auto py-8 space-y-8">
            <div className="text-center space-y-2">
                <h1 className="text-4xl font-bold">Simulador de Amortização SAC</h1>
                <p className="text-gray-600">
                    Calcule o impacto de amortizações extraordinárias no seu financiamento
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                    <AmortizacaoSacForm
                        onSubmit={async (input) => {
                            await simular(input);
                        }}
                        isLoading={isLoading}
                    />
                </div>

                <div className="space-y-6">
                    {isLoading && (
                        <div className="space-y-4">
                            <Skeleton className="h-48 w-full" />
                            <Skeleton className="h-96 w-full" />
                        </div>
                    )}

                    {data && !isLoading && (
                        <>
                            <AmortizacaoSacResults data={data} />
                            <AmortizacaoSacChart data={data} />
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}