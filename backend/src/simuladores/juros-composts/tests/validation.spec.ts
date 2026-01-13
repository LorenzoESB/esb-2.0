import { JurosCompostosService } from '../juros-compostos.service'
import { TempoAplicacaoUnidade } from '../dto/juros-compostos-input.dto'

const prismaMock = {
  simulation: { create: jest.fn().mockResolvedValue({ id: 'mock' }) },
} as any
const emailMock = { sendSimulationResult: jest.fn() } as any

describe('JurosCompostosService validation', () => {
  it('baseline: 10k for 12 months at 12% annual', async () => {
    const svc = new JurosCompostosService(prismaMock as any, emailMock as any)
    const input = {
      nome: 'Teste',
      email: 'teste@example.com',
      valorInicial: 10000,
      aporteMensal: 0,
      tempoAplicacao: 12,
      tempoAplicacaoUnidade: TempoAplicacaoUnidade.MESES,
      taxaJuros: 12,
    }
    const out = await svc.calculaJurosCompostos(input as any)
    const total = out.resumo.valorTotalFinalBruto
    const invested = out.resumo.totalInvestido
    const interest = out.resumo.totalEmJurosBruto
    expect(Math.abs(total - 11200)).toBeLessThanOrEqual(0.01)
    expect(Math.abs(invested - 10000)).toBeLessThanOrEqual(0.01)
    expect(Math.abs(interest - 1200)).toBeLessThanOrEqual(0.01)
  })
})
