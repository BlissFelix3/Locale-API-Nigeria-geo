import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { CacheKey, CacheTTL } from '@nestjs/cache-manager';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { StateInfo, StateInfoDocument } from './locale-info.schema';
import { FindAllParams } from './dto';

@Injectable()
export class SearchService {
  constructor(
    @InjectModel(StateInfo.name)
    private stateInfoModel: Model<StateInfoDocument>,
  ) {}

  private async findWithRegex(
    field: string,
    query: string,
    projection: string = '',
  ): Promise<StateInfoDocument[]> {
    if (!query) {
      throw new BadRequestException(`${field} query is required`);
    }

    const results = await this.stateInfoModel
      .find({ [field]: new RegExp(query, 'i') }, projection)
      .exec();
    if (!results.length) {
      throw new NotFoundException(
        `No results found for ${field} with query: ${query}`,
      );
    }

    return results;
  }

  async findAll(params: FindAllParams, userId: string) {
    let query = this.stateInfoModel.find({ userId });

    // Check for filtering
    if (params.filter) {
      query = query.where({ $text: { $search: params.filter } });
    }

    // Check for sorting
    if (params.sortField && params.sortOrder) {
      const sortOrder = params.sortOrder === 'asc' ? 1 : -1;
      query = query.sort({ [params.sortField]: sortOrder });
    }

    // Check for pagination
    if (params.page && params.limit) {
      query = query.skip((params.page - 1) * params.limit).limit(params.limit);
    }

    const results = await query.exec();
    if (!results.length) {
      throw new NotFoundException(`No results found for given parameters`);
    }

    return results;
  }

  @CacheKey('state')
  @CacheTTL(60 * 60)
  async searchState(query: string) {
    return this.findWithRegex('state', query);
  }

  @CacheKey('lga')
  @CacheTTL(60 * 60)
  async searchLga(query: string) {
    return this.findWithRegex('lgas', query);
  }

  @CacheKey('region')
  @CacheTTL(60 * 60)
  async searchRegion(query: string) {
    return this.findWithRegex('region', query);
  }

  @CacheKey('state-lgas')
  @CacheTTL(60 * 60)
  async searchLgasInState(state: string) {
    return this.findWithRegex('state', state, 'lgas');
  }

  @CacheKey('region-states')
  @CacheTTL(60 * 60)
  async searchStatesInRegion(region: string) {
    return this.findWithRegex('region', region, 'state');
  }
}
