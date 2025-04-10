import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ collection: 'enter_portals' })
export class EnterPortalLog extends Document {
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
    playerId: number;
    siteId: string;
    seq: string;
    operatorToken: string;
  };

  @Prop({ type: Object })
  __archive: {
    eventtime: { $date: string };
    v: string;
  };
}

export const EnterPortalLogSchema =
  SchemaFactory.createForClass(EnterPortalLog);
