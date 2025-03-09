import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Stats } from '../schemas/stats.schema';

@Injectable()
export class StatsService {
  constructor(@InjectModel(Stats.name) private statsModel: Model<Stats>) {}

  async getStats(): Promise<Stats | null> {
    return this.initializeStats();
  }

  async updateStats(data: Partial<Stats>): Promise<Stats | null> {
    return this.statsModel.findOneAndUpdate({}, data, { new: true }).exec();
  }

  async incrementVisits(): Promise<Stats | null> {
    const stats = await this.getStats();
    const updatedStats = {
      totalVisits: (stats?.totalVisits || 0) + 1,
      // Vous pouvez également gérer les visiteurs uniques et les pages vues ici
    };
    return this.updateStats(updatedStats);
  }

  async initializeStats(): Promise<Stats> {
    const existingStats = await this.getStats();
    if (!existingStats) {
      const newStats = new this.statsModel({
        totalVisits: 0,
        uniqueVisitors: 0,
        pageViews: 0,
        lastUpdated: new Date(),
      });
      return newStats.save();
    }
    return existingStats;
  }
}
