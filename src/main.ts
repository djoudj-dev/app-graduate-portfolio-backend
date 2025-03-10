import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { connectMongoDB } from './database/mongodb/mongo.module';
import { CountersService } from './database/mongodb/service/counters.service';
import { StatsService } from './database/mongodb/service/stats.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Validation globale
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  // Configuration dynamique des CORS
  app.enableCors({
    origin: [
      'https://app-graduate-front.nedellec-julien.fr', // Frontend en prod
      'http://localhost:4200', // Dev Frontend
      'https://api-app-graduate-back.nedellec-julien.fr', // Ajout de l'origine manquante
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  // Préfixe API
  app.setGlobalPrefix('api');

  await connectMongoDB();

  const statsService = app.get(StatsService);
  await statsService.initializeStats();

  const countersService = app.get(CountersService);
  await countersService.initializeCounters();

  const port = process.env.PORT || 3000;
  await app.listen(port);
}

// Gestion des erreurs au démarrage
bootstrap().catch((err) => {
  console.error("❌ Erreur lors du démarrage de l'application NestJS :", err);
});
