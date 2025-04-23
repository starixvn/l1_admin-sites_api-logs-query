import { Controller, Get, Query, ParseIntPipe } from '@nestjs/common';
import { LogsService } from './logs.service';
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { BetLog, EndGameLog, EnterPortalLog, SignInLog } from './schemas';

@ApiTags('logs')
@Controller('logs')
export class LogsController {
  constructor(private readonly logsService: LogsService) {}

  @Get('top')
  @ApiOperation({ summary: 'Get top N logs by player ID across all types' })
  @ApiQuery({ name: 'playerId', required: true, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({
    name: 'gameTypeId',
    required: false,
    type: Number,
    description: 'Filter bet logs by game type ID, omit for all games',
  })
  async getTopLogsByPlayerId(
    @Query('playerId', ParseIntPipe) playerId: number,
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
  @ApiQuery({ name: 'playerId', required: true, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({
    name: 'gameTypeId',
    required: false,
    type: Number,
    description: 'Filter by game type ID, omit for all games',
  })
  async getTopBetLogs(
    @Query('playerId', ParseIntPipe) playerId: number,
    @Query('limit', new ParseIntPipe({ optional: true })) limit?: number,
    @Query('gameTypeId', new ParseIntPipe({ optional: true }))
    gameTypeId?: number,
  ): Promise<BetLog[]> {
    return this.logsService.getTopBetLogs(playerId, limit, gameTypeId);
  }

  @Get('end-games/top')
  @ApiOperation({ summary: 'Get top N end game logs by player ID' })
  @ApiQuery({ name: 'playerId', required: true, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  async getTopEndGameLogs(
    @Query('playerId', ParseIntPipe) playerId: number,
    @Query('limit', new ParseIntPipe({ optional: true })) limit?: number,
  ): Promise<EndGameLog[]> {
    return this.logsService.getTopEndGameLogs(playerId, limit);
  }

  @Get('enter-portals/top')
  @ApiOperation({ summary: 'Get top N enter portal logs by player ID' })
  @ApiQuery({ name: 'playerId', required: true, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  async getTopEnterPortalLogs(
    @Query('playerId', ParseIntPipe) playerId: number,
    @Query('limit', new ParseIntPipe({ optional: true })) limit?: number,
  ): Promise<EnterPortalLog[]> {
    return this.logsService.getTopEnterPortalLogs(playerId, limit);
  }

  @Get('sign-ins/top')
  @ApiOperation({ summary: 'Get top N sign in logs by player ID' })
  @ApiQuery({ name: 'playerId', required: true, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  async getTopSignInLogs(
    @Query('playerId', ParseIntPipe) playerId: number,
    @Query('limit', new ParseIntPipe({ optional: true })) limit?: number,
  ): Promise<SignInLog[]> {
    return this.logsService.getTopSignInLogs(playerId, limit);
  }

  @Get('time-range')
  @ApiOperation({
    summary: 'Get logs by player ID within a time range across all types',
  })
  @ApiQuery({ name: 'playerId', required: true, type: Number })
  @ApiQuery({ name: 'startTime', required: true, type: String })
  @ApiQuery({ name: 'endTime', required: true, type: String })
  @ApiQuery({
    name: 'gameTypeId',
    required: false,
    type: Number,
    description: 'Filter bet logs by game type ID, omit for all games',
  })
  async getLogsByPlayerIdAndTimeRange(
    @Query('playerId', ParseIntPipe) playerId: number,
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
    return this.logsService.getLogsByPlayerIdAndTimeRange(
      playerId,
      startTime,
      endTime,
      gameTypeId,
    );
  }

  @Get('bets/time-range')
  @ApiOperation({ summary: 'Get bet logs by player ID within a time range' })
  @ApiQuery({ name: 'playerId', required: true, type: Number })
  @ApiQuery({ name: 'startTime', required: true, type: String })
  @ApiQuery({ name: 'endTime', required: true, type: String })
  @ApiQuery({
    name: 'gameTypeId',
    required: false,
    type: Number,
    description: 'Filter by game type ID, omit for all games',
  })
  async getBetLogsByTimeRange(
    @Query('playerId', ParseIntPipe) playerId: number,
    @Query('startTime') startTime: string,
    @Query('endTime') endTime: string,
    @Query('gameTypeId', new ParseIntPipe({ optional: true }))
    gameTypeId?: number,
  ): Promise<BetLog[]> {
    return this.logsService.getBetLogsByTimeRange(
      playerId,
      startTime,
      endTime,
      gameTypeId,
    );
  }

  @Get('end-games/time-range')
  @ApiOperation({
    summary: 'Get end game logs by player ID within a time range',
  })
  @ApiQuery({ name: 'playerId', required: true, type: Number })
  @ApiQuery({ name: 'startTime', required: true, type: String })
  @ApiQuery({ name: 'endTime', required: true, type: String })
  async getEndGameLogsByTimeRange(
    @Query('playerId', ParseIntPipe) playerId: number,
    @Query('startTime') startTime: string,
    @Query('endTime') endTime: string,
  ): Promise<EndGameLog[]> {
    return this.logsService.getEndGameLogsByTimeRange(
      playerId,
      startTime,
      endTime,
    );
  }

  @Get('enter-portals/time-range')
  @ApiOperation({
    summary: 'Get enter portal logs by player ID within a time range',
  })
  @ApiQuery({ name: 'playerId', required: true, type: Number })
  @ApiQuery({ name: 'startTime', required: true, type: String })
  @ApiQuery({ name: 'endTime', required: true, type: String })
  async getEnterPortalLogsByTimeRange(
    @Query('playerId', ParseIntPipe) playerId: number,
    @Query('startTime') startTime: string,
    @Query('endTime') endTime: string,
  ): Promise<EnterPortalLog[]> {
    return this.logsService.getEnterPortalLogsByTimeRange(
      playerId,
      startTime,
      endTime,
    );
  }

  @Get('sign-ins/time-range')
  @ApiOperation({
    summary: 'Get sign in logs by player ID within a time range',
  })
  @ApiQuery({ name: 'playerId', required: true, type: Number })
  @ApiQuery({ name: 'startTime', required: true, type: String })
  @ApiQuery({ name: 'endTime', required: true, type: String })
  async getSignInLogsByTimeRange(
    @Query('playerId', ParseIntPipe) playerId: number,
    @Query('startTime') startTime: string,
    @Query('endTime') endTime: string,
  ): Promise<SignInLog[]> {
    return this.logsService.getSignInLogsByTimeRange(
      playerId,
      startTime,
      endTime,
    );
  }
}
