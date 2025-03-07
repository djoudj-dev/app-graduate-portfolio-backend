import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Validation globale
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  // CORS
  app.enableCors({
    origin: [
      'https://api-app-graduate-back.nedellec-julien.fr',
      'https://app-graduate-back.nedellec-julien.fr', // Frontend Angular
      'http://localhost:4200', // Dev Frontend
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  // Préfixe API
  app.setGlobalPrefix('api');

  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`Application démarrée sur le port ${port}`);
}
bootstrap();
