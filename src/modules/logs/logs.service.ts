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

  async getTopLogsByPlayerId(playerId: number, limit: number = 10) {
    const [bets, endGames, enterPortals, signIns] = await Promise.all([
      this.getTopBetLogs(playerId, limit),
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

  async getTopBetLogs(playerId: number, limit: number = 10): Promise<BetLog[]> {
    return this.betLogModel
      .find({ 'call.playerId': playerId })
      .sort({ logTimeStamp: -1 })
      .limit(limit)
      .lean()
      .exec();
  }

  async getTopEndGameLogs(
    playerId: number,
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
    playerId: number,
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
    playerId: number,
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
    playerId: number,
    startTime: string,
    endTime: string,
  ) {
    const [bets, endGames, enterPortals, signIns] = await Promise.all([
      this.getBetLogsByTimeRange(playerId, startTime, endTime),
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
    playerId: number,
    startTime: string,
    endTime: string,
  ): Promise<BetLog[]> {
    return this.betLogModel
      .find({
        'call.playerId': playerId,
        logTimeStamp: { $gte: startTime, $lte: endTime },
      })
      .sort({ logTimeStamp: -1 })
      .lean()
      .exec();
  }

  async getEndGameLogsByTimeRange(
    playerId: number,
    startTime: string,
    endTime: string,
  ): Promise<EndGameLog[]> {
    return this.endGameLogModel
      .find({
        'call.playerId': playerId,
        logTimeStamp: { $gte: startTime, $lte: endTime },
      })
      .sort({ logTimeStamp: -1 })
      .lean()
      .exec();
  }

  async getEnterPortalLogsByTimeRange(
    playerId: number,
    startTime: string,
    endTime: string,
  ): Promise<EnterPortalLog[]> {
    return this.enterPortalLogModel
      .find({
        'call.playerId': playerId,
        logTimeStamp: { $gte: startTime, $lte: endTime },
      })
      .sort({ logTimeStamp: -1 })
      .lean()
      .exec();
  }

  async getSignInLogsByTimeRange(
    playerId: number,
    startTime: string,
    endTime: string,
  ): Promise<SignInLog[]> {
    return this.signInLogModel
      .find({
        'request.playerId': playerId,
        logTimeStamp: { $gte: startTime, $lte: endTime },
      })
      .sort({ logTimeStamp: -1 })
      .lean()
      .exec();
  }
}
