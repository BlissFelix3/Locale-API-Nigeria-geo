import { Module } from '@nestjs/common';
import { CacheModule, CacheInterceptor } from '@nestjs/cache-manager';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { RedisModule } from 'nestjs-redis';
import { AuthModule } from './auth/auth.module';
import databaseConfig from './config/database.config';
import redisConfig from './config/cache.config';
import { RedisCacheModule } from './config/cache.module';
import { LocaleModule } from './Locale/locale.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig, redisConfig],
    }),
    MongooseModule.forRootAsync({
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get('MONGO_URI'),
      }),
      inject: [ConfigService],
    }),
    RedisModule.forRootAsync({
      useFactory: async (configService: ConfigService) => ({
        url: configService.get('REDIS_URL'),
      }),
      inject: [ConfigService],
    }),
    CacheModule.register({
      ttl: 60 * 60,
      max: 100,
    }),
    LocaleModule,
    RedisCacheModule,
    AuthModule,
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
  ],
})
export class AppModule {}
