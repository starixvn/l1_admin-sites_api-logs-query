import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LogsController } from './logs.controller';
import { LogsService } from './logs.service';
import {
  BetLog,
  BetLogSchema,
  EndGameLog,
  EndGameLogSchema,
  EnterPortalLog,
  EnterPortalLogSchema,
  SignInLog,
  SignInLogSchema,
} from './schemas';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: BetLog.name, schema: BetLogSchema },
      { name: EndGameLog.name, schema: EndGameLogSchema },
      { name: EnterPortalLog.name, schema: EnterPortalLogSchema },
      { name: SignInLog.name, schema: SignInLogSchema },
    ]),
  ],
  controllers: [LogsController],
  providers: [LogsService],
})
export class LogsModule {}
