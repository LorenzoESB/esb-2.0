'use client';

import { AposentadoriaForm } from '@/components/simuladores/aposentadoria/aposentadoria-form';
import { AposentadoriaResults } from '@/components/simuladores/aposentadoria/aposentadoria-results';
import { Skeleton } from '@/components/ui/skeleton';
import { useAposentadoria } from '@/lib/hooks/use-aposentadoria';

export default function AposentadoriaPrivadaPage() {
    const { data, isLoading, simular } = useAposentadoria();

    return (
        <div className="container mx-auto py-8 space-y-8">
            <div className="text-center space-y-2">
                <h1 className="text-4xl font-bold">Simulador de Aposentadoria Privada</h1>
                <p className="text-gray-600">
                    Planeje sua aposentadoria e descubra quanto precisa investir mensalmente
                </p>
            </div>

            <div className="max-w-5xl mx-auto space-y-8">
                <AposentadoriaForm
                    onSubmit={async (input) => {
                        await simular(input);
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
                        <AposentadoriaResults data={data} />
                    </div>
                )}
            </div>
        </div>
    );
}
