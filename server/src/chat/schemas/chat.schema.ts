import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type ChatDocument = HydratedDocument<Chat>;

@Schema()
export class Chat {
  _id: Types.ObjectId;
  
  @Prop({ type: Types.ObjectId, ref: 'Participant', required: true })
  participant: Types.ObjectId;
  
  @Prop({ required: true })
  startTime: Date;
  
  @Prop({ required: true })
  endTime: Date;
  
  @Prop({ required: true })
  currentQuestion: number;
}

export const ChatSchema = SchemaFactory.createForClass(Chat);