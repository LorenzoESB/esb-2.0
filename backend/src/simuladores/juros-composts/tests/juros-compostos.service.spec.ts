import { Test, TestingModule } from '@nestjs/testing';
import { JurosCompostosService } from '../juros-compostos.service';
import {
  JurosCompostosInputDto,
  TempoAplicacaoUnidade,
} from '../dto/juros-compostos-input.dto';

describe('JurosCompostosService', () => {
  let service: JurosCompostosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JurosCompostosService],
    }).compile();

    service = module.get<JurosCompostosService>(JurosCompostosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('calculaJurosCompostos', () => {
    it('should calculate compound interest correctly for the standard example', async () => {
      const input: JurosCompostosInputDto = {
        valorInicial: 10000,
        aporteMensal: 500,
        tempoAplicacao: 3,
        tempoAplicacaoUnidade: TempoAplicacaoUnidade.ANOS,
        taxaJuros: 11,
      };

      const resultado = await service.calculaJurosCompostos(input);

      expect(resultado.resumo.valorTotalFinalBruto).toBeCloseTo(34720.85, 1);
      expect(resultado.resumo.totalInvestido).toBe(28000.0);
      expect(resultado.resumo.totalEmJurosBruto).toBeCloseTo(6720.85, 1);
      expect(resultado.detalhesMensais).toHaveLength(36);
    });

    it('should calculate correctly for monthly period', async () => {
      const input: JurosCompostosInputDto = {
        valorInicial: 5000,
        aporteMensal: 300,
        tempoAplicacao: 12,
        tempoAplicacaoUnidade: TempoAplicacaoUnidade.MESES,
        taxaJuros: 8,
      };

      const resultado = await service.calculaJurosCompostos(input);

      expect(resultado.resumo.totalInvestido).toBe(8600.0);
      expect(resultado.resumo.valorTotalFinalBruto).toBeGreaterThan(8600);
      expect(resultado.detalhesMensais).toHaveLength(12);
    });

    it('should calculate correctly without monthly contributions', async () => {
      const input: JurosCompostosInputDto = {
        valorInicial: 10000,
        aporteMensal: 0,
        tempoAplicacao: 2,
        tempoAplicacaoUnidade: TempoAplicacaoUnidade.ANOS,
        taxaJuros: 12,
      };

      const resultado = await service.calculaJurosCompostos(input);

      expect(resultado.resumo.totalInvestido).toBe(10000.0);
      expect(resultado.resumo.valorTotalFinalBruto).toBeCloseTo(12544.0, 0);
      expect(resultado.detalhesMensais).toHaveLength(24);
    });

    it('should have increasing evolution month by month', async () => {
      const input: JurosCompostosInputDto = {
        valorInicial: 1000,
        aporteMensal: 100,
        tempoAplicacao: 6,
        tempoAplicacaoUnidade: TempoAplicacaoUnidade.MESES,
        taxaJuros: 6,
      };

      const resultado = await service.calculaJurosCompostos(input);

      for (let i = 1; i < resultado.detalhesMensais.length; i++) {
        expect(resultado.detalhesMensais[i].valorComJuros).toBeGreaterThan(
          resultado.detalhesMensais[i - 1].valorComJuros,
        );
        expect(resultado.detalhesMensais[i].jurosAcumulados).toBeGreaterThan(
          resultado.detalhesMensais[i - 1].jurosAcumulados,
        );
      }
    });

    it('should work with zero interest rate', async () => {
      const input: JurosCompostosInputDto = {
        valorInicial: 1000,
        aporteMensal: 100,
        tempoAplicacao: 6,
        tempoAplicacaoUnidade: TempoAplicacaoUnidade.MESES,
        taxaJuros: 0,
      };

      const resultado = await service.calculaJurosCompostos(input);

      expect(resultado.resumo.valorTotalFinalBruto).toBe(1600.0);
      expect(resultado.resumo.totalEmJurosBruto).toBe(0);
    });

    it('should maintain consistency between summary and monthly details', async () => {
      const input: JurosCompostosInputDto = {
        valorInicial: 2000,
        aporteMensal: 300,
        tempoAplicacao: 6,
        tempoAplicacaoUnidade: TempoAplicacaoUnidade.MESES,
        taxaJuros: 10,
      };

      const resultado = await service.calculaJurosCompostos(input);
      const ultimoMes =
        resultado.detalhesMensais[resultado.detalhesMensais.length - 1];

      expect(ultimoMes.valorComJuros).toBeCloseTo(
        resultado.resumo.valorTotalFinalBruto,
        2,
      );
      expect(ultimoMes.valorInvestido).toBeCloseTo(
        resultado.resumo.totalInvestido,
        2,
      );
      expect(ultimoMes.jurosAcumulados).toBeCloseTo(
        resultado.resumo.totalEmJurosBruto,
        2,
      );
    });

    it('should calculate quickly for long periods', async () => {
      const start = performance.now();

      const input: JurosCompostosInputDto = {
        valorInicial: 10000,
        aporteMensal: 500,
        tempoAplicacao: 10,
        tempoAplicacaoUnidade: TempoAplicacaoUnidade.ANOS,
        taxaJuros: 8,
      };

      const resultado = await service.calculaJurosCompostos(input);

      const end = performance.now();
      const tempo = end - start;

      expect(resultado.detalhesMensais).toHaveLength(120);
      expect(tempo).toBeLessThan(100);
    });

    it('should maintain precision with decimal values', async () => {
      const input: JurosCompostosInputDto = {
        valorInicial: 1234.56,
        aporteMensal: 123.45,
        tempoAplicacao: 6,
        tempoAplicacaoUnidade: TempoAplicacaoUnidade.MESES,
        taxaJuros: 7.25,
      };

      const resultado = await service.calculaJurosCompostos(input);

      const totalEsperado = 1234.56 + 123.45 * 6;
      expect(resultado.resumo.totalInvestido).toBeCloseTo(totalEsperado, 2);
      expect(Number.isFinite(resultado.resumo.valorTotalFinalBruto)).toBe(true);
      expect(Number.isFinite(resultado.resumo.totalEmJurosBruto)).toBe(true);
    });
  });
});
