/* This Service clears expired users and keys information on the database every 2 hours */
import { Injectable } from '@nestjs/common';
import * as cron from 'node-cron';
import { InjectModel } from '@nestjs/mongoose';
import { ApiKey } from '../key';
import { Model } from 'mongoose';

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
    // Delete expired keys from MongoDB
    const result = await this.apiKeyModel.deleteMany({
      expires: { $lt: Date.now() },
    });
    console.log(`Deleted ${result.deletedCount} expired keys.`);
  }
}
