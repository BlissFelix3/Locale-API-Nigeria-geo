import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ApiKey } from './apikey.model';
import { Model } from 'mongoose';
import { SignupDto } from '../dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class ApiKeyService {
  constructor(@InjectModel(ApiKey.name) private apiKeyModel: Model<ApiKey>) {}

  async createApiKey(signupDto: SignupDto): Promise<ApiKey> {
    try {
      const existingApiKey = await this.findApiKeyByEmail(signupDto.email);

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
        created: Date.now(),
        expires: Date.now() + 60 * 60 * 1000, // Implements key expiration timestamp 1 hour from now
      });

      return createdApiKey.save();
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async validateApiKey(apiKey: string): Promise<boolean> {
    try {
      const apiKeyData = await this.apiKeyModel.findOne({ key: apiKey });

      // Validates only keys that are not expired
      if (apiKeyData && apiKeyData.expires.getTime() > Date.now()) {
        return true;
      }

      return false;
    } catch (error) {
      throw new NotFoundException('API key not found or expired');
    }
  }

  async findApiKeyByEmail(email: string): Promise<ApiKey> {
    try {
      const apiKeyData = await this.apiKeyModel.findOne({ email: email });

      // Only return keys that are not expired
      if (apiKeyData && apiKeyData.expires.getTime() > Date.now()) {
        return apiKeyData;
      }

      return null;
    } catch (error) {
      throw new NotFoundException('API key not found or expired');
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
