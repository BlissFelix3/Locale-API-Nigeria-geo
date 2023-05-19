import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, SignupDto } from './dto';
import { ApiKeyAuthGuard } from '../common/guards/apikey-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signup(@Body() signupDto: SignupDto) {
    const apiKey = await this.authService.signup(signupDto);
    return {
      api_key: apiKey.key,
      message: 'Key can only be seen once: save key',
    };
  }

  @Post('login')
  @UseGuards(ApiKeyAuthGuard)
  async login(@Body() loginDto: LoginDto) {
    const apiKey = await this.authService.login(loginDto);
    return { id: apiKey._id, message: 'Login Successful' };
  }
}
