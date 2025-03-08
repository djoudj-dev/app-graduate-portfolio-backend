import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { CountersModule } from './database/mongodb/module/counters.module';
import { StatsModule } from './database/mongodb/module/stats.module';
import { PostgresModule } from './database/postgres/postgres.module';
import { AboutModule } from './modules/about/about.module';
import { ProjectModule } from './modules/projects/projects.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `${process.env.NODE_ENV || 'development'}.env`,
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_URL'),
        connectTimeoutMS: 60000, // Augmenter le délai d'attente à 60 secondes
      }),
      inject: [ConfigService],
    }),
    PostgresModule,
    AuthModule,
    ProjectModule,
    AboutModule,
    StatsModule,
    CountersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
