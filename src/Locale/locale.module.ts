import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { StateInfo, StateInfoSchema } from './locale-info.schema';
import { DataImportService } from '../common/config/data-import.service';
import { SearchService } from './locale-search.service';
import { SearchController } from './locale-search.controller';
import { AuthModule } from 'auth/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: StateInfo.name, schema: StateInfoSchema },
    ]),
    AuthModule,
  ],
  providers: [DataImportService, SearchService],
  controllers: [SearchController],
  exports: [DataImportService],
})
export class LocaleModule {}
