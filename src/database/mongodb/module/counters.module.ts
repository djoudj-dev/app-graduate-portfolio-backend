import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CountersController } from '../controller/counters.controller';
import { Counters, CountersSchema } from '../schemas/counters.schema';
import { CountersService } from '../service/counters.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Counters.name, schema: CountersSchema },
    ]),
  ],
  controllers: [CountersController],
  providers: [CountersService],
  exports: [CountersService],
})
export class CountersModule {}
