import { Body, Controller, Get, Post } from '@nestjs/common';
import { Counters } from '../schemas/counters.schema';
import { CountersService } from '../service/counters.service';

@Controller('counters')
export class CountersController {
  constructor(private readonly countersService: CountersService) {}

  @Get()
  async getCounters(): Promise<Counters | null> {
    return this.countersService.getCounters();
  }

  @Post()
  async updateCounters(@Body() data: Counters): Promise<Counters | null> {
    return this.countersService.updateCounters(data);
  }
}
