import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class CreateProductDto {
  @ApiProperty({ example: 'Laptop' })
  @IsString()
  name: string;

  @ApiProperty({ example: 1500 })
  @IsNumber()
  @Min(0)
  price: number;

  @ApiProperty({ example: 'electronics' })
  @IsString()
  category: string;

  @IsOptional()
  @IsString()
  description: string;

  @ApiProperty({ example: 5 })
  @IsNumber()
  @Min(0)
  quantity: number;
}
