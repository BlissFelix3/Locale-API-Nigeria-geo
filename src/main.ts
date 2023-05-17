import { config } from 'dotenv';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DataImportService } from './config/data-import.service';

config();
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const dataImportService = app.get(DataImportService);
  await dataImportService.importData();
  await app.listen(3000);
}
bootstrap();
