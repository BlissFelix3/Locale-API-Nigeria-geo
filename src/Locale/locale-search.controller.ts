import {
  Controller,
  Get,
  Query,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { SearchService } from './locale-search.service';
import { ApiKeyAuthGuard } from '../auth';
import { FindAllParams } from './dto';

@Controller('search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @UseGuards(ApiKeyAuthGuard)
  @Get('all')
  async findAll(@Query(ValidationPipe) params: FindAllParams) {
    try {
      return await this.searchService.findAll(params);
    } catch (error) {
      throw error;
    }
  }

  @UseGuards(ApiKeyAuthGuard)
  @Get('state')
  async searchState(@Query('q') query: string) {
    try {
      return await this.searchService.searchState(query);
    } catch (error) {
      throw error;
    }
  }

  @UseGuards(ApiKeyAuthGuard)
  @Get('lga')
  async searchLga(@Query('q') query: string) {
    try {
      return await this.searchService.searchLga(query);
    } catch (error) {
      throw error;
    }
  }

  @UseGuards(ApiKeyAuthGuard)
  @Get('region')
  async searchRegion(@Query('q') query: string) {
    try {
      return await this.searchService.searchRegion(query);
    } catch (error) {
      throw error;
    }
  }

  @UseGuards(ApiKeyAuthGuard)
  @Get('state/lgas')
  async searchLgasInState(@Query('q') state: string) {
    try {
      return await this.searchService.searchLgasInState(state);
    } catch (error) {
      throw error;
    }
  }

  @UseGuards(ApiKeyAuthGuard)
  @Get('region/states')
  async searchStatesInRegion(@Query('q') region: string) {
    try {
      return await this.searchService.searchStatesInRegion(region);
    } catch (error) {
      throw error;
    }
  }
}
