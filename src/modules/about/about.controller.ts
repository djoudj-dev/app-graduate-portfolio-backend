import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { Roles, UserRole } from 'src/common/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { About } from 'src/database/postgres/entity/about.entity';
import { AboutService } from './about.service';

@Controller('about')
export class AboutController {
  constructor(private readonly aboutService: AboutService) {}

  @Get()
  findAll(): Promise<About[]> {
    return this.aboutService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<About> {
    return this.aboutService.findOne(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  create(@Body() about: About): Promise<About> {
    return this.aboutService.create(about);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  update(@Param('id') id: string, @Body() about: About): Promise<About> {
    return this.aboutService.update(id, about);
  }
}
