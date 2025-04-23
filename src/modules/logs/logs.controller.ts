import {
  Controller,
  Get,
  Query,
  ParseIntPipe,
  BadRequestException,
} from '@nestjs/common';
import { LogsService } from './logs.service';
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { BetLog, EndGameLog, EnterPortalLog, SignInLog } from './schemas';

@ApiTags('logs')
@Controller('logs')
export class LogsController {
  constructor(private readonly logsService: LogsService) {}

  @Get('top')
  @ApiOperation({ summary: 'Get top N logs by player ID across all types' })
  @ApiQuery({ name: 'playerId', required: true, type: String })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({
    name: 'gameTypeId',
    required: false,
    type: Number,
    description: 'Filter bet logs by game type ID, omit for all games',
  })
  async getTopLogsByPlayerId(
    @Query('playerId') playerId: string,
    @Query('limit', new ParseIntPipe({ optional: true })) limit?: number,
    @Query('gameTypeId', new ParseIntPipe({ optional: true }))
    gameTypeId?: number,
  ): Promise<{
    bets: BetLog[];
    endGames: EndGameLog[];
    enterPortals: EnterPortalLog[];
    signIns: SignInLog[];
  }> {
    return this.logsService.getTopLogsByPlayerId(playerId, limit, gameTypeId);
  }

  @Get('bets/top')
  @ApiOperation({ summary: 'Get top N bet logs by player ID' })
  @ApiQuery({ name: 'playerId', required: true, type: String })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({
    name: 'gameTypeId',
    required: false,
    type: Number,
    description: 'Filter by game type ID, omit for all games',
  })
  async getTopBetLogs(
    @Query('playerId') playerId: string,
    @Query('limit', new ParseIntPipe({ optional: true })) limit?: number,
    @Query('gameTypeId', new ParseIntPipe({ optional: true }))
    gameTypeId?: number,
  ): Promise<BetLog[]> {
    return this.logsService.getTopBetLogs(playerId, limit, gameTypeId);
  }

  @Get('end-games/top')
  @ApiOperation({ summary: 'Get top N end game logs by player ID' })
  @ApiQuery({ name: 'playerId', required: true, type: String })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  async getTopEndGameLogs(
    @Query('playerId') playerId: string,
    @Query('limit', new ParseIntPipe({ optional: true })) limit?: number,
  ): Promise<EndGameLog[]> {
    return this.logsService.getTopEndGameLogs(playerId, limit);
  }

  @Get('enter-portals/top')
  @ApiOperation({ summary: 'Get top N enter portal logs by player ID' })
  @ApiQuery({ name: 'playerId', required: true, type: String })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  async getTopEnterPortalLogs(
    @Query('playerId') playerId: string,
    @Query('limit', new ParseIntPipe({ optional: true })) limit?: number,
  ): Promise<EnterPortalLog[]> {
    return this.logsService.getTopEnterPortalLogs(playerId, limit);
  }

  @Get('sign-ins/top')
  @ApiOperation({ summary: 'Get top N sign in logs by player ID' })
  @ApiQuery({ name: 'playerId', required: true, type: String })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  async getTopSignInLogs(
    @Query('playerId') playerId: string,
    @Query('limit', new ParseIntPipe({ optional: true })) limit?: number,
  ): Promise<SignInLog[]> {
    return this.logsService.getTopSignInLogs(playerId, limit);
  }

  @Get('time-range')
  @ApiOperation({
    summary: 'Get logs by player ID within a time range across all types',
  })
  @ApiQuery({ name: 'playerId', required: true, type: String })
  @ApiQuery({ name: 'startTime', required: true, type: String })
  @ApiQuery({ name: 'endTime', required: true, type: String })
  @ApiQuery({
    name: 'gameTypeId',
    required: false,
    type: Number,
    description: 'Filter bet logs by game type ID, omit for all games',
  })
  async getLogsByPlayerIdAndTimeRange(
    @Query('playerId') playerId: string,
    @Query('startTime') startTime: string,
    @Query('endTime') endTime: string,
    @Query('gameTypeId', new ParseIntPipe({ optional: true }))
    gameTypeId?: number,
  ): Promise<{
    bets: BetLog[];
    endGames: EndGameLog[];
    enterPortals: EnterPortalLog[];
    signIns: SignInLog[];
  }> {
    try {
      // Validate required parameters
      if (!playerId) {
        throw new BadRequestException('playerId is required');
      }
      if (!startTime) {
        throw new BadRequestException('startTime is required');
      }
      if (!endTime) {
        throw new BadRequestException('endTime is required');
      }

      console.log(
        `Time range query params: playerId=${playerId}, startTime=${startTime}, endTime=${endTime}, gameTypeId=${gameTypeId}`,
      );
      return this.logsService.getLogsByPlayerIdAndTimeRange(
        playerId,
        startTime,
        endTime,
        gameTypeId,
      );
    } catch (error) {
      console.error('Error in time range query:', error);
      throw error;
    }
  }

