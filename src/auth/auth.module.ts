import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ApiKey, ApiKeySchema } from './key';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { ApiKeyService } from './key';
import { CleanupService } from './dbKeyCleanup';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: ApiKey.name, schema: ApiKeySchema }]),
  ],
  providers: [AuthService, ApiKeyService, CleanupService],
  controllers: [AuthController],
  exports: [AuthService, ApiKeyService, CleanupService],
})
export class AuthModule {}
