import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

class DataPoint {
  @Prop({ type: [String] })
  labels: string[];

  @Prop({ type: [Number] })
  values: number[];

  @Prop({ type: [Number] })
  clicks: number[];
}

class PeakData {
  @Prop()
  value: number;

  @Prop()
  date: Date;
}

@Schema({ timestamps: true })
export class VisitStat extends Document {
  @Prop({
    type: String,
    enum: ['day', 'week', 'month', 'year'],
    required: true,
  })
  period: 'day' | 'week' | 'month' | 'year';

  @Prop({ default: Date.now })
  date: Date;

  @Prop({ type: DataPoint })
  data: DataPoint;

  @Prop()
  total: number;

  @Prop()
  average: number;

  @Prop({ type: PeakData })
  peak: PeakData;

  @Prop({ type: PeakData })
  lowest: PeakData;
}

export const VisitStatSchema = SchemaFactory.createForClass(VisitStat);
