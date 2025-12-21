import { IsEmail, IsEnum, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsEmail()
  email: string;

  @IsEnum(['m', 'f'])
  gender: string;

  @IsString()
  @MinLength(6)
  password: string;
}