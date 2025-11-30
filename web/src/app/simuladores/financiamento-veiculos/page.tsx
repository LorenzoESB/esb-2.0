'use client';
import { useAutoIframeHeight } from '@/lib/hooks/use-auto-iframe-height';

export default function FinanciamentoVeiculos() {
    // Auto-adjust iframe height
    useAutoIframeHeight([]);

    return (
        <div>
            Simulador de Financiamento de Veículos
        </div>
    );
}