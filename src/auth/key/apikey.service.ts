import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ApiKey } from './apikey.model';
import { Model } from 'mongoose';
import { SignupDto } from 'src/auth/dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class ApiKeyService {
  constructor(@InjectModel(ApiKey.name) private apiKeyModel: Model<ApiKey>) {}

  async createApiKey(signupDto: SignupDto): Promise<ApiKey> {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(signupDto.password, salt);
    const createdApiKey = new this.apiKeyModel({
      key: await bcrypt.hash(`${signupDto.email}${Date.now()}`, salt),
      name: signupDto.name,
      email: signupDto.email,
      password: hashedPassword,
    });

    return createdApiKey.save();
  }

  async validateApiKey(apiKey: string): Promise<boolean> {
    const apiKeyInfo = await this.apiKeyModel.findOne({ key: apiKey });

    if (apiKeyInfo) {
      return true;
    } else {
      return false;
    }
  }

  async findApiKeyByEmail(email: string): Promise<ApiKey> {
    return this.apiKeyModel.findOne({ email: email });
  }

  async findById(id: string): Promise<ApiKey> {
    return this.apiKeyModel.findById(id).exec();
  }

  async comparePassword(apiKey: ApiKey, password: string): Promise<boolean> {
    return bcrypt.compare(password, apiKey.password);
  }
}
