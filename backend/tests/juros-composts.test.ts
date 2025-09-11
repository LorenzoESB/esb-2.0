import { expect, test } from 'vitest';
import calculaJurosCompostos from '../src/services/juros-compostos/juros-compostos.service';


test('Calcula juros compostos corretamente', async () => {
    const resultado = await calculaJurosCompostos({
        valorInicial: 1000,
        aporteMensal: 100,
        tempoAplicacao: 12,
        tempoAplicacaoUnidade: 'meses',
        taxaJuros: 10
    });
    expect(resultado.resumo.valorTotalFinalBruto).toBe(2354.05);
    expect(resultado.resumo.totalInvestido).toBe(2200);
    expect(resultado.resumo.totalEmJurosBruto).toBeCloseTo(154.05, 2);
    expect(resultado.detalhesMensais.length).toBe(12);
    expect(resultado.detalhesMensais[0]).toEqual({
        mes: 1,
        valorInvestido: 1100,
        valorComJuros: 1107.97,
        jurosDoMes: 7.97,
        jurosAcumulados: 7.97,
    });
    expect(resultado.detalhesMensais[11]).toEqual({
        mes: 12,
        valorInvestido: 2200,
        valorComJuros: 2354.05,
        jurosDoMes: 17.83,
        jurosAcumulados: 154.05,
    });
});
