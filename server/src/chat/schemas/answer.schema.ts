import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type AnswerDocument = HydratedDocument<Answer>;

@Schema()
export class Answer {
  _id: Types.ObjectId;
  @Prop({ required: true })
  questionId: Types.ObjectId;
  @Prop({ required: true })
  time: Date;
}

export const AnswerSchema = SchemaFactory.createForClass(Answer);
