import { Test, TestingModule } from '@nestjs/testing';
import { JurosCompostosController } from '../juros-compostos.controller';
import { JurosCompostosService } from '../juros-compostos.service';
import {
  JurosCompostosInputDto,
  TempoAplicacaoUnidade,
} from '../dto/juros-compostos-input.dto';
import { JurosCompostosDetalhadoOutputDto } from '../dto/juros-compostos-output.dto';

describe('JurosCompostosController', () => {
  let controller: JurosCompostosController;
  let service: JurosCompostosService;

  const mockService = {
    calculaJurosCompostos: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [JurosCompostosController],
      providers: [
        {
          provide: JurosCompostosService,
          useValue: mockService,
        },
      ],
    }).compile();

    controller = module.get<JurosCompostosController>(JurosCompostosController);
    service = module.get<JurosCompostosService>(JurosCompostosService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('calculaJurosCompostos', () => {
    it('should call service and return formatted response', async () => {
      const input: JurosCompostosInputDto = {
        valorInicial: 10000,
        aporteMensal: 500,
        tempoAplicacao: 3,
        tempoAplicacaoUnidade: TempoAplicacaoUnidade.ANOS,
        taxaJuros: 11,
      };

      const expectedOutput: JurosCompostosDetalhadoOutputDto = {
        resumo: {
          valorTotalFinalBruto: 34720.85,
          totalInvestido: 28000,
          totalEmJurosBruto: 6720.85,
        },
        detalhesMensais: [],
      };

      mockService.calculaJurosCompostos.mockResolvedValue(expectedOutput);

      const result = await controller.calculaJurosCompostos(input);

      expect(service.calculaJurosCompostos).toHaveBeenCalledWith(input);
      expect(result).toEqual({
        message: 'Compound interest calculation received',
        data: expectedOutput,
      });
    });

    it('should handle service errors', async () => {
      const input: JurosCompostosInputDto = {
        valorInicial: 10000,
        aporteMensal: 500,
        tempoAplicacao: 3,
        tempoAplicacaoUnidade: TempoAplicacaoUnidade.ANOS,
        taxaJuros: 11,
      };

      const error = new Error('Service error');
      mockService.calculaJurosCompostos.mockRejectedValue(error);

      await expect(controller.calculaJurosCompostos(input)).rejects.toThrow(
        error,
      );
      expect(service.calculaJurosCompostos).toHaveBeenCalledWith(input);
    });
  });
});
