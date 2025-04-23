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
    try {
      console.log('getLogsByPlayerIdAndTimeRange inputs:', {
        playerId,
        startTime,
        endTime,
        gameTypeId,
      });

      // If startTime or endTime is missing, use a default 7-day range
      if (!startTime || !endTime) {
        const now = new Date();
        const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        startTime = oneWeekAgo.toISOString();
        endTime = now.toISOString();
        console.log('Using default date range:', { startTime, endTime });
      }

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
    } catch (error) {
      console.error('Error in getLogsByPlayerIdAndTimeRange:', error);
      throw error;
    }
  }

  async getBetLogsByTimeRange(
    playerId: string,
    startTime: string,
    endTime: string,
    gameTypeId?: number,
  ): Promise<BetLog[]> {
    try {
      // Log the raw inputs
      console.log('getBetLogsByTimeRange inputs:', {
        playerId,
        startTime,
        endTime,
        gameTypeId,
      });

      const query: any = {
        'call.playerId': playerId,
      };

      // Add time range to query if both dates are provided
      if (startTime && endTime) {
        query.logTimeStamp = {
          $gte: startTime,
          $lte: endTime,
        };
        console.log('Date query:', JSON.stringify(query.logTimeStamp));
      } else {
        // If no date range is provided, default to last 7 days
        const now = new Date();
        const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        query.logTimeStamp = {
          $gte: oneWeekAgo.toISOString(),
          $lte: now.toISOString(),
        };
        console.log(
          'Using default date range:',
          JSON.stringify(query.logTimeStamp),
        );
      }

      // Add gameTypeId to query only if it's a positive number
      if (gameTypeId && gameTypeId > 0) {
        query['call.gameTypeId'] = gameTypeId;
      }

      console.log('Final query:', JSON.stringify(query));

      return this.betLogModel
        .find(query)
        .sort({ logTimeStamp: -1 })
        .lean()
        .exec();
    } catch (error) {
      console.error('Error in getBetLogsByTimeRange:', error);
      throw error;
    }
  }

  async getEndGameLogsByTimeRange(
    playerId: string,
    startTime: string,
    endTime: string,
  ): Promise<EndGameLog[]> {
    try {
      const query: any = {
        'call.playerId': playerId,
      };

      // Add time range to query if both dates are provided
      if (startTime && endTime) {
        query.logTimeStamp = {
          $gte: startTime,
          $lte: endTime,
        };
      } else {
        // If no date range is provided, default to last 7 days
        const now = new Date();
        const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        query.logTimeStamp = {
          $gte: oneWeekAgo.toISOString(),
          $lte: now.toISOString(),
        };
      }

      return this.endGameLogModel
        .find(query)
        .sort({ logTimeStamp: -1 })
        .lean()
        .exec();
    } catch (error) {
      console.error('Error in getEndGameLogsByTimeRange:', error);
      throw error;
    }
  }

  async getEnterPortalLogsByTimeRange(
    playerId: string,
    startTime: string,
    endTime: string,
  ): Promise<EnterPortalLog[]> {
    try {
      const query: any = {
        'call.playerId': playerId,
      };

      // Add time range to query if both dates are provided
      if (startTime && endTime) {
        query.logTimeStamp = {
          $gte: startTime,
          $lte: endTime,
        };
      } else {
        // If no date range is provided, default to last 7 days
        const now = new Date();
        const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        query.logTimeStamp = {
          $gte: oneWeekAgo.toISOString(),
          $lte: now.toISOString(),
        };
      }

      return this.enterPortalLogModel
        .find(query)
        .sort({ logTimeStamp: -1 })
        .lean()
        .exec();
    } catch (error) {
      console.error('Error in getEnterPortalLogsByTimeRange:', error);
      throw error;
    }
  }

  async getSignInLogsByTimeRange(
    playerId: string,
    startTime: string,
    endTime: string,
  ): Promise<SignInLog[]> {
    try {
      const query: any = {
        'request.playerId': playerId,
      };

      // Add time range to query if both dates are provided
      if (startTime && endTime) {
        query.logTimeStamp = {
          $gte: startTime,
          $lte: endTime,
        };
      } else {
        // If no date range is provided, default to last 7 days
        const now = new Date();
        const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        query.logTimeStamp = {
          $gte: oneWeekAgo.toISOString(),
          $lte: now.toISOString(),
        };
      }

      return this.signInLogModel
        .find(query)
        .sort({ logTimeStamp: -1 })
        .lean()
        .exec();
    } catch (error) {
      console.error('Error in getSignInLogsByTimeRange:', error);
      throw error;
    }
  }
}
