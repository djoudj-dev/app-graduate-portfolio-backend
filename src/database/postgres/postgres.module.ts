import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AboutSoftSkill } from './entity/about-soft-skill.entity';
import { About } from './entity/about.entity';
import { Project } from './entity/project.entity';
import { Role } from './entity/role.entity';
import { SoftSkill } from './entity/soft-skill.entity';
import { User } from './entity/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('POSTGRES_HOST'),
        port: configService.get<number>('POSTGRES_PORT'),
        username: configService.get<string>('POSTGRES_USERNAME'),
        password: configService.get<string>('POSTGRES_PASSWORD'),
        database: configService.get<string>('POSTGRES_DATABASE'),
        entities: [User, Role, Project, About, SoftSkill, AboutSoftSkill],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([
      User,
      Role,
      Project,
      About,
      SoftSkill,
      AboutSoftSkill,
    ]),
  ],
})
export class PostgresModule {}
