import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { NotFoundException, BadRequestException } from '@nestjs/common';
import { SearchService } from './locale-search.service';
import { StateInfo, StateInfoDocument } from './locale-info.schema';
import { FindAllParams } from './dto';

// Mocked StateInfo model
class MockStateInfoModel extends Model<StateInfoDocument> {}

describe('SearchService', () => {
  let searchService: SearchService;
  let stateInfoModel: MockStateInfoModel;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SearchService,
        {
          provide: getModelToken(StateInfo.name),
          useValue: MockStateInfoModel,
        },
      ],
    }).compile();

    searchService = module.get<SearchService>(SearchService);
    stateInfoModel = module.get<MockStateInfoModel>(
      getModelToken(StateInfo.name),
    );
  });

  // describe('findAll', () => {
  //   const findAllParams: FindAllParams = {
  //     page: 1,
  //     limit: 10,
  //     sortField: 'state',
  //     sortOrder: 'asc',
  //     filter: 'test',
  //   };

  //   it('should find all state info records with pagination, sorting, and filtering', async () => {
  //     const expectedResult = [{ state: 'Test State' }];
  //     jest.spyOn(stateInfoModel, 'find').mockReturnValue({
  //       where: jest.fn().mockReturnThis(),
  //       sort: jest.fn().mockReturnThis(),
  //       limit: jest.fn().mockReturnThis(),
  //       skip: jest.fn().mockReturnThis(),
  //       exec: jest.fn().mockResolvedValueOnce(expectedResult),
  //     } as any);

  //     const result = await searchService.findAll(findAllParams);

  //     expect(stateInfoModel.find).toHaveBeenCalledWith();
  //     expect(result).toEqual(expectedResult);
  //   });

  //   it('should throw NotFoundException when no records are found', async () => {
  //     jest.spyOn(stateInfoModel, 'find').mockReturnValue({
  //       where: jest.fn().mockReturnThis(),
  //       sort: jest.fn().mockReturnThis(),
  //       limit: jest.fn().mockReturnThis(),
  //       skip: jest.fn().mockReturnThis(),
  //       exec: jest.fn().mockResolvedValueOnce([]),
  //     } as any);

  //     await expect(searchService.findAll(findAllParams)).rejects.toThrowError(
  //       NotFoundException,
  //     );
  //   });

  //   it('should throw NotFoundException when filter query is empty', async () => {
  //     const paramsWithoutFilter = { ...findAllParams, filter: '' };

  //     await expect(
  //       searchService.findAll(paramsWithoutFilter),
  //     ).rejects.toThrowError(NotFoundException);
  //   });
  // });

  describe('searchState', () => {
    const stateQuery = 'Test State';

    it('should search for state info by state name using regex', async () => {
      const expectedResult = [{ state: 'Test State' }];
      jest.spyOn(stateInfoModel, 'find').mockReturnValue({
        exec: jest.fn().mockResolvedValueOnce(expectedResult),
      } as any);

      const result = await searchService.searchState(stateQuery);

      expect(stateInfoModel.find).toHaveBeenCalledWith(
        { state: new RegExp(stateQuery, 'i') },
        '',
      );
      expect(result).toEqual(expectedResult);
    });

    it('should throw NotFoundException when no records are found', async () => {
      jest.spyOn(stateInfoModel, 'find').mockReturnValue({
        exec: jest.fn().mockResolvedValueOnce([]),
      } as any);

      await expect(searchService.searchState(stateQuery)).rejects.toThrowError(
        NotFoundException,
      );
    });

    it('should throw BadRequestException when state query is empty', async () => {
      await expect(searchService.searchState('')).rejects.toThrowError(
        BadRequestException,
      );
    });
  });

  describe('searchLga', () => {
    const lgaQuery = 'Test LGA';

    it('should search for state info by LGA name using regex', async () => {
      const expectedResult = [{ state: 'Test State', lgas: ['Test LGA'] }];
      jest.spyOn(stateInfoModel, 'find').mockReturnValue({
        exec: jest.fn().mockResolvedValueOnce(expectedResult),
      } as any);

      const result = await searchService.searchLga(lgaQuery);

      expect(stateInfoModel.find).toHaveBeenCalledWith(
        { lgas: new RegExp(lgaQuery, 'i') },
        '',
      );
      expect(result).toEqual(expectedResult);
    });

    it('should throw NotFoundException when no records are found', async () => {
      jest.spyOn(stateInfoModel, 'find').mockReturnValue({
        exec: jest.fn().mockResolvedValueOnce([]),
      } as any);

      await expect(searchService.searchLga(lgaQuery)).rejects.toThrowError(
        NotFoundException,
      );
    });

    it('should throw BadRequestException when LGA query is empty', async () => {
      await expect(searchService.searchLga('')).rejects.toThrowError(
        BadRequestException,
      );
    });
  });

  describe('searchRegion', () => {
    const regionQuery = 'Test Region';

    it('should search for state info by region name using regex', async () => {
      const expectedResult = [{ state: 'Test State', region: 'Test Region' }];
      jest.spyOn(stateInfoModel, 'find').mockReturnValue({
        exec: jest.fn().mockResolvedValueOnce(expectedResult),
      } as any);

      const result = await searchService.searchRegion(regionQuery);

      expect(stateInfoModel.find).toHaveBeenCalledWith(
        { region: new RegExp(regionQuery, 'i') },
        '',
      );
      expect(result).toEqual(expectedResult);
    });

    it('should throw NotFoundException when no records are found', async () => {
      jest.spyOn(stateInfoModel, 'find').mockReturnValue({
        exec: jest.fn().mockResolvedValueOnce([]),
      } as any);

      await expect(
        searchService.searchRegion(regionQuery),
      ).rejects.toThrowError(NotFoundException);
    });

    it('should throw BadRequestException when region query is empty', async () => {
      await expect(searchService.searchRegion('')).rejects.toThrowError(
        BadRequestException,
      );
    });
  });

  describe('searchLgasInState', () => {
    const state = 'Test State';

    it('should search for LGAs in a specific state using regex', async () => {
      const expectedResult = [
        { state: 'Test State', lgas: ['LGA 1', 'LGA 2'] },
      ];
      jest.spyOn(stateInfoModel, 'find').mockReturnValue({
        exec: jest.fn().mockResolvedValueOnce(expectedResult),
      } as any);

      const result = await searchService.searchLgasInState(state);

      expect(stateInfoModel.find).toHaveBeenCalledWith(
        { state: new RegExp(state, 'i') },
        'lgas',
      );
      expect(result).toEqual(expectedResult);
    });

    it('should throw NotFoundException when no records are found', async () => {
      jest.spyOn(stateInfoModel, 'find').mockReturnValue({
        exec: jest.fn().mockResolvedValueOnce([]),
      } as any);

      await expect(searchService.searchLgasInState(state)).rejects.toThrowError(
        NotFoundException,
      );
    });
  });

  describe('searchStatesInRegion', () => {
    const region = 'Test Region';

    it('should search for states in a specific region using regex', async () => {
      const expectedResult = [
        { region: 'Test Region', state: 'State 1' },
        { region: 'Test Region', state: 'State 2' },
      ];
      jest.spyOn(stateInfoModel, 'find').mockReturnValue({
        exec: jest.fn().mockResolvedValueOnce(expectedResult),
      } as any);

      const result = await searchService.searchStatesInRegion(region);

      expect(stateInfoModel.find).toHaveBeenCalledWith(
        { region: new RegExp(region, 'i') },
        'state',
      );
      expect(result).toEqual(expectedResult);
    });

    it('should throw NotFoundException when no records are found', async () => {
      jest.spyOn(stateInfoModel, 'find').mockReturnValue({
        exec: jest.fn().mockResolvedValueOnce([]),
      } as any);

      await expect(
        searchService.searchStatesInRegion(region),
      ).rejects.toThrowError(NotFoundException);
    });
  });
});
