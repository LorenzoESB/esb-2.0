import { calcularAntecipacao } from '../calc/taxa-maquininha.calc'

describe('Taxa Maquininha calc validation', () => {
  it('antecipação simples: 10k parcelado em 12, desc 3%, adicional 0.5%', () => {
    const plano = {
      taxa_desconto_credito_vista: 0.03,
      taxa_adicional_parcela: 0.005,
    } as any
    const val = calcularAntecipacao(10000, 12, plano)
    expect(val).toBeGreaterThan(0)
  })
})
