import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Counters } from '../schemas/counters.schema';

@Injectable()
export class CountersService {
  constructor(
    @InjectModel(Counters.name)
    private countersModel: Model<Counters>,
  ) {}

  async getCounters(): Promise<Counters | null> {
    return this.countersModel.findOne().exec();
  }

  async updateCounters(data: Counters): Promise<Counters | null> {
    return this.countersModel.findOneAndUpdate({}, data, { new: true }).exec();
  }
}
