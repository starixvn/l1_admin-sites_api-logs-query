import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BetLog, EndGameLog, EnterPortalLog, SignInLog } from './schemas';

@Injectable()
export class LogsService {
  constructor(
    @InjectModel(BetLog.name) private betLogModel: Model<BetLog>,
    @InjectModel(EndGameLog.name) private endGameLogModel: Model<EndGameLog>,
    @InjectModel(EnterPortalLog.name)
    private enterPortalLogModel: Model<EnterPortalLog>,
    @InjectModel(SignInLog.name) private signInLogModel: Model<SignInLog>,
  ) {}

  async getTopLogsByPlayerId(
    playerId: string,
    limit: number = 10,
    gameTypeId?: number,
  ) {
    const [bets, endGames, enterPortals, signIns] = await Promise.all([
      this.getTopBetLogs(playerId, limit, gameTypeId),
      this.getTopEndGameLogs(playerId, limit),
      this.getTopEnterPortalLogs(playerId, limit),
      this.getTopSignInLogs(playerId, limit),
    ]);

    return {
      bets,
      endGames,
      enterPortals,
      signIns,
    };
  }

  async getTopBetLogs(
    playerId: string,
    limit: number = 10,
    gameTypeId?: number,
  ): Promise<BetLog[]> {
    const query: any = { 'call.playerId': playerId };

    // Add gameTypeId to query only if it's a positive number
    if (gameTypeId && gameTypeId > 0) {
      query['call.gameTypeId'] = gameTypeId;
    }

    return this.betLogModel
      .find(query)
      .sort({ logTimeStamp: -1 })
      .limit(limit)
      .lean()
      .exec();
  }

  async getTopEndGameLogs(
    playerId: string,
    limit: number = 10,
  ): Promise<EndGameLog[]> {
    return this.endGameLogModel
      .find({ 'call.playerId': playerId })
      .sort({ logTimeStamp: -1 })
      .limit(limit)
      .lean()
      .exec();
  }

  async getTopEnterPortalLogs(
    playerId: string,
    limit: number = 10,
  ): Promise<EnterPortalLog[]> {
    return this.enterPortalLogModel
      .find({ 'call.playerId': playerId })
      .sort({ logTimeStamp: -1 })
      .limit(limit)
      .lean()
      .exec();
  }

  async getTopSignInLogs(
    playerId: string,
    limit: number = 10,
  ): Promise<SignInLog[]> {
    return this.signInLogModel
      .find({ 'request.playerId': playerId })
      .sort({ logTimeStamp: -1 })
      .limit(limit)
      .lean()
      .exec();
  }

  async getLogsByPlayerIdAndTimeRange(
    playerId: string,
    startTime: string,
    endTime: string,
    gameTypeId?: number,
  ) {
    const [bets, endGames, enterPortals, signIns] = await Promise.all([
      this.getBetLogsByTimeRange(playerId, startTime, endTime, gameTypeId),
      this.getEndGameLogsByTimeRange(playerId, startTime, endTime),
      this.getEnterPortalLogsByTimeRange(playerId, startTime, endTime),
      this.getSignInLogsByTimeRange(playerId, startTime, endTime),
    ]);

    return {
      bets,
      endGames,
      enterPortals,
      signIns,
    };
  }

  async getBetLogsByTimeRange(
    playerId: string,
    startTime: string,
    endTime: string,
    gameTypeId?: number,
  ): Promise<BetLog[]> {
    const query: any = {
      'call.playerId': playerId,
      logTimeStamp: {
        $gte: new Date(startTime).toISOString(),
        $lte: new Date(endTime).toISOString(),
      },
    };

    // Add gameTypeId to query only if it's a positive number
    if (gameTypeId && gameTypeId > 0) {
      query['call.gameTypeId'] = gameTypeId;
    }

    return this.betLogModel
      .find(query)
      .sort({ logTimeStamp: -1 })
      .lean()
      .exec();
  }

  async getEndGameLogsByTimeRange(
    playerId: string,
    startTime: string,
    endTime: string,
  ): Promise<EndGameLog[]> {
    return this.endGameLogModel
      .find({
        'call.playerId': playerId,
        logTimeStamp: {
          $gte: new Date(startTime).toISOString(),
          $lte: new Date(endTime).toISOString(),
        },
      })
      .sort({ logTimeStamp: -1 })
      .lean()
      .exec();
  }

  async getEnterPortalLogsByTimeRange(
    playerId: string,
    startTime: string,
    endTime: string,
  ): Promise<EnterPortalLog[]> {
    return this.enterPortalLogModel
      .find({
        'call.playerId': playerId,
        logTimeStamp: {
          $gte: new Date(startTime).toISOString(),
          $lte: new Date(endTime).toISOString(),
        },
      })
      .sort({ logTimeStamp: -1 })
      .lean()
      .exec();
  }

  async getSignInLogsByTimeRange(
    playerId: string,
    startTime: string,
    endTime: string,
  ): Promise<SignInLog[]> {
    return this.signInLogModel
      .find({
        'request.playerId': playerId,
        logTimeStamp: {
          $gte: new Date(startTime).toISOString(),
          $lte: new Date(endTime).toISOString(),
        },
      })
      .sort({ logTimeStamp: -1 })
      .lean()
      .exec();
  }
}
