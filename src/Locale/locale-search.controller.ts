import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { SearchService } from './locale-search.service';
import { ApiKeyAuthGuard } from '../auth/key';

@Controller('search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @UseGuards(ApiKeyAuthGuard)
  @Get('state')
  async searchState(@Query('q') query: string) {
    return this.searchService.searchState(query);
  }

  @UseGuards(ApiKeyAuthGuard)
  @Get('lga')
  async searchLga(@Query('q') query: string) {
    return this.searchService.searchLga(query);
  }

  @UseGuards(ApiKeyAuthGuard)
  @Get('region')
  async searchRegion(@Query('q') query: string) {
    return this.searchService.searchRegion(query);
  }

  @UseGuards(ApiKeyAuthGuard)
  @Get('state/lgas')
  async searchLgasInState(@Query('q') state: string) {
    return this.searchService.searchLgasInState(state);
  }

  @UseGuards(ApiKeyAuthGuard)
  @Get('region/states')
  async searchStatesInRegion(@Query('q') region: string) {
    return this.searchService.searchStatesInRegion(region);
  }

  @UseGuards(ApiKeyAuthGuard)
  @Get('all')
  async findAll() {
    return this.searchService.findAll();
  }
}
