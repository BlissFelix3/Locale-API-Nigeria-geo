import {
  Injectable,
  NotFoundException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ApiKeyService } from './key';
import { SignupDto } from './dto';
import { ApiKey } from './key';

@Injectable()
export class AuthService {
  constructor(private readonly apiKeyService: ApiKeyService) {}

  /* Validates User by Email and Password */
  async validateUser(email: string, password: string): Promise<ApiKey> {
    const apiKey = await this.apiKeyService.findApiKeyByEmail(email);
    if (
      !apiKey ||
      !(await this.apiKeyService.comparePassword(apiKey, password))
    ) {
      throw new NotFoundException('Invalid email or password');
    }
    return apiKey;
  }

  /* Registers user by creating an apiKey */
  async signup(signupDto: SignupDto): Promise<ApiKey> {
    try {
      const apiKey = await this.apiKeyService.createApiKey(signupDto);
      return apiKey;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  /* Verifies api key */
  async validateApiKey(apiKey: string): Promise<boolean> {
    const isValid = await this.apiKeyService.validateApiKey(apiKey);
    if (!isValid) {
      throw new NotFoundException('Invalid API key');
    }
    return isValid;
  }
}
