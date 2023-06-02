// import { NotFoundException } from '@nestjs/common';
// import { Model } from 'mongoose';
// import { SignupDto } from '../dto';
// import * as bcrypt from 'bcrypt';
// import {ApiKey, ApiKeyDocument} from './apikey.model'
// import {ApiKeyService} from './apikey.service'

// class MockApiKeyModel {
//   public static findOne() {}
//   public static findById() {}
// }

// describe('ApiKeyService', () => {
//   let apiKeyService: ApiKeyService;
//   let apiKeyModel: Model<ApiKeyDocument>;

//   beforeEach(async () => {
//     apiKeyModel = new MockApiKeyModel() as unknown as Model<ApiKeyDocument>;
//     apiKeyService = new ApiKeyService(apiKeyModel);
//   });

//   describe('createApiKey', () => {
//     it('should create and return a new API key', async () => {
//       const signupDto: SignupDto = {
//         name: 'Test User',
//         email: 'test@example.com',
//         password: 'password123',
//       };

//       const salt = await bcrypt.genSalt();
//       const hashedPassword = await bcrypt.hash(signupDto.password, salt);

//       const createdApiKey: ApiKeyDocument = {
//         _id: '1',
//         key: 'valid-api-key',
//         name: signupDto.name,
//         email: signupDto.email,
//         password: hashedPassword,
//         save: jest.fn(),
//       } as unknown as ApiKeyDocument;

//       jest.spyOn(apiKeyModel.prototype, 'save').mockResolvedValueOnce(createdApiKey);

//       const result = await apiKeyService.createApiKey(signupDto);

//       expect(apiKeyModel.prototype.save).toHaveBeenCalledTimes(1);
//       expect(result).toEqual(createdApiKey);
//     });

//     it('should throw an error if failed to create API key', async () => {
//       const signupDto: SignupDto = {
//         name: 'Test User',
//         email: 'test@example.com',
//         password: 'password123',
//       };

//       jest.spyOn(bcrypt, 'genSalt').mockRejectedValueOnce(new Error('Failed to generate salt'));

//       await expect(apiKeyService.createApiKey(signupDto)).rejects.toThrowError('Failed to create API key');
//       expect(bcrypt.genSalt).toHaveBeenCalledTimes(1);
//     });
//   });

//   describe('validateApiKey', () => {
//     it('should return true when the API key is found', async () => {
//       const apiKey = 'valid-api-key';

//       jest.spyOn(apiKeyModel, 'findOne').mockResolvedValueOnce({} as ApiKeyDocument);

//       const result = await apiKeyService.validateApiKey(apiKey);

//       expect(apiKeyModel.findOne).toHaveBeenCalledTimes(1);
//       expect(result).toBe(true);
//     });

//     it('should return false when the API key is not found', async () => {
//       const apiKey = 'invalid-api-key';

//       jest.spyOn(apiKeyModel, 'findOne').mockResolvedValueOnce(null);

//       const result = await apiKeyService.validateApiKey(apiKey);

//       expect(apiKeyModel.findOne).toHaveBeenCalledTimes(1);
//       expect(result).toBe(false);
//     });

//     it('should throw a NotFoundException when API key validation fails', async () => {
//       const apiKey = 'invalid-api-key';

//       jest.spyOn(apiKeyModel, 'findOne').mockRejectedValueOnce(new Error('Validation error'));

//       await expect(apiKeyService.validateApiKey(apiKey)).rejects.toThrowError(NotFoundException);
//       expect(apiKeyModel.findOne).toHaveBeenCalledTimes(1);
//     });
//   });

//   describe('findApiKeyByEmail', () => {
//     it('should return the API key with the given email', async () => {
//       const email = 'test@example.com';

//       const existingApiKey: ApiKeyDocument = {
//         _id: '1',
//         key: 'valid-api-key',
//         name: 'Test User',
//         email: email,
//         password: 'hashed-password',
//       } as unknown as ApiKeyDocument;

//       jest.spyOn(apiKeyModel, 'findOne').mockResolvedValueOnce(existingApiKey);

//       const result = await apiKeyService.findApiKeyByEmail(email);

//       expect(apiKeyModel.findOne).toHaveBeenCalledTimes(1);
//       expect(result).toEqual(existingApiKey);
//     });

//     it('should throw a NotFoundException when API key with the email is not found', async () => {
//       const email = 'nonexistent@example.com';

//       jest.spyOn(apiKeyModel, 'findOne').mockResolvedValueOnce(null);

//       await expect(apiKeyService.findApiKeyByEmail(email)).rejects.toThrowError(NotFoundException);
//       expect(apiKeyModel.findOne).toHaveBeenCalledTimes(1);
//     });
//   });

//   describe('findById', () => {
//     it('should return the API key with the given ID', async () => {
//       const id = '1';

//       const existingApiKey: ApiKeyDocument = {
//         _id: id,
//         key: 'valid-api-key',
//         name: 'Test User',
//         email: 'test@example.com',
//         password: 'hashed-password',
//       } as unknown as ApiKeyDocument;

//       jest.spyOn(apiKeyModel, 'findById').mockResolvedValueOnce(existingApiKey);

//       const result = await apiKeyService.findById(id);

//       expect(apiKeyModel.findById).toHaveBeenCalledTimes(1);
//       expect(result).toEqual(existingApiKey);
//     });

//     it('should throw a NotFoundException when no key with the ID is found', async () => {
//       const id = 'nonexistent-id';

//       jest.spyOn(apiKeyModel, 'findById').mockResolvedValueOnce(null);

//       await expect(apiKeyService.findById(id)).rejects.toThrowError(NotFoundException);
//       expect(apiKeyModel.findById).toHaveBeenCalledTimes(1);
//     });
//   });

//   describe('comparePassword', () => {
//     it('should return true when the password matches', async () => {
//       const apiKey: ApiKeyDocument = {
//         _id: '1',
//         key: 'valid-api-key',
//         name: 'Test User',
//         email: 'test@example.com',
//         password: await bcrypt.hash('password123', 10),
//       } as unknown as ApiKeyDocument;

//       jest.spyOn(bcrypt, 'compare').mockResolvedValueOnce(true);

//       const result = await apiKeyService.comparePassword(apiKey, 'password123');

//       expect(bcrypt.compare).toHaveBeenCalledTimes(1);
//       expect(result).toBe(true);
//     });

//     it('should return false when the password does not match', async () => {
//       const apiKey: ApiKeyDocument = {
//         _id: '1',
//         key: 'valid-api-key',
//         name: 'Test User',
//         email: 'test@example.com',
//         password: await bcrypt.hash('password123', 10),
//       } as unknown as ApiKeyDocument;

//       jest.spyOn(bcrypt, 'compare').mockResolvedValueOnce(false);

//       const result = await apiKeyService.comparePassword(apiKey, 'wrong-password');

//       expect(bcrypt.compare).toHaveBeenCalledTimes(1);
//       expect(result).toBe(false);
//     });

//     it('should throw an error if failed to compare passwords', async () => {
//       const apiKey: ApiKeyDocument = {
//         _id: '1',
//         key: 'valid-api-key',
//         name: 'Test User',
//         email: 'test@example.com',
//         password: 'hashed-password',
//       } as unknown as ApiKeyDocument;

//       jest.spyOn(bcrypt, 'compare').mockRejectedValueOnce(new Error('Comparison error'));

//       await expect(apiKeyService.comparePassword(apiKey, 'password123')).rejects.toThrowError('Failed to compare passwords');
//       expect(bcrypt.compare).toHaveBeenCalledTimes(1);
//     });
//   });
// });
