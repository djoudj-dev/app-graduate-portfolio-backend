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

    // Récupérer ou créer un document existant
    let existingCounters = await this.countersModel.findOne();
    if (!existingCounters) {
      existingCounters = new this.countersModel(); // Crée un nouveau document vide
    }

    // Mise à jour des champs
    Object.assign(existingCounters, counters);
    console.log('Nouvelle instance de Counters:', existingCounters);

    // Sauvegarde dans MongoDB
    const updatedCounters = await existingCounters.save();
    console.log('Counters mis à jour dans MongoDB:', updatedCounters);

    return updatedCounters;
  }

  async initializeCounters(): Promise<void> {
    const existingCounters = await this.countersModel.findOne();
    if (!existingCounters) {
      this.counters = new this.countersModel();
      await this.counters.save();
    } else {
      this.counters = existingCounters;
    }
  }
}
