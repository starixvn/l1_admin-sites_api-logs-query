import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { Model, Query } from 'mongoose';
import { LogsService } from '../../../../src/modules/logs/logs.service';
import {
  BetLog,
  EndGameLog,
  EnterPortalLog,
  SignInLog,
} from '../../../../src/modules/logs/schemas';

type MockModel<T> = Partial<Record<keyof Model<T>, jest.Mock>>;
type MockQuery<T> = Partial<Record<keyof Query<T, T>, jest.Mock>>;

describe('LogsService', () => {
  let service: LogsService;
  let betLogModel: MockModel<BetLog>;
  let endGameLogModel: MockModel<EndGameLog>;
  let enterPortalLogModel: MockModel<EnterPortalLog>;
  let signInLogModel: MockModel<SignInLog>;

  const mockLogs = [
    { logTimeStamp: '2024-01-02T00:00:00Z', call: { playerId: '21031988' } },
    { logTimeStamp: '2024-01-01T00:00:00Z', call: { playerId: '21031988' } },
  ];

  const mockSignInLogs = [
    { logTimeStamp: '2024-01-02T00:00:00Z', request: { playerId: '21031988' } },
    { logTimeStamp: '2024-01-01T00:00:00Z', request: { playerId: '21031988' } },
  ];

  const createMockModel = <T>(mockData: T[]) => {
    const mockQuery: MockQuery<T> = {
      sort: jest.fn().mockReturnThis(),
      limit: jest.fn().mockReturnThis(),
      lean: jest.fn().mockReturnThis(),
      exec: jest.fn().mockResolvedValue(mockData),
    };

    return {
      find: jest.fn().mockReturnValue(mockQuery),
    } as MockModel<T>;
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LogsService,
        {
          provide: getModelToken(BetLog.name),
          useValue: createMockModel(mockLogs),
        },
        {
          provide: getModelToken(EndGameLog.name),
          useValue: createMockModel(mockLogs),
        },
        {
          provide: getModelToken(EnterPortalLog.name),
          useValue: createMockModel(mockLogs),
        },
        {
          provide: getModelToken(SignInLog.name),
          useValue: createMockModel(mockSignInLogs),
        },
      ],
    }).compile();

    service = module.get<LogsService>(LogsService);
    betLogModel = module.get<MockModel<BetLog>>(getModelToken(BetLog.name));
    endGameLogModel = module.get<MockModel<EndGameLog>>(
      getModelToken(EndGameLog.name),
    );
    enterPortalLogModel = module.get<MockModel<EnterPortalLog>>(
      getModelToken(EnterPortalLog.name),
    );
    signInLogModel = module.get<MockModel<SignInLog>>(
      getModelToken(SignInLog.name),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getTopLogsByPlayerId', () => {
    it('should return top logs for all types', async () => {
      const result = await service.getTopLogsByPlayerId('21031988', 5);
      expect(result).toEqual({
        bets: mockLogs,
        endGames: mockLogs,
        enterPortals: mockLogs,
        signIns: mockSignInLogs,
      });
    });
  });

  describe('getTopBetLogs', () => {
    it('should return top bet logs', async () => {
      const result = await service.getTopBetLogs('21031988', 5);
      expect(result).toEqual(mockLogs);
      expect(betLogModel.find).toHaveBeenCalledWith({
        'call.playerId': '21031988',
      });
    });
  });

  describe('getTopEndGameLogs', () => {
    it('should return top end game logs', async () => {
      const result = await service.getTopEndGameLogs('21031988', 5);
      expect(result).toEqual(mockLogs);
      expect(endGameLogModel.find).toHaveBeenCalledWith({
        'call.playerId': '21031988',
      });
    });
  });

  describe('getTopEnterPortalLogs', () => {
    it('should return top enter portal logs', async () => {
      const result = await service.getTopEnterPortalLogs('21031988', 5);
      expect(result).toEqual(mockLogs);
      expect(enterPortalLogModel.find).toHaveBeenCalledWith({
        'call.playerId': '21031988',
      });
    });
  });

  describe('getTopSignInLogs', () => {
    it('should return top sign in logs', async () => {
      const result = await service.getTopSignInLogs('21031988', 5);
      expect(result).toEqual(mockSignInLogs);
      expect(signInLogModel.find).toHaveBeenCalledWith({
        'request.playerId': '21031988',
      });
    });
  });

  describe('getLogsByPlayerIdAndTimeRange', () => {
    const startTime = '2024-01-01T00:00:00Z';
    const endTime = '2024-01-02T00:00:00Z';

    it('should return logs for all types within time range', async () => {
      const result = await service.getLogsByPlayerIdAndTimeRange(
        '21031988',
        startTime,
        endTime,
      );
      expect(result).toEqual({
        bets: mockLogs,
        endGames: mockLogs,
        enterPortals: mockLogs,
        signIns: mockSignInLogs,
      });
    });
  });

  describe('getBetLogsByTimeRange', () => {
    const startTime = '2024-01-01T00:00:00Z';
    const endTime = '2024-01-02T00:00:00Z';

    it('should return bet logs within time range', async () => {
      const result = await service.getBetLogsByTimeRange(
        '21031988',
        startTime,
        endTime,
      );
      expect(result).toEqual(mockLogs);
      expect(betLogModel.find).toHaveBeenCalledWith(
        expect.objectContaining({
          'call.playerId': '21031988',
        }),
      );
    });
  });

  describe('getEndGameLogsByTimeRange', () => {
    const startTime = '2024-01-01T00:00:00Z';
    const endTime = '2024-01-02T00:00:00Z';

    it('should return end game logs within time range', async () => {
      const result = await service.getEndGameLogsByTimeRange(
        '21031988',
        startTime,
        endTime,
      );
      expect(result).toEqual(mockLogs);
      expect(endGameLogModel.find).toHaveBeenCalledWith(
        expect.objectContaining({
          'call.playerId': '21031988',
        }),
      );
    });
  });

  describe('getEnterPortalLogsByTimeRange', () => {
    const startTime = '2024-01-01T00:00:00Z';
    const endTime = '2024-01-02T00:00:00Z';

    it('should return enter portal logs within time range', async () => {
      const result = await service.getEnterPortalLogsByTimeRange(
        '21031988',
        startTime,
        endTime,
      );
      expect(result).toEqual(mockLogs);
      expect(enterPortalLogModel.find).toHaveBeenCalledWith(
        expect.objectContaining({
          'call.playerId': '21031988',
        }),
      );
    });
  });

  describe('getSignInLogsByTimeRange', () => {
    const startTime = '2024-01-01T00:00:00Z';
    const endTime = '2024-01-02T00:00:00Z';

    it('should return sign in logs within time range', async () => {
      const result = await service.getSignInLogsByTimeRange(
        '21031988',
        startTime,
        endTime,
      );
      expect(result).toEqual(mockSignInLogs);
      expect(signInLogModel.find).toHaveBeenCalledWith(
        expect.objectContaining({
          'request.playerId': '21031988',
        }),
      );
    });
  });
});
