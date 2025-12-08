import Decimal from 'decimal.js';
import {
  calcularValorFuturoCapitalInicial,
  calcularValorFuturoPagamentos,
  calcularValorPresente,
  calcularPagamentoMensal,
  calcularRendaMensal,
  calcularTaxaAnual,
  calcularDuracaoPatrimonio,
  calcularSaldoAposSaques,
} from '../calc/aposentadoria.calc';

describe('AposentadoriaCalc', () => {
  const TAXA_MENSAL = 0.005; // 0.5% ao mês
  const TOLERANCIA = 0.01; // R$ 0,01 de tolerância

  /**
   * Helper para comparar valores Decimal com tolerância.
   */
  function expectDecimalClose(
    actual: Decimal,
    expected: number,
    tolerance = TOLERANCIA,
  ) {
    const diff = Math.abs(actual.toNumber() - expected);
    expect(diff).toBeLessThanOrEqual(tolerance);
  }

  describe('calcularValorFuturoCapitalInicial', () => {
    it('deve calcular valor futuro de R$ 50.000 em 264 meses a 0.5% a.m.', () => {
      // Cenário: reserva de R$ 50.000 aplicada por 22 anos (264 meses)
      const resultado = calcularValorFuturoCapitalInicial(
        50000,
        TAXA_MENSAL,
        264,
      );

      // Valor esperado: R$ 143.439,97
      expectDecimalClose(resultado, 143439.97, 0.02);
    });

    it('deve retornar o próprio valor quando prazo é 0', () => {
      const resultado = calcularValorFuturoCapitalInicial(
        10000,
        TAXA_MENSAL,
        0,
      );
      expectDecimalClose(resultado, 10000);
    });

    it('deve aceitar entrada como Decimal', () => {
      const resultado = calcularValorFuturoCapitalInicial(
        new Decimal(50000),
        new Decimal(TAXA_MENSAL),
        264,
      );
      expectDecimalClose(resultado, 143439.97, 0.02);
    });

    it('deve calcular corretamente para valores pequenos', () => {
      const resultado = calcularValorFuturoCapitalInicial(100, TAXA_MENSAL, 12);
      // 100 * (1.005)^12 ≈ 106.17
      expectDecimalClose(resultado, 106.17, 0.01);
    });
  });

  describe('calcularValorFuturoPagamentos', () => {
    it('deve calcular FV de contribuições mensais de R$ 2.836,26 por 264 meses', () => {
      // Cenário: contribuir R$ 2.836,26/mês por 22 anos
      const resultado = calcularValorFuturoPagamentos(
        2836.26,
        TAXA_MENSAL,
        264,
      );

      // Valor esperado: aproximadamente R$ 1.978.286,07
      // (total acumulado - reserva futura = 2.121.726,04 - 143.439,97)
      expectDecimalClose(resultado, 1978286, 1);
    });

    it('deve retornar zero quando prazo é 0', () => {
      const resultado = calcularValorFuturoPagamentos(1000, TAXA_MENSAL, 0);
      expectDecimalClose(resultado, 0);
    });

    it('deve calcular FV de R$ 1.000/mês por 12 meses', () => {
      const resultado = calcularValorFuturoPagamentos(1000, TAXA_MENSAL, 12);
      // Fórmula: 1000 * [(1.005^12 - 1) / 0.005] ≈ 12.335,56
      expectDecimalClose(resultado, 12335.56, 0.5);
    });
  });

  describe('calcularValorPresente', () => {
    it('deve calcular VP necessário para renda de R$ 12.000/mês por 432 meses', () => {
      // Cenário: receber R$ 12.000/mês dos 50 aos 86 anos (36 anos = 432 meses)
      const resultado = calcularValorPresente(12000, TAXA_MENSAL, 432);

      // Valor esperado: R$ 2.121.726,04
      expectDecimalClose(resultado, 2121726.04, 0.1);
    });

    it('deve retornar zero quando renda é zero', () => {
      const resultado = calcularValorPresente(0, TAXA_MENSAL, 360);
      expectDecimalClose(resultado, 0);
    });

    it('deve calcular VP de R$ 1.000/mês por 12 meses', () => {
      const resultado = calcularValorPresente(1000, TAXA_MENSAL, 12);
      // VP ≈ R$ 11.618,93
      expectDecimalClose(resultado, 11618.93, 0.5);
    });
  });

  describe('calcularPagamentoMensal', () => {
    it('deve calcular contribuição necessária para acumular R$ 2.121.726,04 em 264 meses', () => {
      // Cenário reverso: preciso de R$ 2.121.726,04 daqui 22 anos
      const vpNecessario = 2121726.04 - 143439.97; // descontando reserva futura
      const resultado = calcularPagamentoMensal(vpNecessario, TAXA_MENSAL, 264);

      // Valor esperado: R$ 2.836,26/mês
      expectDecimalClose(resultado, 2836.26, 0.5);
    });

    it('deve retornar infinito quando prazo é 0', () => {
      const resultado = calcularPagamentoMensal(10000, TAXA_MENSAL, 0);
      expect(resultado.isFinite()).toBe(false);
    });
  });

  describe('calcularRendaMensal', () => {
    it('deve calcular renda mensal de R$ 2.121.726,04 por 432 meses', () => {
      // Cenário: tenho R$ 2.121.726,04 e quero sacar por 36 anos
      const resultado = calcularRendaMensal(2121726.04, TAXA_MENSAL, 432);

      // Valor esperado: R$ 12.000/mês
      expectDecimalClose(resultado, 12000, 1);
    });

    it('deve calcular renda de R$ 100.000 por 120 meses', () => {
      const resultado = calcularRendaMensal(100000, TAXA_MENSAL, 120);
      // Renda ≈ R$ 1.110,20/mês
      expectDecimalClose(resultado, 1110.2, 1);
    });
  });

  describe('calcularTaxaAnual', () => {
    it('deve converter 0.5% a.m. para taxa anual equivalente', () => {
      const resultado = calcularTaxaAnual(TAXA_MENSAL);

      // (1.005)^12 - 1 ≈ 0.0617 = 6.17% a.a.
      expectDecimalClose(resultado, 0.0617, 0.0001);
    });

    it('deve converter 1% a.m. para taxa anual', () => {
      const resultado = calcularTaxaAnual(0.01);

      // (1.01)^12 - 1 ≈ 0.1268 = 12.68% a.a.
      expectDecimalClose(resultado, 0.1268, 0.0001);
    });
  });

  describe('calcularDuracaoPatrimonio', () => {
    it('deve retornar Infinity para saque sustentável (apenas com rendimentos)', () => {
      const patrimonio = 1000000;
      const rendimentoMensal = patrimonio * TAXA_MENSAL; // R$ 5.000
      const saque = rendimentoMensal * 0.9; // R$ 4.500 (menor que rendimento)

      const resultado = calcularDuracaoPatrimonio(
        patrimonio,
        saque,
        TAXA_MENSAL,
      );

      expect(resultado).toBe(Infinity);
    });

    it('deve calcular duração finita quando saque > rendimento', () => {
      const patrimonio = 100000;
      const saque = 1000; // R$ 1.000/mês (rendimento seria R$ 500)

      const resultado = calcularDuracaoPatrimonio(
        patrimonio,
        saque,
        TAXA_MENSAL,
      );

      // Deve durar aproximadamente 115-120 meses
      expect(resultado).toBeGreaterThan(100);
      expect(resultado).toBeLessThan(130);
    });

    it('deve esgotar rapidamente com saques muito altos', () => {
      const patrimonio = 10000;
      const saque = 5000; // metade do patrimônio por mês

      const resultado = calcularDuracaoPatrimonio(
        patrimonio,
        saque,
        TAXA_MENSAL,
      );

      // Deve durar apenas 2-3 meses
      expect(resultado).toBeLessThan(3);
    });
  });

  describe('calcularSaldoAposSaques', () => {
    it('deve calcular saldo positivo após saques sustentáveis', () => {
      const patrimonio = 1000000;
      const saque = 4000; // menor que rendimento de R$ 5.000
      const meses = 120;

      const resultado = calcularSaldoAposSaques(
        patrimonio,
        saque,
        TAXA_MENSAL,
        meses,
      );

      // Saldo deve ser maior que patrimônio inicial (cresce mais que consome)
      expect(resultado.toNumber()).toBeGreaterThan(patrimonio);
    });

    it('deve calcular saldo próximo de zero quando esgota', () => {
      const patrimonio = 100000;
      const saque = 1000;
      // Calcular duração primeiro
      const duracao = calcularDuracaoPatrimonio(patrimonio, saque, TAXA_MENSAL);

      const resultado = calcularSaldoAposSaques(
        patrimonio,
        saque,
        TAXA_MENSAL,
        duracao,
      );

      // Saldo deve estar próximo de zero
      expectDecimalClose(resultado, 0, 100);
    });

    it('deve calcular saldo negativo após período que esgota patrimônio', () => {
      const patrimonio = 10000;
      const saque = 1000;
      const meses = 50; // muito além da capacidade

      const resultado = calcularSaldoAposSaques(
        patrimonio,
        saque,
        TAXA_MENSAL,
        meses,
      );

      // Saldo deve ser negativo
      expect(resultado.toNumber()).toBeLessThan(0);
    });
  });

  describe('Integração - Cenário completo', () => {
    it('deve reproduzir exemplo completo: idade 24, aposentadoria 50, renda R$ 12.000', () => {
      const idadeAtual = 24;
      const idadeAposentadoria = 50;
      const expectativaVida = 86;
      const rendaDesejada = 12000;
      const reservaAtual = 0;

      const mesesContribuicao = (idadeAposentadoria - idadeAtual) * 12; // 312
      const mesesUsufruto = (expectativaVida - idadeAposentadoria) * 12; // 432

      // Passo 1: Calcular VP necessário
      const vpNecessario = calcularValorPresente(
        rendaDesejada,
        TAXA_MENSAL,
        mesesUsufruto,
      );
      expectDecimalClose(vpNecessario, 2121726.04, 1);

      // Passo 2: Calcular FV da reserva (zero neste caso)
      const fvReserva = calcularValorFuturoCapitalInicial(
        reservaAtual,
        TAXA_MENSAL,
        mesesContribuicao,
      );
      expectDecimalClose(fvReserva, 0);

      // Passo 3: Calcular contribuição necessária
      const contribuicao = calcularPagamentoMensal(
        vpNecessario.minus(fvReserva),
        TAXA_MENSAL,
        mesesContribuicao,
      );
      expectDecimalClose(contribuicao, 2836.26, 0.5);

      // Passo 4: Validação reversa - FV das contribuições
      const fvContribuicoes = calcularValorFuturoPagamentos(
        contribuicao,
        TAXA_MENSAL,
        mesesContribuicao,
      );
      expectDecimalClose(fvContribuicoes, vpNecessario.toNumber(), 10);
    });

    it('deve reproduzir cenário com reserva inicial: R$ 50.000', () => {
      const idadeAtual = 28;
      const idadeAposentadoria = 50;
      const expectativaVida = 86;
      const rendaDesejada = 12000;
      const reservaAtual = 50000;

      const mesesContribuicao = (idadeAposentadoria - idadeAtual) * 12; // 264
      const mesesUsufruto = (expectativaVida - idadeAposentadoria) * 12; // 432

      // VP necessário
      const vpNecessario = calcularValorPresente(
        rendaDesejada,
        TAXA_MENSAL,
        mesesUsufruto,
      );

      // FV da reserva
      const fvReserva = calcularValorFuturoCapitalInicial(
        reservaAtual,
        TAXA_MENSAL,
        mesesContribuicao,
      );
      expectDecimalClose(fvReserva, 143439.97, 0.1);

      // Contribuição considerando reserva
      const vpAContribuir = vpNecessario.minus(fvReserva);
      const contribuicao = calcularPagamentoMensal(
        vpAContribuir,
        TAXA_MENSAL,
        mesesContribuicao,
      );

      // Deve ser menor que sem reserva (~R$ 2.836)
      expect(contribuicao.toNumber()).toBeLessThan(2836.26);
      expect(contribuicao.toNumber()).toBeGreaterThan(2500);
    });
  });
});
