import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { StatsController } from '../controller/stats.controller';
import { VisitStat, VisitStatSchema } from '../entity/stats.entity';
import { StatsService } from '../service/stats.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: VisitStat.name, schema: VisitStatSchema },
    ]),
  ],
  controllers: [StatsController],
  providers: [StatsService],
})
export class StatsModule {}
