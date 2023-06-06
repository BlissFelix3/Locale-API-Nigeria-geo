import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { config } from 'dotenv';
import { DataImportService } from './common/config/data-import.service';
import { ValidationPipe } from '@nestjs/common';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';

config();
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Swagger configuration
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Locale API')
    .setDescription('Locale API For Nigeria Geo')
    .setVersion('1.0')
    .addBearerAuth()
    .addTag('locale')
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);

  const dataImportService = app.get(DataImportService);
  await dataImportService.importData();

  // Helmet
  app.use(helmet());

  // Cors
  app.enableCors({
    origin: '*',
  });

  // rateLimit
  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100, // limits each IP to 100 requests per windowMs
    }),
  );

  // Global Validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
