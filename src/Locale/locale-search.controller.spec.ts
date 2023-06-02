import { Test, TestingModule } from '@nestjs/testing';
import { SearchController } from './locale-search.controller';
import { SearchService } from './locale-search.service';
import { FindAllParams } from './dto';
import { NotFoundException } from '@nestjs/common';
import { ApiKeyService } from '../auth';
import { ApiKeyAuthGuard } from '../auth';

describe('SearchController', () => {
  let controller: SearchController;
  let service: SearchService;
  let apiKeyService: ApiKeyService;
  let apiKeyGuard: ApiKeyAuthGuard;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SearchController],
      providers: [
        {
          provide: SearchService,
          useValue: {
            findAll: jest.fn(),
            searchState: jest.fn(),
            searchLga: jest.fn(),
            searchRegion: jest.fn(),
            searchLgasInState: jest.fn(),
            searchStatesInRegion: jest.fn(),
          },
        },
        {
          provide: ApiKeyService,
          useValue: {
            validateApiKey: jest.fn().mockResolvedValue(true),
            findApiKeyByEmail: jest.fn().mockResolvedValue({}),
            createApiKey: jest.fn(),
            findById: jest.fn(),
            comparePassword: jest.fn(),
          },
        },
        {
          provide: ApiKeyAuthGuard,
          useValue: {
            canActivate: jest.fn().mockResolvedValue(true),
          },
        },
      ],
    }).compile();

    controller = module.get<SearchController>(SearchController);
    service = module.get<SearchService>(SearchService);
    apiKeyService = module.get<ApiKeyService>(ApiKeyService);
    apiKeyGuard = module.get<ApiKeyAuthGuard>(ApiKeyAuthGuard);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of results', async () => {
      const result = [];
      const params: FindAllParams = {
        page: 1,
        limit: 10,
        sortField: 'state',
        sortOrder: 'asc',
        filter: 'test',
        populationGt: 100000,
        populationLt: 2000000,
        capital: 'Test Capital',
        slogan: 'Test Slogan',
        landmass: 'Test Landmass',
        dialect: 'Test Dialect',
        map: 'Test Map',
        created_date: '2023-06-02',
        created_by: 'Test User',
        latitude: '1.000',
        longitude: '1.000',
        website: 'www.test.com',
        senatorialDistricts: ['Test District 1', 'Test District 2'],
        past_governors: ['Test Governor 1', 'Test Governor 2'],
        borders: ['Test Border 1', 'Test Border 2'],
        known_for: ['Test Known For 1', 'Test Known For 2'],
      };
      jest.spyOn(service, 'findAll').mockResolvedValue(result);
      expect(await controller.findAll(params)).toBe(result);
    });

    it('should throw NotFoundException when no results found', async () => {
      const params: FindAllParams = {
        page: 1,
        limit: 10,
        sortField: 'state',
        sortOrder: 'asc',
        filter: 'test',
        populationGt: 100000,
        populationLt: 2000000,
        capital: 'Test Capital',
        slogan: 'Test Slogan',
        landmass: 'Test Landmass',
        dialect: 'Test Dialect',
        map: 'Test Map',
        created_date: '2023-06-02',
        created_by: 'Test User',
        latitude: '1.000',
        longitude: '1.000',
        website: 'www.test.com',
        senatorialDistricts: ['Test District 1', 'Test District 2'],
        past_governors: ['Test Governor 1', 'Test Governor 2'],
        borders: ['Test Border 1', 'Test Border 2'],
        known_for: ['Test Known For 1', 'Test Known For 2'],
      };
      jest.spyOn(service, 'findAll').mockImplementation(() => {
        throw new NotFoundException();
      });
      await expect(controller.findAll(params)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('searchState', () => {
    it('should return an array of results', async () => {
      const result = [];
      const query = 'Test State';
      jest.spyOn(service, 'searchState').mockResolvedValue(result);
      expect(await controller.searchState(query)).toBe(result);
    });

    it('should throw NotFoundException when no results found', async () => {
      const query = 'Test State';
      jest.spyOn(service, 'searchState').mockImplementation(() => {
        throw new NotFoundException();
      });
      await expect(controller.searchState(query)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('searchLga', () => {
    it('should return an array of results', async () => {
      const result = [];
      const query = 'Test LGA';
      jest.spyOn(service, 'searchLga').mockResolvedValue(result);
      expect(await controller.searchLga(query)).toBe(result);
    });

    it('should throw NotFoundException when no results found', async () => {
      const query = 'Test LGA';
      jest.spyOn(service, 'searchLga').mockImplementation(() => {
        throw new NotFoundException();
      });
      await expect(controller.searchLga(query)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('searchRegion', () => {
    it('should return an array of results', async () => {
      const result = [];
      const query = 'Test Region';
      jest.spyOn(service, 'searchRegion').mockResolvedValue(result);
      expect(await controller.searchRegion(query)).toBe(result);
    });

    it('should throw NotFoundException when no results found', async () => {
      const query = 'Test Region';
      jest.spyOn(service, 'searchRegion').mockImplementation(() => {
        throw new NotFoundException();
      });
      await expect(controller.searchRegion(query)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('searchLgasInState', () => {
    it('should return an array of results', async () => {
      const result = [];
      const state = 'Test State';
      jest.spyOn(service, 'searchLgasInState').mockResolvedValue(result);
      expect(await controller.searchLgasInState(state)).toBe(result);
    });

    it('should throw NotFoundException when no results found', async () => {
      const state = 'Test State';
      jest.spyOn(service, 'searchLgasInState').mockImplementation(() => {
        throw new NotFoundException();
      });
      await expect(controller.searchLgasInState(state)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('searchStatesInRegion', () => {
    it('should return an array of results', async () => {
      const result = [];
      const region = 'Test Region';
      jest.spyOn(service, 'searchStatesInRegion').mockResolvedValue(result);
      expect(await controller.searchStatesInRegion(region)).toBe(result);
    });

    it('should throw NotFoundException when no results found', async () => {
      const region = 'Test Region';
      jest.spyOn(service, 'searchStatesInRegion').mockImplementation(() => {
        throw new NotFoundException();
      });
      await expect(controller.searchStatesInRegion(region)).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
