/* Middleware guard to authorize requests by key */
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ApiKeyService } from '../../auth/key';

@Injectable()
export class ApiKeyAuthGuard implements CanActivate {
  constructor(
    private readonly apiKeyService: ApiKeyService,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const apiKey = request.headers['authorization'];

    if (!apiKey || !apiKey.startsWith('Bearer ')) {
      throw new UnauthorizedException('Invalid Authorization Header');
    }

    const apiKeyValue = apiKey.split(' ')[1];

    try {
      const isValid = await this.apiKeyService.validateApiKey(apiKeyValue);

      if (!isValid) {
        throw new UnauthorizedException('Invalid Api Key');
      }

      request.apiKey = await this.apiKeyService.findApiKeyByEmail(apiKeyValue);
      return true;
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }
  }
}
