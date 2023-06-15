import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { SignupDto } from './dto';
import { ApiKeyService } from './key';
import { getModelToken } from '@nestjs/mongoose';

describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        AuthService,
        ApiKeyService,
        {
          provide: getModelToken('ApiKey'),
          useValue: {},
        },
      ],
    }).compile();

    authController = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  describe('signup', () => {
    it('should create a new record and return an API key', async () => {
      const signupDto: SignupDto = {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password',
      };

      const mockedApiKey = {
        _id: 'mockedId',
        key: 'mockedKey',
        name: signupDto.name,
        email: signupDto.email,
        password: 'hashedPassword',
        created: new Date(),
        expires: new Date(),
      };
      jest.spyOn(authService, 'signup').mockResolvedValue(mockedApiKey);

      const result = await authController.signup(signupDto);

      expect(authService.signup).toHaveBeenCalledWith(signupDto);
      expect(result).toEqual({
        api_key: mockedApiKey.key,
        message:
          'Key can only be seen once and refreshes after an hour: save key',
      });
    });
  });
});
