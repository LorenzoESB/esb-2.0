import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { BadRequestException } from '@nestjs/common';
import { AposentadoriaService } from '../aposentadoria.service';
import {
  SimularAposentadoriaDto,
  ModoCalculoAposentadoria,
} from '../dto/simular-aposentadoria.dto';
import { PrismaService } from '../../../prisma/prisma.service';

describe('AposentadoriaService', () => {
  let service: AposentadoriaService;
  let configService: ConfigService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AposentadoriaService,
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn((key: string, defaultValue?: any) => {
              const config = {
                RETIREMENT_MONTHLY_RATE: 0.005,
                RETIREMENT_LIFE_EXPECTANCY: 86,
              };
              return config[key] ?? defaultValue;
            }),
          },
        },
        {
          provide: PrismaService,
          useValue: {
            simulation: {
              create: jest.fn().mockResolvedValue({}),
            },
          },
        },
      ],
    }).compile();

    service = module.get<AposentadoriaService>(AposentadoriaService);
    configService = module.get<ConfigService>(ConfigService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('deve estar definido', () => {
    expect(service).toBeDefined();
  });

  describe('simular - Modo RECEBER', () => {
    it('deve calcular contribuição necessária para renda desejada de R$ 12.000', async () => {
      const dto: SimularAposentadoriaDto = {
        modoCalculo: ModoCalculoAposentadoria.RECEBER,
        idadeAtual: 28,
        idadeAposentadoria: 50,
        valorJaAcumulado: 50000,
        rendaMensalDesejada: 12000,
        incluirCenariosSaque: true,
      };

      const resultado = await service.simular(dto);

      // Validações estruturais
      expect(resultado).toHaveProperty('parametros');
      expect(resultado).toHaveProperty('acumulacao');
      expect(resultado).toHaveProperty('usufruto');
      expect(resultado).toHaveProperty('sustentabilidade');
      expect(resultado).toHaveProperty('resumo');

      // Validações de parâmetros
      expect(resultado.parametros.idadeAtual).toBe(28);
      expect(resultado.parametros.idadeAposentadoria).toBe(50);
      expect(resultado.parametros.taxaJurosMensal).toBe(0.005);
      expect(resultado.parametros.expectativaVida).toBe(86);

      // Validações de acumulação
      expect(resultado.acumulacao.mesesContribuicao).toBe(264);
      expect(resultado.acumulacao.anosContribuicao).toBe(22);
      expect(resultado.acumulacao.contribuicaoMensal).toBeCloseTo(2836.26, 1);
      expect(resultado.acumulacao.valorFuturoReserva).toBeCloseTo(143439.97, 1);
      expect(resultado.acumulacao.valorTotalAcumulado).toBeCloseTo(
        2121726.04,
        1,
      );

      // Validações de usufruto
      expect(resultado.usufruto.mesesBeneficio).toBe(432);
      expect(resultado.usufruto.rendaMensal).toBe(12000);
      expect(resultado.usufruto.valorTotalRecebido).toBe(12000 * 432);

      // Validações de sustentabilidade
      expect(resultado.sustentabilidade.cenarios.length).toBeGreaterThan(0);
    });

    it('deve calcular corretamente sem reserva inicial', async () => {
      const dto: SimularAposentadoriaDto = {
        modoCalculo: ModoCalculoAposentadoria.RECEBER,
        idadeAtual: 24,
        idadeAposentadoria: 50,
        valorJaAcumulado: 0,
        rendaMensalDesejada: 12000,
        incluirCenariosSaque: false,
      };

      const resultado = await service.simular(dto);

      expect(resultado.acumulacao.mesesContribuicao).toBe(312);
      expect(resultado.acumulacao.valorFuturoReserva).toBe(0);
      expect(resultado.acumulacao.contribuicaoMensal).toBeCloseTo(2836.26, 1);
    });

    it('deve calcular renda menor com menos tempo de acumulação', async () => {
      const dto1: SimularAposentadoriaDto = {
        modoCalculo: ModoCalculoAposentadoria.RECEBER,
        idadeAtual: 40,
        idadeAposentadoria: 50,
        valorJaAcumulado: 0,
        rendaMensalDesejada: 5000,
      };

      const dto2: SimularAposentadoriaDto = {
        modoCalculo: ModoCalculoAposentadoria.RECEBER,
        idadeAtual: 25,
        idadeAposentadoria: 50,
        valorJaAcumulado: 0,
        rendaMensalDesejada: 5000,
      };

      const resultado1 = await service.simular(dto1);
      const resultado2 = await service.simular(dto2);

      // Com menos tempo, precisa contribuir mais por mês
      expect(resultado1.acumulacao.contribuicaoMensal).toBeGreaterThan(
        resultado2.acumulacao.contribuicaoMensal,
      );
    });
  });

  describe('simular - Modo CONTRIBUIR', () => {
    it('deve calcular renda futura com contribuição de R$ 2.000/mês', async () => {
      const dto: SimularAposentadoriaDto = {
        modoCalculo: ModoCalculoAposentadoria.CONTRIBUIR,
        idadeAtual: 30,
        idadeAposentadoria: 55,
        valorJaAcumulado: 100000,
        contribuicaoMensal: 2000,
        incluirCenariosSaque: true,
      };

      const resultado = await service.simular(dto);

      // Validações estruturais
      expect(resultado).toHaveProperty('acumulacao');
      expect(resultado).toHaveProperty('usufruto');

      // Acumulação
      expect(resultado.acumulacao.mesesContribuicao).toBe(300);
      expect(resultado.acumulacao.contribuicaoMensal).toBe(2000);
      expect(resultado.acumulacao.valorTotalAcumulado).toBeGreaterThan(0);

      // Usufruto
      expect(resultado.usufruto.rendaMensal).toBeGreaterThan(0);
      expect(resultado.usufruto.mesesBeneficio).toBe((86 - 55) * 12);

      // Sustentabilidade
      expect(resultado.sustentabilidade.cenarios.length).toBeGreaterThan(0);
    });

    it('deve gerar renda maior com mais tempo de acumulação', async () => {
      const dtoMenosTempo: SimularAposentadoriaDto = {
        modoCalculo: ModoCalculoAposentadoria.CONTRIBUIR,
        idadeAtual: 45,
        idadeAposentadoria: 55,
        valorJaAcumulado: 0,
        contribuicaoMensal: 1000,
      };

      const dtoMaisTempo: SimularAposentadoriaDto = {
        modoCalculo: ModoCalculoAposentadoria.CONTRIBUIR,
        idadeAtual: 25,
        idadeAposentadoria: 55,
        valorJaAcumulado: 0,
        contribuicaoMensal: 1000,
      };

      const resultadoMenosTempo = await service.simular(dtoMenosTempo);
      const resultadoMaisTempo = await service.simular(dtoMaisTempo);

      // Mais tempo de contribuição = maior acumulação = maior renda
      expect(resultadoMaisTempo.acumulacao.valorTotalAcumulado).toBeGreaterThan(
        resultadoMenosTempo.acumulacao.valorTotalAcumulado,
      );
      expect(resultadoMaisTempo.usufruto.rendaMensal).toBeGreaterThan(
        resultadoMenosTempo.usufruto.rendaMensal,
      );
    });
  });

  describe('Validações de negócio', () => {
    it('deve rejeitar idade de aposentadoria menor ou igual à idade atual', async () => {
      const dto: SimularAposentadoriaDto = {
        modoCalculo: ModoCalculoAposentadoria.RECEBER,
        idadeAtual: 50,
        idadeAposentadoria: 50,
        valorJaAcumulado: 0,
        rendaMensalDesejada: 5000,
      };

      expect(() => service.simular(dto)).toThrow(BadRequestException);
      expect(() => service.simular(dto)).toThrow(
        'Idade de aposentadoria deve ser maior que idade atual',
      );
    });

    it('deve rejeitar idade de aposentadoria maior que expectativa de vida', async () => {
      const dto: SimularAposentadoriaDto = {
        modoCalculo: ModoCalculoAposentadoria.RECEBER,
        idadeAtual: 30,
        idadeAposentadoria: 90,
        valorJaAcumulado: 0,
        rendaMensalDesejada: 5000,
      };

      expect(() => service.simular(dto)).toThrow(BadRequestException);
      expect(() => service.simular(dto)).toThrow(/expectativa de vida/);
    });

    it('deve rejeitar modo RECEBER sem renda desejada', async () => {
      const dto: SimularAposentadoriaDto = {
        modoCalculo: ModoCalculoAposentadoria.RECEBER,
        idadeAtual: 30,
        idadeAposentadoria: 55,
        valorJaAcumulado: 0,
        // rendaMensalDesejada: undefined
      };

      expect(() => service.simular(dto)).toThrow(BadRequestException);
      expect(() => service.simular(dto)).toThrow(/Renda mensal desejada/);
    });

    it('deve rejeitar modo CONTRIBUIR sem contribuição mensal', async () => {
      const dto: SimularAposentadoriaDto = {
        modoCalculo: ModoCalculoAposentadoria.CONTRIBUIR,
        idadeAtual: 30,
        idadeAposentadoria: 55,
        valorJaAcumulado: 0,
        // contribuicaoMensal: undefined
      };

      expect(() => service.simular(dto)).toThrow(BadRequestException);
      expect(() => service.simular(dto)).toThrow(/Contribuição mensal/);
    });
  });

  describe('Sustentabilidade', () => {
    it('deve gerar cenários de saque quando solicitado', async () => {
      const dto: SimularAposentadoriaDto = {
        modoCalculo: ModoCalculoAposentadoria.RECEBER,
        idadeAtual: 30,
        idadeAposentadoria: 55,
        valorJaAcumulado: 0,
        rendaMensalDesejada: 8000,
        incluirCenariosSaque: true,
      };

      const resultado = await service.simular(dto);

      expect(resultado.sustentabilidade.cenarios).toBeDefined();
      expect(resultado.sustentabilidade.cenarios.length).toBeGreaterThan(0);

      // Validar estrutura dos cenários
      resultado.sustentabilidade.cenarios.forEach((cenario) => {
        expect(cenario).toHaveProperty('valorSaqueMensal');
        expect(cenario).toHaveProperty('duracaoMeses');
        expect(cenario).toHaveProperty('consumePrincipal');
        expect(cenario).toHaveProperty('observacao');
      });
    });

    it('não deve gerar cenários quando não solicitado', async () => {
      const dto: SimularAposentadoriaDto = {
        modoCalculo: ModoCalculoAposentadoria.RECEBER,
        idadeAtual: 30,
        idadeAposentadoria: 55,
        valorJaAcumulado: 0,
        rendaMensalDesejada: 8000,
        incluirCenariosSaque: false,
      };

      const resultado = await service.simular(dto);

      expect(resultado.sustentabilidade.cenarios).toEqual([]);
    });

    it('deve identificar saques sustentáveis vs que consomem principal', async () => {
      const dto: SimularAposentadoriaDto = {
        modoCalculo: ModoCalculoAposentadoria.CONTRIBUIR,
        idadeAtual: 30,
        idadeAposentadoria: 50,
        valorJaAcumulado: 0,
        contribuicaoMensal: 3000,
        incluirCenariosSaque: true,
      };

      const resultado = await service.simular(dto);

      const cenariosComConsumo = resultado.sustentabilidade.cenarios.filter(
        (c) => c.consumePrincipal,
      );
      const cenariosSustentaveis = resultado.sustentabilidade.cenarios.filter(
        (c) => !c.consumePrincipal,
      );

      // Deve ter ambos os tipos
      expect(cenariosComConsumo.length).toBeGreaterThan(0);
      expect(cenariosSustentaveis.length).toBeGreaterThan(0);

      // Cenários sustentáveis devem ter duração infinita (-1)
      cenariosSustentaveis.forEach((c) => {
        expect(c.duracaoMeses).toBe(-1);
      });
    });
  });

  describe('Resumo', () => {
    it('deve calcular resumo executivo corretamente', async () => {
      const dto: SimularAposentadoriaDto = {
        modoCalculo: ModoCalculoAposentadoria.RECEBER,
        idadeAtual: 30,
        idadeAposentadoria: 50,
        valorJaAcumulado: 100000,
        rendaMensalDesejada: 10000,
      };

      const resultado = await service.simular(dto);

      // Validar cálculos do resumo
      expect(resultado.resumo.totalInvestido).toBeGreaterThan(
        dto.valorJaAcumulado,
      );
      expect(resultado.resumo.totalRecebido).toBe(
        resultado.usufruto.valorTotalRecebido,
      );
      expect(resultado.resumo.saldoPatrimonial).toBe(
        resultado.resumo.totalRecebido - resultado.resumo.totalInvestido,
      );

      // Geralmente o saldo patrimonial é positivo (recebe mais do que investiu)
      expect(resultado.resumo.saldoPatrimonial).toBeGreaterThan(0);
    });

    it('deve incluir reserva inicial no total investido', async () => {
      const reserva = 50000;
      const dto: SimularAposentadoriaDto = {
        modoCalculo: ModoCalculoAposentadoria.CONTRIBUIR,
        idadeAtual: 35,
        idadeAposentadoria: 55,
        valorJaAcumulado: reserva,
        contribuicaoMensal: 1500,
      };

      const resultado = await service.simular(dto);

      const totalContribuicoes =
        resultado.acumulacao.contribuicaoMensal *
        resultado.acumulacao.mesesContribuicao;

      expect(resultado.resumo.totalInvestido).toBeCloseTo(
        reserva + totalContribuicoes,
        0,
      );
    });
  });

  describe('Configuração personalizada', () => {
    it('deve usar configuração customizada do ConfigService', async () => {
      const customConfigService = {
        get: jest.fn((key: string, defaultValue?: any) => {
          if (key === 'RETIREMENT_MONTHLY_RATE') return 0.004; // 0.4% a.m.
          if (key === 'RETIREMENT_LIFE_EXPECTANCY') return 80;
          return defaultValue;
        }),
      };

      const module: TestingModule = await Test.createTestingModule({
        providers: [
          AposentadoriaService,
          {
            provide: ConfigService,
            useValue: customConfigService,
          },
        ],
      }).compile();

      const customService =
        module.get<AposentadoriaService>(AposentadoriaService);

      const dto: SimularAposentadoriaDto = {
        modoCalculo: ModoCalculoAposentadoria.RECEBER,
        idadeAtual: 30,
        idadeAposentadoria: 50,
        valorJaAcumulado: 0,
        rendaMensalDesejada: 5000,
      };

      const resultado = await customService.simular(dto);

      expect(resultado.parametros.taxaJurosMensal).toBe(0.004);
      expect(resultado.parametros.expectativaVida).toBe(80);
      expect(resultado.usufruto.mesesBeneficio).toBe((80 - 50) * 12);
    });
  });
});