  @Get('bets/time-range')
  @ApiOperation({ summary: 'Get bet logs by player ID within a time range' })
  @ApiQuery({ name: 'playerId', required: true, type: String })
  @ApiQuery({ name: 'startTime', required: true, type: String })
  @ApiQuery({ name: 'endTime', required: true, type: String })
  @ApiQuery({
    name: 'gameTypeId',
    required: false,
    type: Number,
    description: 'Filter by game type ID, omit for all games',
  })
  async getBetLogsByTimeRange(
    @Query('playerId') playerId: string,
    @Query('startTime') startTime: string,
    @Query('endTime') endTime: string,
    @Query('gameTypeId', new ParseIntPipe({ optional: true }))
    gameTypeId?: number,
  ): Promise<BetLog[]> {
    try {
      // Validate required parameters
      if (!playerId) {
        throw new BadRequestException('playerId is required');
      }
      if (!startTime) {
        throw new BadRequestException('startTime is required');
      }
      if (!endTime) {
        throw new BadRequestException('endTime is required');
      }

      console.log(
        `Bet logs time range query: playerId=${playerId}, startTime=${startTime}, endTime=${endTime}, gameTypeId=${gameTypeId}`,
      );
      return this.logsService.getBetLogsByTimeRange(
        playerId,
        startTime,
        endTime,
        gameTypeId,
      );
    } catch (error) {
      console.error('Error in bet logs time range query:', error);
      throw error;
    }
  }

  @Get('end-games/time-range')
  @ApiOperation({
    summary: 'Get end game logs by player ID within a time range',
  })
  @ApiQuery({ name: 'playerId', required: true, type: String })
  @ApiQuery({ name: 'startTime', required: true, type: String })
  @ApiQuery({ name: 'endTime', required: true, type: String })
  async getEndGameLogsByTimeRange(
    @Query('playerId') playerId: string,
    @Query('startTime') startTime: string,
    @Query('endTime') endTime: string,
  ): Promise<EndGameLog[]> {
    try {
      // Validate required parameters
      if (!playerId) {
        throw new BadRequestException('playerId is required');
      }
      if (!startTime) {
        throw new BadRequestException('startTime is required');
      }
      if (!endTime) {
        throw new BadRequestException('endTime is required');
      }

      return this.logsService.getEndGameLogsByTimeRange(
        playerId,
        startTime,
        endTime,
      );
    } catch (error) {
      console.error('Error in end game logs time range query:', error);
      throw error;
    }
  }

  @Get('enter-portals/time-range')
  @ApiOperation({
    summary: 'Get enter portal logs by player ID within a time range',
  })
  @ApiQuery({ name: 'playerId', required: true, type: String })
  @ApiQuery({ name: 'startTime', required: true, type: String })
  @ApiQuery({ name: 'endTime', required: true, type: String })
  async getEnterPortalLogsByTimeRange(
    @Query('playerId') playerId: string,
    @Query('startTime') startTime: string,
    @Query('endTime') endTime: string,
  ): Promise<EnterPortalLog[]> {
    try {
      // Validate required parameters
      if (!playerId) {
        throw new BadRequestException('playerId is required');
      }
      if (!startTime) {
        throw new BadRequestException('startTime is required');
      }
      if (!endTime) {
        throw new BadRequestException('endTime is required');
      }

      return this.logsService.getEnterPortalLogsByTimeRange(
        playerId,
        startTime,
        endTime,
      );
    } catch (error) {
      console.error('Error in enter portal logs time range query:', error);
      throw error;
    }
  }

  @Get('sign-ins/time-range')
  @ApiOperation({
    summary: 'Get sign in logs by player ID within a time range',
  })
  @ApiQuery({ name: 'playerId', required: true, type: String })
  @ApiQuery({ name: 'startTime', required: true, type: String })
  @ApiQuery({ name: 'endTime', required: true, type: String })
  async getSignInLogsByTimeRange(
    @Query('playerId') playerId: string,
    @Query('startTime') startTime: string,
    @Query('endTime') endTime: string,
  ): Promise<SignInLog[]> {
    try {
      // Validate required parameters
      if (!playerId) {
        throw new BadRequestException('playerId is required');
      }
      if (!startTime) {
        throw new BadRequestException('startTime is required');
      }
      if (!endTime) {
        throw new BadRequestException('endTime is required');
      }

      return this.logsService.getSignInLogsByTimeRange(
        playerId,
        startTime,
        endTime,
      );
    } catch (error) {
      console.error('Error in sign in logs time range query:', error);
      throw error;
    }
  }
}
