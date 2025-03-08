import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Post,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { CreateVisitStatDto, GetStatsQueryDto } from '../dto/stats.dto';
import { VisitStat } from '../entity/stats.entity';
import { StatsService } from '../service/stats.service';

@Controller('api/stats')
export class StatsController {
  constructor(private readonly statsService: StatsService) {}

  @Get()
  async getStats(
    @Query(new ValidationPipe({ transform: true })) query: GetStatsQueryDto,
  ): Promise<VisitStat> {
    const stats = await this.statsService.getStats(query);

    if (!stats) {
      throw new NotFoundException('Aucune statistique trouvée');
    }

    return stats;
  }

  @Post()
  async createStats(
    @Body(ValidationPipe) createVisitStatDto: CreateVisitStatDto,
  ): Promise<VisitStat> {
    return this.statsService.create(createVisitStatDto);
  }
}
