import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type ParticipantDocument = HydratedDocument<Participant>;

@Schema()
export class Participant {
  _id: Types.ObjectId;
  @Prop({ required: true })
  name: string;
  @Prop({ required: true })
  email: string;
  @Prop({ default: Date.now })
  createdAt: Date;
}

export const ParticipantSchema = SchemaFactory.createForClass(Participant);