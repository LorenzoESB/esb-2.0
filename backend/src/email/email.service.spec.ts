import { Test, TestingModule } from '@nestjs/testing';
import { EmailService } from './email.service';
import { EMAIL_PROVIDER, EmailProvider } from './interfaces/email-provider.interface';
import { SimulationEmailPayload } from './dto/simulation-email-payload.dto';

const mockEmailProvider: EmailProvider = {
  sendEmail: jest.fn(),
};

describe('EmailService', () => {
  let service: EmailService;
  let provider: EmailProvider;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EmailService,
        {
          provide: EMAIL_PROVIDER,
          useValue: mockEmailProvider,
        },
      ],
    }).compile();

    service = module.get<EmailService>(EmailService);
    provider = module.get<EmailProvider>(EMAIL_PROVIDER);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should send email successfully', async () => {
    const payload: SimulationEmailPayload = {
      simulationType: 'test_simulation',
      userEmail: 'test@example.com',
      userName: 'Test User',
      input: { value: 100 },
      output: { result: 200 },
      summary: 'Test Summary',
      createdAt: new Date(),
    };

    await service.sendSimulationResult(payload);

    expect(provider.sendEmail).toHaveBeenCalledWith(
      payload.userEmail,
      expect.stringContaining('Seu resultado: test simulation'),
      expect.stringContaining('Test User'),
    );
  });

  it('should handle errors gracefully', async () => {
    (provider.sendEmail as jest.Mock).mockRejectedValueOnce(new Error('Failed to send'));

    const payload: SimulationEmailPayload = {
      simulationType: 'test_simulation',
      userEmail: 'test@example.com',
      userName: 'Test User',
      input: { value: 100 },
      output: { result: 200 },
      summary: 'Test Summary',
      createdAt: new Date(),
    };

    await expect(service.sendSimulationResult(payload)).resolves.not.toThrow();
    expect(provider.sendEmail).toHaveBeenCalled();
  });
});
