import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Counters } from '../schemas/counters.schema';

@Injectable()
export class CountersService {
  private counters: Counters;

  constructor(
    @InjectModel(Counters.name) private countersModel: Model<Counters>,
  ) {}

  getCounters(): Promise<Counters> {
    return Promise.resolve(this.counters);
  }

  async updateCounters(counters: Partial<Counters>): Promise<Counters> {
    console.log('Valeurs reçues pour mise à jour:', counters);

    this.counters = new Counters({
      ...this.counters.toObject(),
      ...counters,
    });

    console.log('Nouvelle instance de Counters:', this.counters);

    // Enregistrer les données dans MongoDB
    const updatedCounters = await this.countersModel.findByIdAndUpdate(
      this.counters._id,
      this.counters,
      { new: true, upsert: true },
    );

    console.log('Counters mis à jour dans MongoDB:', updatedCounters);
    return Promise.resolve(this.counters);
  }

  async initializeCounters(): Promise<void> {
    const existingCounters = await this.countersModel.findOne();
    if (!existingCounters) {
      this.counters = new this.countersModel(); // Utiliser le modèle pour créer une instance
      await this.countersModel.create(this.counters);
    } else {
      this.counters = existingCounters; // Utiliser les données existantes
    }
  }
}
