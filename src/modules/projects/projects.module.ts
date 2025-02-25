import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Project } from 'src/database/postgres/entity/project.entity';
import { ProjectsController } from './projects.controller';
import { ProjectService } from './projects.service';

@Module({
  imports: [TypeOrmModule.forFeature([Project])],
  controllers: [ProjectsController],
  providers: [ProjectService, RolesGuard],
  exports: [ProjectService],
})
export class ProjectModule {}
