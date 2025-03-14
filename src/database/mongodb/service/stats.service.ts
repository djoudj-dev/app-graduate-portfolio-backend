import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Stats } from '../schemas/stats.schema';

@Injectable()
export class StatsService {
  constructor(@InjectModel(Stats.name) private statsModel: Model<Stats>) {}

  async getStats(): Promise<Stats | null> {
    const stats = await this.statsModel.findOne().exec();
    console.log('Retrieved stats:', stats);
    return stats;
  }

  async updateStats(data: Partial<Stats>): Promise<Stats | null> {
    console.log('Updating stats with data:', data);
    return this.statsModel
      .findOneAndUpdate({}, data, { new: true, upsert: true })
      .exec();
  }

  async incrementVisits(): Promise<Stats | null> {
    let stats = await this.getStats();
    console.log('Current stats before increment:', stats);

    if (!stats) {
      stats = await this.initializeStats();
    }

    const updatedStats = {
      totalVisits: stats.totalVisits + 1,
      uniqueVisitors: stats.uniqueVisitors,
      pageViews: stats.pageViews + 1,
      lastUpdated: new Date(),
    };

    console.log('Updated stats:', updatedStats);
    return this.updateStats(updatedStats);
  }

  async getRealTimeVisits(): Promise<number> {
    const stats = await this.getStats();
    console.log('Stats retrieved for real-time visits:', stats);
    return stats?.totalVisits ?? 0;
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
