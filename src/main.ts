import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Validation globale
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  // Configuration dynamique des CORS
  app.enableCors({
    origin: (
      origin: string | undefined,
      callback: (err: Error | null, origin?: string) => void,
    ) => {
      const allowedOrigins = [
        'https://app-graduate-front.nedellec-julien.fr', // Frontend en prod
        'http://localhost:4200', // Dev Frontend
      ];
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, origin); // Autoriser l'origine demandée
      } else {
        callback(new Error('CORS non autorisé'));
      }
    },
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  // Préfixe API
  app.setGlobalPrefix('api');

  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`✅ Application NestJS démarrée sur http://localhost:${port}`);
}

// Gestion des erreurs au démarrage
bootstrap().catch((err) => {
  console.error("❌ Erreur lors du démarrage de l'application NestJS :", err);
});
