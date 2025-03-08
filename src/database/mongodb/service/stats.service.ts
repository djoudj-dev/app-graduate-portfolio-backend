import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateVisitStatDto, GetStatsQueryDto } from '../dto/stats.dto';
import { VisitStat } from '../entity/stats.entity';

@Injectable()
export class StatsService {
  constructor(
    @InjectModel(VisitStat.name)
    private readonly visitStatModel: Model<VisitStat>,
  ) {}

  async getStats(queryParams: GetStatsQueryDto): Promise<VisitStat> {
    const { period, startDate } = queryParams;
    const query: Record<string, unknown> = {};

    if (period) query.period = period;
    if (startDate) query.date = { $gte: new Date(startDate) };

    const stats = await this.visitStatModel
      .findOne(query)
      .sort({ date: -1 })
      .lean()
      .exec();

    if (!stats) {
      throw new NotFoundException('Statistiques non trouvées');
    }

    return stats as VisitStat;
  }

  async create(createVisitStatDto: CreateVisitStatDto): Promise<VisitStat> {
    const statsData = { ...createVisitStatDto };

    if (statsData.data?.values?.length) {
      statsData.total = statsData.data.values.reduce(
        (acc, curr) => acc + curr,
        0,
      );
      statsData.average = statsData.total / statsData.data.values.length;

      // Calcul du pic
      const peakValue = Math.max(...statsData.data.values);
      const peakIndex = statsData.data.values.indexOf(peakValue);
      statsData.peak = {
        value: peakValue,
        date: new Date(
          new Date().setDate(
            new Date().getDate() -
              (statsData.data.values.length - 1 - peakIndex),
          ),
        ),
      };

      // Calcul du plus bas
      const lowestValue = Math.min(...statsData.data.values);
      const lowestIndex = statsData.data.values.indexOf(lowestValue);
      statsData.lowest = {
        value: lowestValue,
        date: new Date(
          new Date().setDate(
            new Date().getDate() -
              (statsData.data.values.length - 1 - lowestIndex),
          ),
        ),
      };
    }

    try {
      return (await new this.visitStatModel(statsData).save()) as VisitStat;
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new InternalServerErrorException(error.message);
      }
      throw new InternalServerErrorException(
        "Une erreur inconnue est survenue lors de l'enregistrement des statistiques.",
      );
    }
  }
}
