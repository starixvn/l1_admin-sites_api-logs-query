import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ collection: 'end_games' })
export class EndGameLog extends Document {
  @Prop({ type: Object })
  _id: { $oid: string };

  @Prop()
  logTimeStamp: string;

  @Prop()
  requestTimeStamp: string;

  @Prop()
  responseTimeStamp: string;

  @Prop()
  operatorId: string;

  @Prop({ type: Object })
  call: {
    _t: string;
    playerId: string;
    siteId: string;
    seq: string;
    gameRoundId: number;
    totalAmount: string;
    totalWin: string;
  };

  @Prop({ type: Object })
  __archive: {
    eventtime: { $date: string };
    v: string;
  };
}

export const EndGameLogSchema = SchemaFactory.createForClass(EndGameLog);
