'use client';
import { useAutoIframeHeight } from '@/lib/hooks/use-auto-iframe-height';

export default function SimuladorDeEmprestimo() {
    // Auto-adjust iframe height
    useAutoIframeHeight([]);

    return (
        <div>
            Simulador de Empréstimo
        </div>
    );
}