import {
  calcularPrimeiraParcelaSAC,
  calcularUltimaParcelaSAC,
  converterTaxaAnualParaMensal,
} from '../calc/financiamento-imovel.calc'

describe('Financiamento Imóvel SAC calc validation', () => {
  it('baseline: principal 400k, 360 meses, 10% a.a.', () => {
    const principal = 400000
    const n = 360
    const taxaMensal = converterTaxaAnualParaMensal(10).toNumber()
    const primeira = calcularPrimeiraParcelaSAC(principal, n, taxaMensal)
      .toDecimalPlaces(2)
      .toNumber()
    const ultima = calcularUltimaParcelaSAC(principal, n, taxaMensal)
      .toDecimalPlaces(2)
      .toNumber()
    expect(Math.abs(primeira - 4304.7)).toBeLessThanOrEqual(50)
    expect(Math.abs(ultima - 1120)).toBeLessThanOrEqual(10)
  })
})
