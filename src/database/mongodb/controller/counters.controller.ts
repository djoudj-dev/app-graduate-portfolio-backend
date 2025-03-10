import { Body, Controller, Get, Post } from '@nestjs/common';
import { Counters } from '../schemas/counters.schema';
import { CountersService } from '../service/counters.service';

@Controller('counters')
export class CountersController {
  constructor(private readonly countersService: CountersService) {}

  @Get()
  getCounters(): Promise<Counters> {
    return this.countersService.getCounters();
  }

  @Post()
  updateCounters(@Body() counters: Partial<Counters>): Promise<Counters> {
    return this.countersService.updateCounters(counters);
  }
}
