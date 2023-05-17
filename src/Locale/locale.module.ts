import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { StateInfo, StateInfoSchema } from '../Locale/state-info.schema';
import { DataImportService } from 'src/config/data-import.service';
import { SearchService } from './search.service';
import { SearchController } from './search.controller';
import { AuthModule } from 'src/auth/auth.module';

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
