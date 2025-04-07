import { Test, TestingModule } from '@nestjs/testing';
import { HealthController } from '../../../../src/modules/health/health.controller';
import { HealthService } from '../../../../src/modules/health/health.service';

describe('HealthController', () => {
  let controller: HealthController;
  let service: HealthService;

  const mockHealthResponse = {
    status: 'ok',
    timestamp: '2024-01-01T00:00:00Z',
    services: {
      mongodb: 'up',
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HealthController],
      providers: [
        {
          provide: HealthService,
          useValue: {
            check: jest.fn().mockResolvedValue(mockHealthResponse),
          },
        },
      ],
    }).compile();

    controller = module.get<HealthController>(HealthController);
    service = module.get<HealthService>(HealthService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('checkHealth', () => {
    it('should return health status', async () => {
      const result = await controller.checkHealth();
      expect(result).toEqual(mockHealthResponse);
      expect(service.check).toHaveBeenCalled();
    });
  });
});
