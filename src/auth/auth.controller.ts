import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto } from './dto';

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
}
