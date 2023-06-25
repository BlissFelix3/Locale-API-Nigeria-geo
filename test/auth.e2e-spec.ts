import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { ApiKeyService } from '../src/auth/key';
import { SignupDto } from '../src/auth/dto';
import { AuthService } from '../src/auth/auth.service';

describe('AuthController (e2e)', () => {
  let app: INestApplication;
  let apiKeyService: ApiKeyService;
  let authService: AuthService;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    apiKeyService = moduleFixture.get<ApiKeyService>(ApiKeyService);
    authService = moduleFixture.get<AuthService>(AuthService);
  }, 10000);

  afterAll(async () => {
    await app.close();
  }, 10000);

  describe('POST /auth/signup', () => {
    it('should create a new API key and return it', async () => {
      const signupDto: SignupDto = {
        name: 'John Doe',
        email: 'johndoe@example.com',
        password: 'password123',
      };

      const mockApiKey = {
        _id: 'mockedId',
        key: 'mockedKey',
        name: 'test name',
        email: 'test email',
        password: 'hashedPassword',
        created: new Date(),
        expires: new Date(),
      };
      jest.spyOn(apiKeyService, 'createApiKey').mockResolvedValue(mockApiKey);

      const response = await request(app.getHttpServer())
        .post('/auth/signup')
        .send(signupDto)
        .expect(HttpStatus.CREATED);

      expect(response.body).toEqual({
        api_key: mockApiKey.key,
        message:
          'Key can only be seen once and refreshes after an hour: save key',
      });
      expect(apiKeyService.createApiKey).toHaveBeenCalledWith(signupDto);
    });
  });
});
