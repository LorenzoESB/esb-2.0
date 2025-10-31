import { useState } from 'react';
import { toast } from 'sonner';
import { amortizacaoSacApi } from '../api/amortizacao';
import { AmortizacaoSacOutput, AmortizacaoSacInput } from '../schemas/amortizacao.schema';




export const useAmortizacaoSac = () => {
    const [data, setData] = useState<AmortizacaoSacOutput | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const simular = async (input: AmortizacaoSacInput) => {
        setIsLoading(true);
        setError(null);

        try {
            const result = await amortizacaoSacApi.simular(input);
            setData(result);
            toast('Simulação realizada com sucesso!', {
                description: 'Os resultados foram atualizados.',
            });
            return result;
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Erro ao simular amortização';
            setError(errorMessage);
            toast('Erro na simulação', {
                description: errorMessage,
            });
            throw err;
        } finally {
            setIsLoading(false);
        }
    };

    const comparar = async (input: AmortizacaoSacInput) => {
        setIsLoading(true);
        setError(null);

        try {
            const result = await amortizacaoSacApi.comparar(input);

            // result expected shape (backend simplified): { simulacoes: [{ resumo: { sistemaAmortizacao, novaPrestacao, prazoRestante, saldoDevedor } }], analiseComparativa: {...} }
            const simulacoes: Array<any> = result?.simulacoes || [];

            // Map simplified summaries into the UI's expected amortizacaoPorPrazo / amortizacaoPorPrestacao
            let amortizacaoPorPrazo: any = null;
            let amortizacaoPorPrestacao: any = null;

            simulacoes.forEach((s: any) => {
                const resumo = s?.resumo || s; // allow both shapes
                if (!resumo) return;

                const mapped = {
                    novaPrestacao: resumo.novaPrestacao ?? 0,
                    prazoRestante: resumo.prazoRestante ?? 0,
                    saldoDevedor: resumo.saldoDevedor ?? 0,
                    // keep other UI fields as defaults so AmortizacaoSacResults can render
                    novaAmortizacaoMensal: resumo.novaAmortizacaoMensal ?? 0,
                    proximosJuros: resumo.proximosJuros ?? 0,
                    economiaJuros: resumo.economiaJuros ?? 0,
                    reducaoPrazo: resumo.reducaoPrazo ?? 0,
                    reducaoPrestacao: resumo.reducaoPrestacao ?? 0,
                    graficoProgressao: {
                        labels: [],
                        saldoDevedor: [],
                        amortizacao: [],
                        juros: [],
                        prestacao: [],
                        totalPagoAcumulado: [],
                        jurosAcumulados: [],
                    },
                };

                if (resumo.sistemaAmortizacao === 'POR_PRAZO') {
                    amortizacaoPorPrazo = mapped;
                } else if (resumo.sistemaAmortizacao === 'POR_PRESTACAO') {
                    amortizacaoPorPrestacao = mapped;
                }
            });

            setData((prev) => {
                // Ensure situacaoAtual exists (build from input if necessary)
                const situacaoAtualExisting = prev?.situacaoAtual;
                const situacaoAtualFromInput = {
                    prestacaoAtual: (input as any).amortizacaoMensalAtual ?? 0,
                    prazoRestanteAtual: (input as any).prazoOperacaoMeses ?? 0,
                    saldoDevedorAtual: (input as any).saldoDevedorAtual ?? 0,
                    amortizacaoMensalAtual: (input as any).amortizacaoMensalAtual ?? 0,
                    jurosAtual: 0,
                    totalPagarSemAmortizacao: 0,
                    graficoProgressao: {
                        labels: [],
                        saldoDevedor: [],
                        amortizacao: [],
                        juros: [],
                        prestacao: [],
                        totalPagoAcumulado: [],
                        jurosAcumulados: [],
                    },
                } as any;

                const situacaoAtual = situacaoAtualExisting ?? situacaoAtualFromInput;

                return {
                    ...(prev ?? ({} as AmortizacaoSacOutput)),
                    situacaoAtual,
                    amortizacaoPorPrazo: amortizacaoPorPrazo ?? prev?.amortizacaoPorPrazo ?? null,
                    amortizacaoPorPrestacao: amortizacaoPorPrestacao ?? prev?.amortizacaoPorPrestacao ?? null,
                } as AmortizacaoSacOutput;
            });

            toast('Comparação realizada com sucesso!', {
                description: 'Resultados comparativos atualizados.',
            });

            return result;
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Erro ao comparar amortizações';
            setError(errorMessage);
            toast('Erro na comparação', {
                description: errorMessage,
            });
            throw err;
        } finally {
            setIsLoading(false);
        }
    };

    const reset = () => {
        setData(null);
        setError(null);
    };

    return {
        data,
        isLoading,
        error,
        simular,
        comparar,
        reset,
    };
};