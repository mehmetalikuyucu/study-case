import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type QuestionDocument = HydratedDocument<Question>;

@Schema()
export class Question {
  _id: Types.ObjectId;
  @Prop({ required: true })
  question: string;
}

export const QuestionSchema = SchemaFactory.createForClass(Question);
