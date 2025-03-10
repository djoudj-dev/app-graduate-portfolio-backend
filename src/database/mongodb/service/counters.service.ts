import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Counters } from '../schemas/counters.schema';

@Injectable()
export class CountersService {
  constructor(
    @InjectModel(Counters.name) private countersModel: Model<Counters>,
  ) {}

  async incrementCounter(
    counterName: keyof Counters,
  ): Promise<Counters | null> {
    return this.countersModel
      .findOneAndUpdate({}, { $inc: { [counterName]: 1 } }, { new: true })
      .exec();
  }

  async getAllCounters(): Promise<Counters[]> {
    return this.countersModel.find().exec();
  }
}
