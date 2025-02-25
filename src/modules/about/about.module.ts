import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { About } from 'src/database/postgres/entity/about.entity';
import { AboutController } from './about.controller';
import { AboutService } from './about.service';

@Module({
  imports: [TypeOrmModule.forFeature([About])],
  controllers: [AboutController],
  providers: [AboutService, RolesGuard],
  exports: [AboutService],
})
export class AboutModule {}
