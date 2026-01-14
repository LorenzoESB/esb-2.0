import {
  calcularFinanciamentoPRICE,
} from '../calc/financiamento-veiculos.calc'

describe('Financiamento Veículos PRICE calc validation', () => {
  it('baseline: principal 50000, 48 meses, 24% a.a., renda 8000', () => {
    const r = calcularFinanciamentoPRICE(50000, 48, 24, 8000)
    expect(r.parcelaMensal).toBeGreaterThan(0)
    expect(r.valorTotal).toBeGreaterThan(r.parcelaMensal)
    expect(r.taxaJurosMensal).toBeGreaterThan(1.8)
  })
})
