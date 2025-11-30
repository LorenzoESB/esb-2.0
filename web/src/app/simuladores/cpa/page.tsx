'use client';
import { useAutoIframeHeight } from '@/lib/hooks/use-auto-iframe-height';

export default function ComparadorDeCarrosPorAssinatura() {
    // Auto-adjust iframe height
    useAutoIframeHeight([]);

    return (
        <div>
            Simulador de Comparador de Carros por Assinatura
        </div>
    );
}