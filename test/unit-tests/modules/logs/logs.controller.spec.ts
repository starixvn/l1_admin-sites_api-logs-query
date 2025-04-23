import { Test, TestingModule } from '@nestjs/testing';
import { LogsController } from '../../../../src/modules/logs/logs.controller';
import { LogsService } from '../../../../src/modules/logs/logs.service';
import {
  BetLog,
  EndGameLog,
  EnterPortalLog,
  SignInLog,
} from '../../../../src/modules/logs/schemas';

describe('LogsController', () => {
  let controller: LogsController;
  let service: LogsService;

  const mockLogs = [
    { logTimeStamp: '2024-01-02T00:00:00Z', call: { playerId: '21031988' } },
    { logTimeStamp: '2024-01-01T00:00:00Z', call: { playerId: '21031988' } },
  ];

  const mockSignInLogs = [
    { logTimeStamp: '2024-01-02T00:00:00Z', request: { playerId: '21031988' } },
    { logTimeStamp: '2024-01-01T00:00:00Z', request: { playerId: '21031988' } },
  ];

  const mockAllLogs = {
    bets: mockLogs,
    endGames: mockLogs,
    enterPortals: mockLogs,
    signIns: mockSignInLogs,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LogsController],
      providers: [
        {
          provide: LogsService,
          useValue: {
            getTopLogsByPlayerId: jest.fn().mockResolvedValue(mockAllLogs),
            getTopBetLogs: jest.fn().mockResolvedValue(mockLogs),
            getTopEndGameLogs: jest.fn().mockResolvedValue(mockLogs),
            getTopEnterPortalLogs: jest.fn().mockResolvedValue(mockLogs),
            getTopSignInLogs: jest.fn().mockResolvedValue(mockSignInLogs),
            getLogsByPlayerIdAndTimeRange: jest
              .fn()
              .mockResolvedValue(mockAllLogs),
            getBetLogsByTimeRange: jest.fn().mockResolvedValue(mockLogs),
            getEndGameLogsByTimeRange: jest.fn().mockResolvedValue(mockLogs),
            getEnterPortalLogsByTimeRange: jest
              .fn()
              .mockResolvedValue(mockLogs),
            getSignInLogsByTimeRange: jest
              .fn()
              .mockResolvedValue(mockSignInLogs),
          },
        },
      ],
    }).compile();

    controller = module.get<LogsController>(LogsController);
    service = module.get<LogsService>(LogsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getTopLogsByPlayerId', () => {
    it('should return top logs for all types', async () => {
      const result = await controller.getTopLogsByPlayerId('21031988', 5);
      expect(result).toEqual(mockAllLogs);
      expect(service.getTopLogsByPlayerId).toHaveBeenCalledWith('21031988', 5);
    });

    it('should use default limit when not provided', async () => {
      await controller.getTopLogsByPlayerId('21031988');
      expect(service.getTopLogsByPlayerId).toHaveBeenCalledWith(
        '21031988',
        undefined,
      );
    });
  });

  describe('getTopBetLogs', () => {
    it('should return top bet logs', async () => {
      const result = await controller.getTopBetLogs('21031988', 5);
      expect(result).toEqual(mockLogs);
      expect(service.getTopBetLogs).toHaveBeenCalledWith('21031988', 5);
    });
  });

  describe('getTopEndGameLogs', () => {
    it('should return top end game logs', async () => {
      const result = await controller.getTopEndGameLogs('21031988', 5);
      expect(result).toEqual(mockLogs);
      expect(service.getTopEndGameLogs).toHaveBeenCalledWith('21031988', 5);
    });
  });

  describe('getTopEnterPortalLogs', () => {
    it('should return top enter portal logs', async () => {
      const result = await controller.getTopEnterPortalLogs('21031988', 5);
      expect(result).toEqual(mockLogs);
      expect(service.getTopEnterPortalLogs).toHaveBeenCalledWith('21031988', 5);
    });
  });

  describe('getTopSignInLogs', () => {
    it('should return top sign in logs', async () => {
      const result = await controller.getTopSignInLogs('21031988', 5);
      expect(result).toEqual(mockSignInLogs);
      expect(service.getTopSignInLogs).toHaveBeenCalledWith('21031988', 5);
    });
  });

  describe('getLogsByPlayerIdAndTimeRange', () => {
    const startTime = '2024-01-01T00:00:00Z';
    const endTime = '2024-01-02T00:00:00Z';

    it('should return logs for all types within time range', async () => {
      const result = await controller.getLogsByPlayerIdAndTimeRange(
        '21031988',
        startTime,
        endTime,
      );
      expect(result).toEqual(mockAllLogs);
      expect(service.getLogsByPlayerIdAndTimeRange).toHaveBeenCalledWith(
        '21031988',
        startTime,
        endTime,
      );
    });
  });

  describe('getBetLogsByTimeRange', () => {
    const startTime = '2024-01-01T00:00:00Z';
    const endTime = '2024-01-02T00:00:00Z';

    it('should return bet logs within time range', async () => {
      const result = await controller.getBetLogsByTimeRange(
        '21031988',
        startTime,
        endTime,
      );
      expect(result).toEqual(mockLogs);
      expect(service.getBetLogsByTimeRange).toHaveBeenCalledWith(
        '21031988',
        startTime,
        endTime,
      );
    });
  });

  describe('getEndGameLogsByTimeRange', () => {
    const startTime = '2024-01-01T00:00:00Z';
    const endTime = '2024-01-02T00:00:00Z';

    it('should return end game logs within time range', async () => {
      const result = await controller.getEndGameLogsByTimeRange(
        '21031988',
        startTime,
        endTime,
      );
      expect(result).toEqual(mockLogs);
      expect(service.getEndGameLogsByTimeRange).toHaveBeenCalledWith(
        '21031988',
        startTime,
        endTime,
      );
    });
  });

  describe('getEnterPortalLogsByTimeRange', () => {
    const startTime = '2024-01-01T00:00:00Z';
    const endTime = '2024-01-02T00:00:00Z';

    it('should return enter portal logs within time range', async () => {
      const result = await controller.getEnterPortalLogsByTimeRange(
        '21031988',
        startTime,
        endTime,
      );
      expect(result).toEqual(mockLogs);
      expect(service.getEnterPortalLogsByTimeRange).toHaveBeenCalledWith(
        '21031988',
        startTime,
        endTime,
      );
    });
  });

  describe('getSignInLogsByTimeRange', () => {
    const startTime = '2024-01-01T00:00:00Z';
    const endTime = '2024-01-02T00:00:00Z';

    it('should return sign in logs within time range', async () => {
      const result = await controller.getSignInLogsByTimeRange(
        '21031988',
        startTime,
        endTime,
      );
      expect(result).toEqual(mockSignInLogs);
      expect(service.getSignInLogsByTimeRange).toHaveBeenCalledWith(
        '21031988',
        startTime,
        endTime,
      );
    });
  });
});
