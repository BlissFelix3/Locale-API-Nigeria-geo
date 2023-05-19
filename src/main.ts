import { config } from 'dotenv';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DataImportService } from './common/config/data-import.service';
import { ValidationPipe } from '@nestjs/common';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';

config();
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const dataImportService = app.get(DataImportService);
  await dataImportService.importData();

  /* Helmet */
  app.use(helmet());

  /* Cors */
  app.enableCors({
    origin: '*',
  });

  /* rateLimit */
  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100, // limit each IP to 100 requests per windowMs
    }),
  );

  /* Global Validation pipe */
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  await app.listen(3000);
}
bootstrap();
