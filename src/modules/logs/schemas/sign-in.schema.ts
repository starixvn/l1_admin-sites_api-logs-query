import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ collection: 'signin_requests' })
export class SignInLog extends Document {
  @Prop({ type: Object })
  _id: { $oid: string };

  @Prop()
  logTimeStamp: string;

  @Prop()
  requestTimeStamp: string;

  @Prop()
  responseTimeStamp: string;

  @Prop({ type: Object })
  request: {
    _t: string;
    playerId: string;
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

export const SignInLogSchema = SchemaFactory.createForClass(SignInLog);
