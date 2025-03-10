import { IsEnum } from 'class-validator';
import { Counters } from '../schemas/counters.schema';

export class IncrementCounterDto {
  @IsEnum(['calls', 'cv', 'github', 'linkedin', 'projects', 'websites'], {
    message:
      'counterName must be one of the following: calls, cv, github, linkedin, projects, websites',
  })
  counterName: keyof Counters;
}
