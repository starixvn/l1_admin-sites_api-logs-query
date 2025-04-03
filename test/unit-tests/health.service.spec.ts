import { Test, TestingModule } from '@nestjs/testing';
import { HealthService } from '../../src/modules/health/health.service';
import { getConnectionToken } from '@nestjs/mongoose';

describe('HealthService', () => {
  let service: HealthService;
  let mockMongoConnection: { readyState: number };

  beforeEach(async () => {
    mockMongoConnection = {
      readyState: 1,
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        HealthService,
        {
          provide: getConnectionToken(),
          useValue: mockMongoConnection,
        },
      ],
    }).compile();

    service = module.get<HealthService>(HealthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('check', () => {
    it('should return up status when mongodb is connected', async () => {
      mockMongoConnection.readyState = 1;
      const result = await service.check();
      expect(result).toEqual({
        status: 'ok',
        timestamp: expect.any(String),
        services: {
          mongodb: 'up',
        },
      });
    });

    it('should return down status when mongodb is disconnected', async () => {
      mockMongoConnection.readyState = 0;
      const result = await service.check();
      expect(result).toEqual({
        status: 'ok',
        timestamp: expect.any(String),
        services: {
          mongodb: 'down',
        },
      });
    });
  });
}); 