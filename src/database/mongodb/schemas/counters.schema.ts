import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Counters extends Document {
  @Prop({ default: 0 })
  calls: number;
}

export const CountersSchema = SchemaFactory.createForClass(Counters);
