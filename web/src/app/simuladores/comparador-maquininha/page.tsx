'use client';
import { useAutoIframeHeight } from '@/lib/hooks/use-auto-iframe-height';

export default function ComparadorMaquininha() {
    // Auto-adjust iframe height
    useAutoIframeHeight([]);

    return (
        <div>
            Comparador de Maquininha
        </div>
    );
}