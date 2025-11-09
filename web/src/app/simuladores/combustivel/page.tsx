'use client';
import { CombustivelForm } from "@/components/simuladores/combustivel/combustivel-form";
import { useCombustivel } from "@/lib/hooks/use-combustivel";

export default function Combustivel() {
    const { data, isLoading, calcular } = useCombustivel();
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
                </div>
            </div>
        </div>
    );
}