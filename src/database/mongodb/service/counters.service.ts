import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Counters } from '../schemas/counters.schema';

@Injectable()
export class CountersService {
  private counters: Counters;

  constructor(
    @InjectModel(Counters.name) private countersModel: Model<Counters>,
  ) {
    this.counters = new Counters();
  }

  getCounters(): Promise<Counters> {
    return Promise.resolve(this.counters);
  }

  async updateCounters(counters: Partial<Counters>): Promise<Counters> {
    this.counters = new Counters({
      ...this.counters.toObject(),
      ...counters,
    });

    // Enregistrer les données dans MongoDB
    await this.countersModel.findByIdAndUpdate(
      this.counters._id,
      this.counters,
      { new: true, upsert: true },
    );

    return Promise.resolve(this.counters);
  }

  async initializeCounters(): Promise<void> {
    const existingCounters = await this.countersModel.findOne();
    if (!existingCounters) {
      this.counters = new Counters();
      await this.countersModel.create(this.counters);
    } else {
      this.counters = existingCounters;
    }
  }
}
