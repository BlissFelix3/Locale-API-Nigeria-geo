import {
  Controller,
  Get,
  Query,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiQuery,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { SearchService } from './locale-search.service';
import { ApiKeyAuthGuard } from '../auth';
import { FindAllParams } from './dto';

@ApiTags('search')
@Controller('search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @UseGuards(ApiKeyAuthGuard)
  @Get('all')
  @ApiOperation({ summary: 'Find all locales' })
  @ApiQuery({ name: 'name', required: false })
  @ApiQuery({ name: 'email', required: false })
  @ApiQuery({
    name: 'past_governors',
    required: false,
    type: String,
    isArray: true,
  })
  @ApiQuery({ name: 'borders', required: false, type: String, isArray: true })
  @ApiQuery({ name: 'known_for', required: false, type: String, isArray: true })
  @ApiQuery({
    name: 'senatorial_districts',
    required: false,
    type: String,
    isArray: true,
  })
  @ApiBearerAuth()
  async findAll(@Query(ValidationPipe) params: FindAllParams) {
    try {
      return await this.searchService.findAll(params);
    } catch (error) {
      throw error;
    }
  }

  @UseGuards(ApiKeyAuthGuard)
  @Get('state')
  @ApiOperation({ summary: 'Search state' })
  @ApiQuery({ name: 'q', required: true })
  @ApiBearerAuth()
  async searchState(@Query('q') query: string) {
    try {
      return await this.searchService.searchState(query);
    } catch (error) {
      throw error;
    }
  }

  @UseGuards(ApiKeyAuthGuard)
  @Get('lga')
  @ApiOperation({ summary: 'Search Local Government Area' })
  @ApiQuery({ name: 'q', required: true })
  @ApiBearerAuth()
  async searchLga(@Query('q') query: string) {
    try {
      return await this.searchService.searchLga(query);
    } catch (error) {
      throw error;
    }
  }

  @UseGuards(ApiKeyAuthGuard)
  @Get('region')
  @ApiOperation({ summary: 'Search region' })
  @ApiQuery({ name: 'q', required: true })
  @ApiBearerAuth()
  async searchRegion(@Query('q') query: string) {
    try {
      return await this.searchService.searchRegion(query);
    } catch (error) {
      throw error;
    }
  }

  @UseGuards(ApiKeyAuthGuard)
  @Get('state/lgas')
  @ApiOperation({ summary: 'Search LGAs in a state' })
  @ApiQuery({ name: 'q', required: true })
  @ApiBearerAuth()
  async searchLgasInState(@Query('q') state: string) {
    try {
      return await this.searchService.searchLgasInState(state);
    } catch (error) {
      throw error;
    }
  }

  @UseGuards(ApiKeyAuthGuard)
  @Get('region/states')
  @ApiOperation({ summary: 'Search states in a region' })
  @ApiQuery({ name: 'q', required: true })
  @ApiBearerAuth()
  async searchStatesInRegion(@Query('q') region: string) {
    try {
      return await this.searchService.searchStatesInRegion(region);
    } catch (error) {
      throw error;
    }
  }
}
