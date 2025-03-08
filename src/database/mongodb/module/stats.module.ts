import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { StatsController } from '../controller/stats.controller';
import { Stats, StatsSchema } from '../schemas/stats.schema';
import { StatsService } from '../service/stats.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Stats.name, schema: StatsSchema }]),
  ],
  controllers: [StatsController],
  providers: [StatsService],
})
export class StatsModule {}
