import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsEmail } from 'class-validator';

export class SignupDto {
  @ApiProperty({ description: 'Name of the user' })
  @IsString({ message: 'Name must be string' })
  @IsNotEmpty({ message: 'name is required!' })
  name: string;

  @ApiProperty({ description: 'Email of the user' })
  @IsString({ message: 'Email must be string' })
  @IsNotEmpty({ message: 'Email is required!' })
  @IsEmail({}, { message: 'Please provide a valid email!' })
  email: string;

  @ApiProperty({ description: 'Password of the user' })
  @IsString({ message: 'Password must be string' })
  @IsNotEmpty({ message: 'Password is required!' })
  password: string;
}
