'use client';
import { useAutoIframeHeight } from '@/lib/hooks/use-auto-iframe-height';

export default function Investimentos() {
    // Auto-adjust iframe height
    useAutoIframeHeight([]);

    return (
        <div>
            Simulador de Investimentos
        </div>
    );
}