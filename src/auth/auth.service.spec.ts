import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { ApiKeyService } from './key';
import { NotFoundException, HttpException, HttpStatus } from '@nestjs/common';
import { SignupDto } from './dto';
import { ApiKey, ApiKeyDocument } from './key';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';

describe('AuthService', () => {
  let service: AuthService;
  let apiKeyService: ApiKeyService;
  let model: Model<ApiKeyDocument>;

  const mockApiKeyModel = () => ({
    findOne: jest.fn(),
    save: jest.fn(),
    create: jest.fn(),
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        ApiKeyService,
        { provide: getModelToken(ApiKey.name), useFactory: mockApiKeyModel },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    apiKeyService = module.get<ApiKeyService>(ApiKeyService);
    model = module.get<Model<ApiKeyDocument>>(getModelToken(ApiKey.name));
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('validateUser', () => {
    it('should validate the user and return the API key if valid', async () => {
      const email = 'test@example.com';
      const password = 'password123';
      const apiKey: ApiKey = {
        _id: 'mockedId',
        key: 'mockedKey',
        name: 'test name',
        email: 'test email',
        password: 'hashedPassword',
        created: new Date(),
        expires: new Date(),
      };

      jest.spyOn(apiKeyService, 'findApiKeyByEmail').mockResolvedValue(apiKey);
      jest.spyOn(apiKeyService, 'comparePassword').mockResolvedValue(true);

      const result = await service.validateUser(email, password);

      expect(apiKeyService.findApiKeyByEmail).toHaveBeenCalledWith(email);
      expect(apiKeyService.comparePassword).toHaveBeenCalledWith(
        apiKey,
        password,
      );
      expect(result).toEqual(apiKey);
    });

    it('should throw NotFoundException if the user is not found', async () => {
      const email = 'nonexistent@example.com';
      const password = 'password123';

      jest.spyOn(apiKeyService, 'findApiKeyByEmail').mockResolvedValue(null);

      await expect(service.validateUser(email, password)).rejects.toThrowError(
        NotFoundException,
      );
    });

    it('should throw NotFoundException if the password is invalid', async () => {
      const email = 'test@example.com';
      const password = 'password123';
      const apiKey: ApiKey = {
        _id: 'mockedId',
        key: 'mockedKey',
        name: 'test name',
        email: 'bliss@example.com',
        password: 'hashedPassword',
        created: new Date(),
        expires: new Date(),
      };

      jest.spyOn(apiKeyService, 'findApiKeyByEmail').mockResolvedValue(apiKey);
      jest.spyOn(apiKeyService, 'comparePassword').mockResolvedValue(false);

      await expect(service.validateUser(email, password)).rejects.toThrowError(
        NotFoundException,
      );
    });
  });

  describe('signup', () => {
    it('should create a new API key and return it', async () => {
      const signupDto: SignupDto = {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password',
      };
      const createdApiKey: ApiKey = {
        _id: 'mockedId',
        key: 'mockedKey',
        name: signupDto.name,
        email: signupDto.email,
        password: 'hashedPassword',
        created: new Date(),
        expires: new Date(),
      };

      jest
        .spyOn(apiKeyService, 'createApiKey')
        .mockResolvedValue(createdApiKey);

      const result = await service.signup(signupDto);

      expect(apiKeyService.createApiKey).toHaveBeenCalledWith(signupDto);
      expect(result).toEqual(createdApiKey);
    });

    it('should throw a HttpException if an error occurs during signup', async () => {
      const signupDto: SignupDto = {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password',
      };
      const errorMessage = 'Error occurred during signup';

      jest
        .spyOn(apiKeyService, 'createApiKey')
        .mockRejectedValue(new Error(errorMessage));

      await expect(service.signup(signupDto)).rejects.toThrowError(
        new HttpException(errorMessage, HttpStatus.BAD_REQUEST),
      );
    });
  });

  describe('validateApiKey', () => {
    it('should validate the API key and return true if valid', async () => {
      const apiKey = 'valid-api-key';

      jest.spyOn(apiKeyService, 'validateApiKey').mockResolvedValue(true);

      const result = await service.validateApiKey(apiKey);

      expect(apiKeyService.validateApiKey).toHaveBeenCalledWith(apiKey);
      expect(result).toBe(true);
    });

    it('should throw a NotFoundException if the API key is invalid', async () => {
      const apiKey = 'invalid-api-key';

      jest.spyOn(apiKeyService, 'validateApiKey').mockResolvedValue(false);

      await expect(service.validateApiKey(apiKey)).rejects.toThrowError(
        NotFoundException,
      );
    });
  });
});
