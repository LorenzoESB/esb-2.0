'use client';
import { CombustivelForm } from "@/components/simuladores/combustivel/combustivel-form";
import { CombustivelResults } from "@/components/simuladores/combustivel/combustivel-results";
import { Skeleton } from "@/components/ui/skeleton";
import { useCombustivel } from "@/lib/hooks/use-combustivel";
import { useAutoIframeHeight } from '@/lib/hooks/use-auto-iframe-height';

export default function Combustivel() {
    const { data, isLoading, calcular } = useCombustivel();

    // Auto-adjust iframe height when data or loading state changes
    useAutoIframeHeight([data, isLoading], { delay: 100 });
    return (
        <div className="container mx-auto py-4 sm:py-8 px-4 space-y-6 sm:space-y-8">
            <div className="text-center space-y-2">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">
                    Calculadora de Combustível
                </h1>
                <p className="text-sm sm:text-base text-gray-600">
                    Compare o custo-benefício entre gasolina e etanol
                </p>
            </div>

            <div className="flex flex-col gap-8 sm:gap-12">
                <div className="space-y-4">
                    <CombustivelForm
                        onSubmit={async (input) => {
                            await calcular(input);
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
                            <CombustivelResults data={data} />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}