import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from 'dotenv';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ValidationPipe } from '@nestjs/common';

config(); // Cargar variables de entorno

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule, {
    transport: Transport.TCP,
    options: {
      port: parseInt(process.env.PORT)
    }
  }
  );

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, forbidNonWhitelisted: true
    })
  )

  await app.listen();
}
bootstrap();
