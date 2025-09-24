import { Test, TestingModule } from '@nestjs/testing';
import { AmortizacaoService } from '../amortizacao.service';
import { AmortizacaoInputDto } from '../dto/amortizacao-input.dto';
import {
  SistemaAmortizacao,
  TipoAmortizacaoExtraordinaria,
} from '../enums/sistema-amortizacao.enum';

describe('AmortizacaoService', () => {
  let service: AmortizacaoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AmortizacaoService],
    }).compile();

    service = module.get<AmortizacaoService>(AmortizacaoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('SAC System', () => {
    it('should calculate SAC amortization correctly', async () => {
      const input: AmortizacaoInputDto = {
        valorFinanciamento: 170000,
        taxaJurosAnual: 8.5,
        prazoMeses: 360,
        sistemaAmortizacao: SistemaAmortizacao.SAC,
        seguroMensal: 50,
        taxaAdministracao: 25,
      };

      const result = await service.calcularAmortizacao(input);

      expect(result).toBeDefined();
      expect(result.resumo).toBeDefined();
      expect(result.parcelas).toHaveLength(360);

      // SAC should have constant amortization
      const primeiraAmortizacao = result.parcelas[0].amortizacao;
      const ultimaAmortizacao = result.parcelas[359].amortizacao;
      expect(primeiraAmortizacao).toBeCloseTo(ultimaAmortizacao, 2);

      // Interest should decrease over time
      expect(result.parcelas[0].juros).toBeGreaterThan(
        result.parcelas[359].juros,
      );

      // Payment should decrease over time
      expect(result.parcelas[0].prestacao).toBeGreaterThan(
        result.parcelas[359].prestacao,
      );
    });

    it('should have decreasing balance', async () => {
      const input: AmortizacaoInputDto = {
        valorFinanciamento: 100000,
        taxaJurosAnual: 12,
        prazoMeses: 12,
        sistemaAmortizacao: SistemaAmortizacao.SAC,
      };

      const result = await service.calcularAmortizacao(input);

      for (let i = 1; i < result.parcelas.length; i++) {
        expect(result.parcelas[i].saldoInicial).toBeLessThan(
          result.parcelas[i - 1].saldoInicial,
        );
      }

      // Last balance should be zero
      expect(result.parcelas[11].saldoFinal).toBeCloseTo(0, 2);
    });
  });

  describe('PRICE System', () => {
    it('should calculate PRICE amortization correctly', async () => {
      const input: AmortizacaoInputDto = {
        valorFinanciamento: 170000,
        taxaJurosAnual: 8.5,
        prazoMeses: 360,
        sistemaAmortizacao: SistemaAmortizacao.PRICE,
        seguroMensal: 50,
        taxaAdministracao: 25,
      };

      const result = await service.calcularAmortizacao(input);

      expect(result).toBeDefined();
      expect(result.resumo).toBeDefined();
      expect(result.parcelas).toHaveLength(360);

      // PRICE should have constant payment (prestacao)
      const primeiraPrestacao = result.parcelas[0].prestacao;
      const ultimaPrestacao = result.parcelas[359].prestacao;
      expect(primeiraPrestacao).toBeCloseTo(ultimaPrestacao, 2);

      // Amortization should increase over time
      expect(result.parcelas[0].amortizacao).toBeLessThan(
        result.parcelas[359].amortizacao,
      );

      // Interest should decrease over time
      expect(result.parcelas[0].juros).toBeGreaterThan(
        result.parcelas[359].juros,
      );
    });
  });

  describe('Single Payment System', () => {
    it('should calculate single payment correctly', async () => {
      const input: AmortizacaoInputDto = {
        valorFinanciamento: 100000,
        taxaJurosAnual: 10,
        prazoMeses: 12,
        sistemaAmortizacao: SistemaAmortizacao.PAGAMENTO_UNICO,
      };

      const result = await service.calcularAmortizacao(input);

      expect(result).toBeDefined();
      expect(result.parcelas).toHaveLength(12);

      // Should have no payments until the last month
      for (let i = 0; i < 11; i++) {
        expect(result.parcelas[i].prestacao).toBeCloseTo(0, 2);
      }

      // Last payment should include principal + all accumulated interest
      expect(result.parcelas[11].amortizacao).toBe(100000);
      expect(result.parcelas[11].juros).toBeGreaterThan(0);
      expect(result.parcelas[11].saldoFinal).toBe(0);
    });
  });

  describe('Extraordinary Amortizations', () => {
    it('should apply extraordinary amortization to reduce term', async () => {
      const input: AmortizacaoInputDto = {
        valorFinanciamento: 100000,
        taxaJurosAnual: 10,
        prazoMeses: 24,
        sistemaAmortizacao: SistemaAmortizacao.SAC,
        amortizacoesExtraordinarias: [
          {
            valor: 10000,
            mesOcorrencia: 12,
            tipo: TipoAmortizacaoExtraordinaria.DIMINUIR_PRAZO,
          },
        ],
      };

      const result = await service.calcularAmortizacao(input);

      expect(result).toBeDefined();
      expect(result.parcelas[11].amortizacaoExtraordinaria).toBe(10000);
      expect(result.resumo.totalAmortizacoesExtraordinarias).toBe(10000);
    });
  });

  describe('System Comparison', () => {
    it('should compare different amortization systems', async () => {
      const input: AmortizacaoInputDto = {
        valorFinanciamento: 170000,
        taxaJurosAnual: 8.5,
        prazoMeses: 360,
        sistemaAmortizacao: SistemaAmortizacao.SAC, // This will be overridden
      };

      const result = await service.compararSistemas(input);

      expect(result).toBeDefined();
      expect(result.simulacoes).toHaveLength(3);
      expect(result.analiseComparativa).toBeDefined();
      expect(result.analiseComparativa.sistemaComMenorJurosTotal).toBeDefined();
      expect(result.analiseComparativa.economiaMaximaJuros).toBeGreaterThan(0);
    });
  });

  describe('Edge Cases', () => {
    it('should handle zero interest rate', async () => {
      const input: AmortizacaoInputDto = {
        valorFinanciamento: 100000,
        taxaJurosAnual: 0,
        prazoMeses: 12,
        sistemaAmortizacao: SistemaAmortizacao.SAC,
      };

      const result = await service.calcularAmortizacao(input);

      expect(result.resumo.totalJuros).toBe(0);
      result.parcelas.forEach((parcela) => {
        expect(parcela.juros).toBe(0);
      });
    });

    it('should handle single month term', async () => {
      const input: AmortizacaoInputDto = {
        valorFinanciamento: 10000,
        taxaJurosAnual: 12,
        prazoMeses: 1,
        sistemaAmortizacao: SistemaAmortizacao.PRICE,
      };

      const result = await service.calcularAmortizacao(input);

      expect(result.parcelas).toHaveLength(1);
      expect(result.parcelas[0].amortizacao).toBe(10000);
      expect(result.parcelas[0].saldoFinal).toBe(0);
    });
  });
});
