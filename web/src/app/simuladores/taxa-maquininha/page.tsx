'use client';
import { useAutoIframeHeight } from '@/lib/hooks/use-auto-iframe-height';

export default function TaxaMaquininha() {
    // Auto-adjust iframe height
    useAutoIframeHeight([]);

    return (
        <div>
            Comparador de Taxa Maquininha
        </div>
    );
}