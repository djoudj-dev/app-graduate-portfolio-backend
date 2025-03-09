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

  async incrementCounter(key: keyof Counters): Promise<Counters | null> {
    console.log(`Incrementing counter: ${key}`); // Log for debugging
    const counters = await this.getCounters();

    if (!counters) {
      throw new Error('Counters not found'); // Handle the case where counters is null
    }

    const updatedCounters: Counters = {
      ...counters.toObject(),
      [key]: (counters[key] || 0) + 1,
    };

    return this.updateCounters(updatedCounters);
  }
}
