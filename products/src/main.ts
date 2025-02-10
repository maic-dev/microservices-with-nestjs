import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { config } from 'dotenv';

config(); // Cargar variables de entorno

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, forbidNonWhitelisted: true
    })
  )

  await app.listen(process.env.PORT);
}
bootstrap();