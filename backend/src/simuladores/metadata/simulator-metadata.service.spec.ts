import { Test, TestingModule } from '@nestjs/testing';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { SimulatorMetadataService } from './simulator-metadata.service';
import { of } from 'rxjs';

describe('SimulatorMetadataService', () => {
  let service: SimulatorMetadataService;
  let httpService: HttpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SimulatorMetadataService,
        {
          provide: HttpService,
          useValue: {
            get: jest.fn(),
          },
        },
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn().mockReturnValue('http://localhost:1337'),
          },
        },
      ],
    }).compile();

    service = module.get<SimulatorMetadataService>(SimulatorMetadataService);
    httpService = module.get<HttpService>(HttpService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should fetch metadata by slug', async () => {
    const mockResponse = {
      data: {
        data: [
          {
            id: 1,
            attributes: {
              slug: 'test-simulator',
              parameters: { key: 'value' },
            },
          },
        ],
      },
    };

    jest.spyOn(httpService, 'get').mockReturnValue(of(mockResponse as any));

    const result = await service.getMetadataBySlug('test-simulator');
    expect(result).toEqual(mockResponse.data.data[0]);
    expect(httpService.get).toHaveBeenCalledWith(
      'http://localhost:1337/api/simulators?filters[slug][$eq]=test-simulator',
    );
  });

  it('should return null if not found', async () => {
    const mockResponse = {
      data: {
        data: [],
      },
    };

    jest.spyOn(httpService, 'get').mockReturnValue(of(mockResponse as any));

    const result = await service.getMetadataBySlug('not-found');
    expect(result).toBeNull();
  });
});
