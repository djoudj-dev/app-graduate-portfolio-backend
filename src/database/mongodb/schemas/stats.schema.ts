import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Stats extends Document {
  @Prop({ default: 0 })
  totalVisits: number;

  @Prop({ default: 0 })
  uniqueVisitors: number;

  @Prop({ default: 0 })
  pageViews: number;

  @Prop({ default: Date.now })
  lastUpdated: Date;
}

export const StatsSchema = SchemaFactory.createForClass(Stats);
