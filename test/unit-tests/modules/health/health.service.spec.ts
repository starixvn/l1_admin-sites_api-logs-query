import { Test, TestingModule } from '@nestjs/testing';
import { getConnectionToken } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import { HealthService } from '../../../../src/modules/health/health.service';

describe('HealthService', () => {
  let service: HealthService;
  let mongoConnection: { readyState: number };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        HealthService,
        {
          provide: getConnectionToken(),
          useValue: {
            readyState: 1,
          },
        },
      ],
    }).compile();

    service = module.get<HealthService>(HealthService);
    mongoConnection = module.get(getConnectionToken());
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('check', () => {
    it('should return health status with mongodb up', async () => {
      const result = await service.check();
      expect(result).toEqual({
        status: 'ok',
        timestamp: expect.any(String),
        services: {
          mongodb: 'up',
        },
      });
    });

    it('should return health status with mongodb down', async () => {
      mongoConnection.readyState = 0;
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
