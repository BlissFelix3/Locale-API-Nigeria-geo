import { IsString, IsNotEmpty, IsEmail } from 'class-validator';

export class SignupDto {
  @IsString({ message: 'Name must be string' })
  @IsNotEmpty({ message: 'name is required!' })
  name: string;

  @IsString({ message: 'Email must be string' })
  @IsNotEmpty({ message: 'Email is required!' })
  @IsEmail({}, { message: 'Please provide a valid email!' })
  email: string;

  @IsString({ message: 'Password must be string' })
  @IsNotEmpty({ message: 'Password is required!' })
  password: string;
}
