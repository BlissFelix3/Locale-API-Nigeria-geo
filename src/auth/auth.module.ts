import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { ApiKey, ApiKeySchema } from './key/apikey.model';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { ApiKeyService } from './key/apikey.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: ApiKey.name, schema: ApiKeySchema }]),
    JwtModule.register({
      secret: 'supersecret',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [AuthService, ApiKeyService],
  controllers: [AuthController],
  exports: [AuthService, ApiKeyService],
})
export class AuthModule {}
