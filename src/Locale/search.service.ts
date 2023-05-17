import { Injectable } from '@nestjs/common';
import { CacheKey, CacheTTL } from '@nestjs/cache-manager';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { StateInfo, StateInfoDocument } from './state-info.schema';

@Injectable()
export class SearchService {
  constructor(
    @InjectModel(StateInfo.name)
    private stateInfoModel: Model<StateInfoDocument>,
  ) {}

  @CacheKey('state')
  @CacheTTL(30)
  async searchState(query: string) {
    return this.stateInfoModel.find({ state: new RegExp(query, 'i') }).exec();
  }

  @CacheKey('lga')
  @CacheTTL(30)
  async searchLga(query: string) {
    return this.stateInfoModel.find({ lgas: new RegExp(query, 'i') }).exec();
  }

  @CacheKey('region')
  @CacheTTL(30)
  async searchRegion(query: string) {
    return this.stateInfoModel.find({ region: new RegExp(query, 'i') }).exec();
  }

  async findAll() {
    return this.stateInfoModel.find().exec();
  }
}
