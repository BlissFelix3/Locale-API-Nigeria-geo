/* This Service clears expired users expired keys information on the database every 2 hours */
import { Injectable } from '@nestjs/common';
import * as cron from 'node-cron';
import * as Redis from 'ioredis';
import { InjectModel } from '@nestjs/mongoose';
import { ApiKey } from '../key';
import { Model } from 'mongoose';

const redis = new Redis();

@Injectable()
export class CleanupService {
  constructor(@InjectModel(ApiKey.name) private apiKeyModel: Model<ApiKey>) {}

  onModuleInit() {
    this.scheduleCleanup();
  }

  scheduleCleanup() {
    cron.schedule('0 */2 * * *', async () => {
      // This will run every 2 hours.
      console.log('Running cleanup...');
      await this.cleanup();
    });
  }

  async cleanup() {
    // Fetch all keys from MongoDB
    const allApiKeys = await this.apiKeyModel.find();

    // Delete the keys from MongoDB that don't exist in Redis
    for (const apiKey of allApiKeys) {
      const exists = await redis.exists(apiKey.key);
      if (exists !== 1) {
        await this.apiKeyModel.deleteOne({ _id: apiKey._id });
      }
    }
  }
}
