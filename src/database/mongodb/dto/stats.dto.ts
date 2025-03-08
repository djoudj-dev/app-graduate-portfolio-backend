import { Type } from 'class-transformer';
import {
  IsArray,
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  ValidateNested,
} from 'class-validator';

class DataPointDto {
  @IsArray()
  @IsNotEmpty()
  labels: string[];

  @IsArray()
  @IsNotEmpty()
  values: number[];

  @IsArray()
  @IsNotEmpty()
  @IsNumber({}, { each: true })
  clicks: number[];
}

class PeakDataDto {
  @IsNumber()
  value: number;

  @IsDateString()
  date: Date;
}

export class CreateVisitStatDto {
  @IsEnum(['day', 'week', 'month', 'year'])
  period: 'day' | 'week' | 'month' | 'year';

  @ValidateNested()
  @Type(() => DataPointDto)
  data: DataPointDto;

  @IsNumber()
  total?: number;

  @IsNumber()
  average?: number;

  @ValidateNested()
  @Type(() => PeakDataDto)
  peak?: PeakDataDto;

  @ValidateNested()
  @Type(() => PeakDataDto)
  lowest?: PeakDataDto;
}

export class GetStatsQueryDto {
  @IsEnum(['day', 'week', 'month', 'year'])
  period?: 'day' | 'week' | 'month' | 'year';

  @IsDateString()
  startDate?: string;
}
