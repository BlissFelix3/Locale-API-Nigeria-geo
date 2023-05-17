import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { SearchService } from './search.service';
import { ApiKeyAuthGuard } from 'src/auth/key';

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
  @Get('all')
  async findAll() {
    return this.searchService.findAll();
  }
}
