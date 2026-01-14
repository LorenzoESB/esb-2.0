import { Test, TestingModule } from '@nestjs/testing';
import { EmprestimoService } from '../emprestimo.service';
import { PrismaService } from '../../../prisma/prisma.service';
import { SimulatorMetadataService } from '../../metadata/simulator-metadata.service';
import { SimulatorRegistry } from '../../registry/simulator.registry';
import { EmailService } from '../../../email/email.service';
import { SimularEmprestimoDto, TipoPessoa, TipoEmprego } from '../dto/simular-emprestimo.dto';
import { SimulatorType } from '@prisma/client';

describe('EmprestimoService', () => {
  let service: EmprestimoService;
  let prismaService: PrismaService;
  let emailService: EmailService;

  const mockPrismaService = {
    simulation: {
      create: jest.fn().mockResolvedValue({ id: 1 }),
    },
  };

  const mockEmailService = {
    sendSimulationResult: jest.fn().mockResolvedValue(undefined),
  };

  const mockMetadataService = {
    getMetadataByType: jest.fn().mockResolvedValue([]),
  };

  const mockRegistry = {
    register: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EmprestimoService,
        { provide: PrismaService, useValue: mockPrismaService },
        { provide: EmailService, useValue: mockEmailService },
        { provide: SimulatorMetadataService, useValue: mockMetadataService },
        { provide: SimulatorRegistry, useValue: mockRegistry },
      ],
    }).compile();

    service = module.get<EmprestimoService>(EmprestimoService);
    prismaService = module.get<PrismaService>(PrismaService);
    emailService = module.get<EmailService>(EmailService);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('simular', () => {
    it('should save simulation and send email when opt-in is true', async () => {
      const dto: SimularEmprestimoDto = {
        nome: 'Test User',
        email: 'test@example.com',
        tipoPessoa: TipoPessoa.PF,
        tipoEmprego: TipoEmprego.CLT,
        valorDesejado: 10000,
        prazoMeses: 12,
        email_opt_in_simulation: true,
        email_opt_in_content: true,
      };

      await service.simular(dto);

      expect(prismaService.simulation.create).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({
            email: dto.email,
            email_opt_in_simulation: true,
            email_opt_in_content: true,
            email_opt_in_at: expect.any(Date),
            simulatorType: SimulatorType.EMPRESTIMO,
          }),
        }),
      );

      expect(emailService.sendSimulationResult).toHaveBeenCalledWith(
        expect.objectContaining({
          simulationType: SimulatorType.EMPRESTIMO,
          userEmail: dto.email,
          userName: dto.nome,
          input: expect.any(Object),
          output: expect.any(Object),
        }),
      );
    });

    it('should save simulation but NOT send email when opt-in is false', async () => {
      const dto: SimularEmprestimoDto = {
        nome: 'Test User',
        email: 'test@example.com',
        tipoPessoa: TipoPessoa.PF,
        tipoEmprego: TipoEmprego.CLT,
        valorDesejado: 10000,
        prazoMeses: 12,
        email_opt_in_simulation: false,
        email_opt_in_content: false,
      };

      await service.simular(dto);

      expect(prismaService.simulation.create).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({
            email: dto.email,
            email_opt_in_simulation: false,
            email_opt_in_content: false,
            email_opt_in_at: null,
            simulatorType: SimulatorType.EMPRESTIMO,
          }),
        }),
      );

      expect(emailService.sendSimulationResult).not.toHaveBeenCalled();
    });

    it('should default email_opt_in_content to false if undefined', async () => {
        const dto: SimularEmprestimoDto = {
          nome: 'Test User',
          email: 'test@example.com',
          tipoPessoa: TipoPessoa.PF,
          tipoEmprego: TipoEmprego.CLT,
          valorDesejado: 10000,
          prazoMeses: 12,
          email_opt_in_simulation: true,
          // email_opt_in_content undefined
        };
  
        await service.simular(dto);
  
        expect(prismaService.simulation.create).toHaveBeenCalledWith(
          expect.objectContaining({
            data: expect.objectContaining({
              email_opt_in_content: false,
            }),
          }),
        );
      });
  });
});
