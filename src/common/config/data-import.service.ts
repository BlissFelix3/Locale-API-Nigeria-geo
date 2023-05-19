import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { StateInfo, StateInfoDocument } from '../../Locale/locale-info.schema';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class DataImportService {
  constructor(
    @InjectModel(StateInfo.name)
    private stateInfoModel: Model<StateInfoDocument>,
  ) {}

  async importData() {
    // Delete all documents
    await this.stateInfoModel.deleteMany({});

    // Read and parse the JSON file
    const data = fs.readFileSync(
      path.resolve(__dirname, './data.json'),
      'utf-8',
    );

    const jsonData = JSON.parse(data);

    // Save each item in the JSON data
    for (const item of jsonData) {
      const stateInfo = new this.stateInfoModel(item);
      await stateInfo.save();
    }
  }
}
