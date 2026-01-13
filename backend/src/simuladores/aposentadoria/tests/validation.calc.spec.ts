import {
  calcularValorFuturoPagamentos,
  calcularRendaMensal,
} from '../calc/aposentadoria.calc'

describe('Aposentadoria calc validation', () => {
  it('realistic: contribuição 2000/mês por 240 meses, taxa 0.5%', () => {
    const pmt = 2000
    const i = 0.005
    const n = 240
    const fv = calcularValorFuturoPagamentos(pmt, i, n).toDecimalPlaces(2).toNumber()
    expect(Math.abs(fv - 924082)).toBeLessThanOrEqual(5)
    const renda = calcularRendaMensal(fv, i, n).toDecimalPlaces(0).toNumber()
    expect(Math.abs(renda - 6622)).toBeLessThanOrEqual(10)
  })
})
