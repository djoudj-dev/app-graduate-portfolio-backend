import { Body, Controller, NotFoundException, Post } from '@nestjs/common';
import { IncrementCounterDto } from '../dto/counters.dto';
import { CountersService } from '../service/counters.service';

@Controller('counters')
export class CountersController {
  constructor(private readonly countersService: CountersService) {}

  @Post('increment')
  async incrementCounter(@Body() incrementCounterDto: IncrementCounterDto) {
    const { counterName } = incrementCounterDto;

    const updatedCounters =
      await this.countersService.incrementCounter(counterName);
    if (!updatedCounters) {
      throw new NotFoundException('Counters not found');
    }

    return updatedCounters;
  }
}
