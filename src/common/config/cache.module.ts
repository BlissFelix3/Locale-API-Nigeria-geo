import { Module } from '@nestjs/common';
import { RedisModule } from 'nestjs-redis';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    RedisModule.forRootAsync({
      useFactory: async (configService: ConfigService) => ({
        url: configService.get('REDIS_URL'),
      }),
      inject: [ConfigService],
    }),
  ],
  exports: [RedisModule],
})
export class RedisCacheModule {}
