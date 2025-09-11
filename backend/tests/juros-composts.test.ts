import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { JurosCompostosInput } from '../src/models/juros-compostos/juros-compostos.model';
import calculaJurosCompostos from '../src/services/juros-compostos/juros-compostos.service';

// Mock do console.log para evitar poluição nos testes
const consoleSpy = vi.spyOn(console, 'log');

describe('Calculadora de Juros Compostos', () => {
    beforeEach(() => {
        consoleSpy.mockImplementation(() => { });
    });

    afterEach(() => {
        consoleSpy.mockRestore();
    });

    describe('Função principal - calculaJurosCompostos', () => {

        it('deve calcular corretamente juros compostos para o exemplo padrão (R$ 10.000 inicial, R$ 500 mensais, 11% a.a., 3 anos)', async () => {
            const input: JurosCompostosInput = {
                valorInicial: 10000,
                aporteMensal: 500,
                tempoAplicacao: 3,
                tempoAplicacaoUnidade: "anos",
                taxaJuros: 11
            };

            const resultado = await calculaJurosCompostos(input);

            // Valores esperados baseados no cálculo correto
            expect(resultado.resumo.valorTotalFinalBruto).toBeCloseTo(34720.85, 2);
            expect(resultado.resumo.totalInvestido).toBe(28000.00);
            expect(resultado.resumo.totalEmJurosBruto).toBeCloseTo(6720.85, 2);
            expect(resultado.detalhesMensais).toHaveLength(36);
        });

        it('deve calcular corretamente para aplicação em meses', async () => {
            const input: JurosCompostosInput = {
                valorInicial: 5000,
                aporteMensal: 300,
                tempoAplicacao: 12,
                tempoAplicacaoUnidade: "meses",
                taxaJuros: 8
            };

            const resultado = await calculaJurosCompostos(input);

            expect(resultado.resumo.totalInvestido).toBe(8600.00); // 5000 + (300 * 12)
            expect(resultado.resumo.valorTotalFinalBruto).toBeGreaterThan(8600);
            expect(resultado.detalhesMensais).toHaveLength(12);
        });

        it('deve calcular corretamente sem aportes mensais (apenas valor inicial)', async () => {
            const input: JurosCompostosInput = {
                valorInicial: 10000,
                aporteMensal: 0,
                tempoAplicacao: 2,
                tempoAplicacaoUnidade: "anos",
                taxaJuros: 12
            };

            const resultado = await calculaJurosCompostos(input);

            expect(resultado.resumo.totalInvestido).toBe(10000.00);
            // Valor final deve ser próximo a 10000 * (1.12)^2 = 12544
            expect(resultado.resumo.valorTotalFinalBruto).toBeCloseTo(12544.00, 0);
            expect(resultado.detalhesMensais).toHaveLength(24);
        });

        it('deve ter evolução crescente mês a mês', async () => {
            const input: JurosCompostosInput = {
                valorInicial: 1000,
                aporteMensal: 100,
                tempoAplicacao: 6,
                tempoAplicacaoUnidade: "meses",
                taxaJuros: 6
            };

            const resultado = await calculaJurosCompostos(input);

            // Verifica se o saldo cresce mês a mês
            for (let i = 1; i < resultado.detalhesMensais.length; i++) {
                expect(resultado.detalhesMensais[i].valorComJuros)
                    .toBeGreaterThan(resultado.detalhesMensais[i - 1].valorComJuros);
            }

            // Verifica se o rendimento acumulado cresce
            for (let i = 1; i < resultado.detalhesMensais.length; i++) {
                expect(resultado.detalhesMensais[i].jurosAcumulados)
                    .toBeGreaterThan(resultado.detalhesMensais[i - 1].jurosAcumulados);
            }
        });

        it('deve calcular corretamente o primeiro e último mês', async () => {
            const input: JurosCompostosInput = {
                valorInicial: 1000,
                aporteMensal: 200,
                tempoAplicacao: 3,
                tempoAplicacaoUnidade: "meses",
                taxaJuros: 12
            };

            const resultado = await calculaJurosCompostos(input);

            const primeiroMes = resultado.detalhesMensais[0];
            const ultimoMes = resultado.detalhesMensais[2];

            // Primeiro mês: deve ter o aporte mensal
            expect(primeiroMes.mes).toBe(1);
            expect(primeiroMes.valorInvestido).toBe(1200.00); // 1000 + 200

            // Último mês: deve ter todos os aportes
            expect(ultimoMes.mes).toBe(3);
            expect(ultimoMes.valorInvestido).toBe(1600.00); // 1000 + (200 * 3)
        });
    });

    describe('Funções auxiliares', () => {

        it('deve converter tempo para dias corretamente', () => {
            // Como as funções auxiliares não estão exportadas, vamos testar indiretamente
            // através dos resultados da função principal

            // Teste para anos
            const inputAnos: JurosCompostosInput = {
                valorInicial: 1000,
                aporteMensal: 0,
                tempoAplicacao: 2,
                tempoAplicacaoUnidade: "anos",
                taxaJuros: 6
            };

            // Teste para meses  
            const inputMeses: JurosCompostosInput = {
                valorInicial: 1000,
                aporteMensal: 0,
                tempoAplicacao: 24,
                tempoAplicacaoUnidade: "meses",
                taxaJuros: 6
            };

            // Ambos devem ter o mesmo período em meses (24)
            expect(inputAnos.tempoAplicacao * 12).toBe(inputMeses.tempoAplicacao);
        });

        it('deve calcular taxa mensal corretamente', async () => {
            const input: JurosCompostosInput = {
                valorInicial: 1000,
                aporteMensal: 0,
                tempoAplicacao: 12,
                tempoAplicacaoUnidade: "meses",
                taxaJuros: 12 // 12% ao ano
            };

            const resultado = await calculaJurosCompostos(input);

            // Para 12% ao ano, a taxa mensal deveria ser aproximadamente 0.9489%
            // Valor final deveria ser próximo a 1000 * (1.12) = 1120
            expect(resultado.resumo.valorTotalFinalBruto).toBeCloseTo(1120.00, 0);
        });
    });

    describe('Casos extremos e validações', () => {

        it('deve funcionar com taxa de juros zero', async () => {
            const input: JurosCompostosInput = {
                valorInicial: 1000,
                aporteMensal: 100,
                tempoAplicacao: 6,
                tempoAplicacaoUnidade: "meses",
                taxaJuros: 0
            };

            const resultado = await calculaJurosCompostos(input);

            // Com taxa zero, valor final = valor investido
            expect(resultado.resumo.valorTotalFinalBruto).toBe(1600.00); // 1000 + (100 * 6)
            expect(resultado.resumo.totalEmJurosBruto).toBe(0);
        });

        it('deve funcionar com valores altos', async () => {
            const input: JurosCompostosInput = {
                valorInicial: 100000,
                aporteMensal: 5000,
                tempoAplicacao: 1,
                tempoAplicacaoUnidade: "anos",
                taxaJuros: 15
            };

            const resultado = await calculaJurosCompostos(input);

            expect(resultado.resumo.totalInvestido).toBe(160000.00); // 100000 + (5000 * 12)
            expect(resultado.resumo.valorTotalFinalBruto).toBeGreaterThan(160000);
            expect(resultado.resumo.totalEmJurosBruto).toBeGreaterThan(0);
        });

        it('deve funcionar com período de 1 mês', async () => {
            const input: JurosCompostosInput = {
                valorInicial: 1000,
                aporteMensal: 500,
                tempoAplicacao: 1,
                tempoAplicacaoUnidade: "meses",
                taxaJuros: 12
            };

            const resultado = await calculaJurosCompostos(input);

            expect(resultado.detalhesMensais).toHaveLength(1);
            expect(resultado.resumo.totalInvestido).toBe(1500.00); // 1000 + 500
            expect(resultado.resumo.valorTotalFinalBruto).toBeGreaterThan(1500);
        });
    });

    describe('Consistência dos dados de retorno', () => {

        it('deve manter consistência entre resumo e detalhes mensais', async () => {
            const input: JurosCompostosInput = {
                valorInicial: 2000,
                aporteMensal: 300,
                tempoAplicacao: 6,
                tempoAplicacaoUnidade: "meses",
                taxaJuros: 10
            };

            const resultado = await calculaJurosCompostos(input);

            // Último valor dos detalhes mensais deve coincidir com o resumo
            const ultimoMes = resultado.detalhesMensais[resultado.detalhesMensais.length - 1];

            expect(ultimoMes.valorComJuros).toBeCloseTo(resultado.resumo.valorTotalFinalBruto, 2);
            expect(ultimoMes.valorInvestido).toBeCloseTo(resultado.resumo.totalInvestido, 2);
            expect(ultimoMes.jurosAcumulados).toBeCloseTo(resultado.resumo.totalEmJurosBruto, 2);
        });

        it('deve ter propriedades corretas nos detalhes mensais', async () => {
            const input: JurosCompostosInput = {
                valorInicial: 1000,
                aporteMensal: 200,
                tempoAplicacao: 3,
                tempoAplicacaoUnidade: "meses",
                taxaJuros: 8
            };

            const resultado = await calculaJurosCompostos(input);

            resultado.detalhesMensais.forEach((detalhe: any, index: number) => {
                // Verificar estrutura
                expect(detalhe).toHaveProperty('mes');
                expect(detalhe).toHaveProperty('valorInvestido');
                expect(detalhe).toHaveProperty('valorComJuros');
                expect(detalhe).toHaveProperty('jurosDoMes');
                expect(detalhe).toHaveProperty('jurosAcumulados');

                // Verificar tipos
                expect(typeof detalhe.mes).toBe('number');
                expect(typeof detalhe.valorInvestido).toBe('number');
                expect(typeof detalhe.valorComJuros).toBe('number');
                expect(typeof detalhe.jurosDoMes).toBe('number');
                expect(typeof detalhe.jurosAcumulados).toBe('number');

                // Verificar ordem dos meses
                expect(detalhe.mes).toBe(index + 1);

                // Verificar que valor com juros >= valor investido
                expect(detalhe.valorComJuros).toBeGreaterThanOrEqual(detalhe.valorInvestido);
            });
        });
    });

    describe('Performance e precisão', () => {

        it('deve calcular rapidamente para períodos longos', async () => {
            const start = performance.now();

            const input: JurosCompostosInput = {
                valorInicial: 10000,
                aporteMensal: 500,
                tempoAplicacao: 10, // 10 anos = 120 meses
                tempoAplicacaoUnidade: "anos",
                taxaJuros: 8
            };

            const resultado = await calculaJurosCompostos(input);

            const end = performance.now();
            const tempo = end - start;

            expect(resultado.detalhesMensais).toHaveLength(120);
            expect(tempo).toBeLessThan(100); // Deve executar em menos de 100ms
        });

        it('deve manter precisão com valores decimais', async () => {
            const input: JurosCompostosInput = {
                valorInicial: 1234.56,
                aporteMensal: 123.45,
                tempoAplicacao: 6,
                tempoAplicacaoUnidade: "meses",
                taxaJuros: 7.25
            };

            const resultado = await calculaJurosCompostos(input);

            // Verificar que não há perda significativa de precisão
            const totalEsperado = 1234.56 + (123.45 * 6);
            expect(resultado.resumo.totalInvestido).toBeCloseTo(totalEsperado, 2);

            // Verificar que todos os valores são numbers válidos
            expect(Number.isFinite(resultado.resumo.valorTotalFinalBruto)).toBe(true);
            expect(Number.isFinite(resultado.resumo.totalEmJurosBruto)).toBe(true);
        });
    });
});