import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsNumber, IsString, Min, MinLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'John' })
  @IsString()
  firstName: string;

  @ApiProperty({ example: 'Doe' })
  @IsString()
  lastName: string;

  @ApiProperty({ example: 'john.doe@gmail.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'm', enum: ['m', 'f'] })
  @IsEnum(['m', 'f'])
  gender: string;

  @ApiProperty({ example: 25 })
  @IsNumber()
  @Min(0)
  age: number;

  @ApiProperty({ example: 'password123', minLength: 6 })
  @IsString()
  @MinLength(6)
  password: string;
}