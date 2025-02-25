import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PostgresModule } from './database/postgres/postgres.module';
import { AboutModule } from './modules/about/about.module';
import { ProjectModule } from './modules/projects/projects.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `${process.env.NODE_ENV || 'development'}.env`,
      isGlobal: true,
    }),
    PostgresModule,
    AuthModule,
    ProjectModule,
    AboutModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
