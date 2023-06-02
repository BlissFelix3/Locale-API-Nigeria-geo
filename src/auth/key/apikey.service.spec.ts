import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { ApiKeyService } from './apikey.service';
import { ApiKey, ApiKeyDocument } from './apikey.model';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { SignupDto } from '../dto/signup.dto';

describe('ApiKeyService', () => {
  let service: ApiKeyService;
  let model: Model<ApiKeyDocument>;

  const mockApiKeyModel = () => ({
    findOne: jest.fn(),
    save: jest.fn(),
    create: jest.fn(),
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ApiKeyService,
        { provide: getModelToken(ApiKey.name), useFactory: mockApiKeyModel },
      ],
    }).compile();

    service = module.get<ApiKeyService>(ApiKeyService);
    model = module.get<Model<ApiKeyDocument>>(getModelToken(ApiKey.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createApiKey', () => {
    it('should throw an error if there is an issue in saving the key', async () => {
      (model.findOne as jest.Mock).mockResolvedValue(null);
      (model.create as jest.Mock).mockImplementation(() => {
        throw new Error('Issue in saving the key');
      });
      const signupDto: SignupDto = {
        name: 'Test',
        email: 'test@test.com',
        password: 'password',
      };
      await expect(service.createApiKey(signupDto)).rejects.toThrow(
        'Issue in saving the key',
      );
    });

    it('should create an API key', async () => {
      (model.findOne as jest.Mock).mockResolvedValue(null);
      jest.spyOn(bcrypt, 'genSalt').mockResolvedValue('salt');
      jest.spyOn(bcrypt, 'hash').mockResolvedValue('hashedPassword');
      const signupDto: SignupDto = {
        name: 'Test',
        email: 'test@test.com',
        password: 'password',
      };
      const apiKey = {
        key: 'hashedPassword',
        name: signupDto.name,
        email: signupDto.email,
        password: 'hashedPassword',
        created: expect.any(Date),
        expires: expect.any(Date),
        save: jest.fn().mockResolvedValue('apiKey'),
      };
      (model.create as jest.Mock).mockImplementation(() => apiKey);
      expect(await service.createApiKey(signupDto)).toEqual(apiKey);
    });
  });

  describe('validateApiKey', () => {
    it('should return false if the API key has expired', async () => {
      service['apiKeyModel'].findOne = jest
        .fn()
        .mockResolvedValue({ expires: new Date(Date.now() - 10000) });
      await expect(service.validateApiKey('expiredKey')).resolves.toBe(false);
    });

    it('should return false for an expired API key', async () => {
      service['apiKeyModel'].findOne = jest
        .fn()
        .mockResolvedValue({ expires: new Date(Date.now() - 10000) });
      expect(await service.validateApiKey('expiredKey')).toBe(false);
    });
  });

  describe('findApiKeyByEmail', () => {
    it('should return null if the API key has expired', async () => {
      service['apiKeyModel'].findOne = jest
        .fn()
        .mockResolvedValue({ expires: new Date(Date.now() - 10000) });
      await expect(
        service.findApiKeyByEmail('test@test.com'),
      ).resolves.toBeNull();
    });

    it('should return null for an expired API key', async () => {
      service['apiKeyModel'].findOne = jest
        .fn()
        .mockResolvedValue({ expires: new Date(Date.now() - 10000) });
      expect(await service.findApiKeyByEmail('test@test.com')).toBeNull();
    });
  });

  describe('findById', () => {
    it('should throw a NotFoundException if no API key with the specified id is found', async () => {
      service['apiKeyModel'].findById = jest.fn().mockResolvedValue(null);
      await expect(service.findById('invalidId')).rejects.toThrow(
        `No key with id invalidId`,
      );
    });
  });

  describe('comparePassword', () => {
    it('should throw an error if bcrypt.compare fails', async () => {
      jest.spyOn(bcrypt, 'compare').mockImplementation(() => {
        throw new Error('Failed to compare passwords');
      });
      await expect(
        service.comparePassword(
          { password: 'hashedPassword' } as any,
          'password',
        ),
      ).rejects.toThrow('Failed to compare passwords');
    });
  });
});
