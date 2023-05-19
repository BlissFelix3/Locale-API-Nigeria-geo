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

  /* Error handling functionality */
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

  /* requirement: findall*/
  // Caches the result for 1 hour (60 minutes * 60 seconds)
  @CacheTTL(60 * 60)
  async findAll(params: FindAllParams) {
    let query = this.stateInfoModel.find();

    /* Checks for filtering only for state region and lgas */
    if (params.filter) {
      query = query.where({
        $or: [
          { state: { $regex: params.filter, $options: 'i' } },
          { region: { $regex: params.filter, $options: 'i' } },
          { lgas: { $regex: params.filter, $options: 'i' } },
        ],
      });
    }

    // Check for sorting
    if (params.sortField && params.sortOrder) {
      const sortOrder = params.sortOrder === 'asc' ? 1 : -1;
      query = query.sort({ [params.sortField]: sortOrder });
    }

    // Check for pagination and limits
    if (params.limit) {
      query = query.limit(params.limit);
      if (params.page) {
        query = query.skip((params.page - 1) * params.limit);
      }
    }

    const results = await query.exec();
    if (!results.length) {
      throw new NotFoundException(`No results found for given parameters`);
    }

    return results;
  }

  /* requirement: search specific state */
  @CacheKey('state')
  @CacheTTL(60 * 60)
  async searchState(query: string) {
    return this.findWithRegex('state', query);
  }

  /* requirement: search specific lga */
  @CacheKey('lga')
  @CacheTTL(60 * 60)
  async searchLga(query: string) {
    return this.findWithRegex('lgas', query);
  }

  /* requirement: search specific region */
  @CacheKey('region')
  @CacheTTL(60 * 60)
  async searchRegion(query: string) {
    return this.findWithRegex('region', query);
  }

  /* requirement: search for states with lgas under them */
  @CacheKey('state-lgas')
  @CacheTTL(60 * 60)
  async searchLgasInState(state: string) {
    return this.findWithRegex('state', state, 'lgas');
  }

  /* requirement: search for region with states under them */
  @CacheKey('region-states')
  @CacheTTL(60 * 60)
  async searchStatesInRegion(region: string) {
    return this.findWithRegex('region', region, 'state');
  }
}
