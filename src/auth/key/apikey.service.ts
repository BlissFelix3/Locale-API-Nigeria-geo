import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { RedisService } from 'nestjs-redis';
import { ApiKey } from './apikey.model';
import { Model } from 'mongoose';
import { SignupDto } from '../dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class ApiKeyService {
  constructor(
    @InjectModel(ApiKey.name) private apiKeyModel: Model<ApiKey>,
    private readonly redisService: RedisService,
  ) {}

  async createApiKey(signupDto: SignupDto): Promise<ApiKey> {
    try {
      const client = this.redisService.getClient();
      const existingApiKey = await client.exists(signupDto.email);

      if (existingApiKey) {
        throw new Error('Your initial API key has not expired yet');
      }

      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(signupDto.password, salt);
      const key = await bcrypt.hash(`${signupDto.email}${Date.now()}`, salt);

      // Saved to MongoDB
      const createdApiKey = new this.apiKeyModel({
        key: key,
        name: signupDto.name,
        email: signupDto.email,
        password: hashedPassword,
      });

      await client.set(signupDto.email, key, 'EX', 10); // Sets Key Expiration to 1 hour

      return createdApiKey.save();
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async validateApiKey(apiKey: string): Promise<boolean> {
    const client = this.redisService.getClient();
    // Validates only keys that exist in Redis (non-expired keys)
    const exists = await client.exists(apiKey);
    return exists === 1;
  }

  async findApiKeyByEmail(email: string): Promise<ApiKey> {
    try {
      return this.apiKeyModel.findOne({ email: email });
    } catch (error) {
      throw new NotFoundException('API key not found');
    }
  }

  async findById(id: string): Promise<ApiKey> {
    try {
      return this.apiKeyModel.findById(id).exec();
    } catch (error) {
      throw new NotFoundException(`No key with id ${id}`);
    }
  }

  async comparePassword(apiKey: ApiKey, password: string): Promise<boolean> {
    try {
      return bcrypt.compare(password, apiKey.password);
    } catch (error) {
      throw new Error('Failed to compare passwords');
    }
  }
}
