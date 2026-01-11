import { Test, TestingModule } from '@nestjs/testing';
import { SimulatorResolver } from './simulator.resolver';
import { SimulatorMetadataService } from '../metadata/simulator-metadata.service';
import { SimulatorRegistry } from '../registry/simulator.registry';
import { ISimulatorStrategy } from '../interfaces/simulator-strategy.interface';
import { NotFoundException } from '@nestjs/common';

describe('SimulatorResolver', () => {
  let resolver: SimulatorResolver;
  let metadataService: SimulatorMetadataService;
  let registry: SimulatorRegistry;

  const mockStrategy: ISimulatorStrategy = {
    getSimulatorType: () => 'mock-type',
    execute: jest.fn().mockResolvedValue({ success: true }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SimulatorResolver,
        {
          provide: SimulatorMetadataService,
          useValue: {
            getMetadataBySlug: jest.fn(),
          },
        },
        {
          provide: SimulatorRegistry,
          useValue: {
            getStrategy: jest.fn(),
          },
        },
      ],
    }).compile();

    resolver = module.get<SimulatorResolver>(SimulatorResolver);
    metadataService = module.get<SimulatorMetadataService>(SimulatorMetadataService);
    registry = module.get<SimulatorRegistry>(SimulatorRegistry);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  it('should resolve and execute strategy successfully', async () => {
    const slug = 'test-simulator';
    const input = { data: 'test' };
    const metadata = {
      attributes: {
        type: 'mock-type',
        parameters: { param: 'value' },
      },
    };

    jest.spyOn(metadataService, 'getMetadataBySlug').mockResolvedValue(metadata as any);
    jest.spyOn(registry, 'getStrategy').mockReturnValue(mockStrategy);

    const result = await resolver.resolveAndExecute(slug, input);

    expect(metadataService.getMetadataBySlug).toHaveBeenCalledWith(slug);
    expect(registry.getStrategy).toHaveBeenCalledWith('mock-type');
    expect(mockStrategy.execute).toHaveBeenCalledWith(input, metadata.attributes.parameters);
    expect(result).toEqual({ success: true });
  });

  it('should throw NotFoundException if metadata not found', async () => {
    jest.spyOn(metadataService, 'getMetadataBySlug').mockResolvedValue(null);

    await expect(resolver.resolveAndExecute('unknown', {})).rejects.toThrow(NotFoundException);
  });

  it('should throw NotFoundException if strategy not found', async () => {
    const metadata = {
      attributes: {
        type: 'unknown-type',
      },
    };

    jest.spyOn(metadataService, 'getMetadataBySlug').mockResolvedValue(metadata as any);
    jest.spyOn(registry, 'getStrategy').mockReturnValue(undefined);

    await expect(resolver.resolveAndExecute('test', {})).rejects.toThrow(NotFoundException);
  });
});
