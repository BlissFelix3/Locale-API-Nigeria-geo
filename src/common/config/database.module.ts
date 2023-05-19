import { Module, OnModuleInit } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ApiKey, ApiKeySchema } from '../../auth/key/apikey.model';
import { ApiKeyService } from '../../auth/key/apikey.service';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get('MONGO_URI'),
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }),
      inject: [ConfigService],
    }),
    MongooseModule.forFeature([{ name: ApiKey.name, schema: ApiKeySchema }]),
  ],
  providers: [ApiKeyService],
  exports: [ApiKeyService],
})
export class MongodbModule implements OnModuleInit {
  constructor(private readonly mongoose) {}
  async onModuleInit() {
    try {
      this.mongoose.connection.on('connected', () => {
        console.log('Database connection established');
      });
    } catch (error) {
      throw new Error(`Database connection error: ${error}`);
    }
  }
}
