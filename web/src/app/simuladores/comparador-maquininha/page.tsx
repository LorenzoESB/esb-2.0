'use client';

import { useAutoIframeHeight } from '@/lib/hooks/use-auto-iframe-height';
import { useComparadorMaquininha } from '@/lib/hooks/use-comparador-maquininha';
import { ComparadorForm } from '@/components/simuladores/comparador-maquininha/comparador-form';
import { ComparadorResults } from '@/components/simuladores/comparador-maquininha/comparador-results';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';

export default function ComparadorMaquininha() {
  const { data, isLoading, error, comparar } = useComparadorMaquininha();

  // Auto-adjust iframe height whenever data changes
  useAutoIframeHeight([data]);

  return (
    <div className="container mx-auto py-8 px-4 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Comparador de Maquininhas de Cartão
        </h1>
        <p className="text-gray-600">
          Compare lado a lado as características, taxas e planos das principais
          maquininhas do mercado
        </p>
      </div>

      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="space-y-8">
        <ComparadorForm onSubmit={comparar} isLoading={isLoading} />

        {data && <ComparadorResults resultado={data} />}
      </div>
    </div>
  );
}