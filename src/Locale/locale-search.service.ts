import { Injectable } from '@nestjs/common';
import { CacheKey, CacheTTL } from '@nestjs/cache-manager';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { StateInfo, StateInfoDocument } from './locale-info.schema';

@Injectable()
export class SearchService {
  constructor(
    @InjectModel(StateInfo.name)
    private stateInfoModel: Model<StateInfoDocument>,
  ) {}

  @CacheKey('state')
  @CacheTTL(60 * 60)
  async searchState(query: string) {
    return this.stateInfoModel.find({ state: new RegExp(query, 'i') }).exec();
  }

  @CacheKey('lga')
  @CacheTTL(60 * 60)
  async searchLga(query: string) {
    return this.stateInfoModel.find({ lgas: new RegExp(query, 'i') }).exec();
  }

  @CacheKey('region')
  @CacheTTL(60 * 60)
  async searchRegion(query: string) {
    return this.stateInfoModel.find({ region: new RegExp(query, 'i') }).exec();
  }

  @CacheKey('state-lgas')
  @CacheTTL(60 * 60)
  async searchLgasInState(state: string) {
    return this.stateInfoModel
      .find({ state: new RegExp(state, 'i') }, { lgas: 1, _id: 0 })
      .exec();
  }

  @CacheKey('region-states')
  @CacheTTL(60 * 60)
  async searchStatesInRegion(region: string) {
    return this.stateInfoModel
      .find({ region: new RegExp(region, 'i') }, { state: 1, _id: 0 })
      .exec();
  }

  async findAll() {
    return this.stateInfoModel.find().exec();
  }
}
