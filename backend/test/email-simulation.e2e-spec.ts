import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../src/app.module';
import { AmortizacaoService } from '../src/simuladores/amortizacao/amortizacao.service';
import { EmailService } from '../src/email/email.service';
import { PrismaService } from '../src/prisma/prisma.service';
import { SimulatorType } from '@prisma/client';

describe('Email Simulation Integration', () => {
  let app: INestApplication;
  let amortizacaoService: AmortizacaoService;
  let emailService: EmailService;
  let prismaService: PrismaService;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(EmailService)
      .useValue({
        sendSimulationResult: jest.fn(),
      })
      .overrideProvider(PrismaService)
      .useValue({
        simulation: {
          create: jest.fn().mockResolvedValue({ id: 1 }),
        },
      })
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    amortizacaoService = moduleFixture.get<AmortizacaoService>(AmortizacaoService);
    emailService = moduleFixture.get<EmailService>(EmailService);
    prismaService = moduleFixture.get<PrismaService>(PrismaService);
  });

  afterAll(async () => {
    await app.close();
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should send email when opt-in is true', async () => {
    const input = {
      valorEmprestimo: 100000,
      taxaJurosAnual: 10,
      prazoMeses: 120,
      email: 'test-optin@example.com',
      nome: 'Test User OptIn',
      email_opt_in_simulation: true,
      sistemaAmortizacao: 'SAC', // Add required field if any
    };

    // We need to cast or ensure input matches DTO. 
    // AmortizacaoInputDto has: valorEmprestimo, taxaJurosAnual, prazoMeses, email, nome, email_opt_in_simulation
    // And sistemaAmortizacao might be optional or default?
    // Let's check AmortizacaoInputDto again.
    // It has: valorEmprestimo, taxaJurosAnual, prazoMeses, email, nome, email_opt_in_simulation.
    // It doesn't seem to have sistemaAmortizacao in the DTO I saw earlier?
    // Wait, AmortizacaoInputDto was:
    // @IsNumber() valorEmprestimo
    // @IsNumber() taxaJurosAnual
    // @IsNumber() prazoMeses
    // @IsEmail() email
    // @IsString() nome
    // @IsBoolean() email_opt_in_simulation
    
    await amortizacaoService.calcularAmortizacao(input as any);

    expect(emailService.sendSimulationResult).toHaveBeenCalledTimes(1);
    expect(emailService.sendSimulationResult).toHaveBeenCalledWith(
      expect.objectContaining({
        userEmail: input.email,
        simulationType: SimulatorType.AMORTIZACAO,
      }),
    );
  });

  it('should NOT send email when opt-in is false', async () => {
    const input = {
      valorEmprestimo: 100000,
      taxaJurosAnual: 10,
      prazoMeses: 120,
      email: 'test-no-optin@example.com',
      nome: 'Test User No OptIn',
      email_opt_in_simulation: false,
    };

    await amortizacaoService.calcularAmortizacao(input as any);

    expect(emailService.sendSimulationResult).not.toHaveBeenCalled();
  });
});
