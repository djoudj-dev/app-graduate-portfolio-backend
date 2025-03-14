import { Body, Controller, Get, Post } from '@nestjs/common';
import { Stats } from '../schemas/stats.schema';
import { StatsService } from '../service/stats.service';

@Controller('stats')
export class StatsController {
  constructor(private readonly statsService: StatsService) {}

  @Get()
  async getStats(): Promise<Stats | null> {
    return this.statsService.getStats();
  }

  @Post()
  async updateStats(@Body() data: Partial<Stats>): Promise<Stats | null> {
    return this.statsService.updateStats(data);
  }

  @Post('increment')
  async incrementVisits(): Promise<Stats | null> {
    console.log('Incrementing visits...');
    return this.statsService.incrementVisits();
  }

  @Get('real-time-visits')
  async getRealTimeVisits(): Promise<number> {
    // 🛠️ Type corrigé
    return this.statsService.getRealTimeVisits();
  }
}
