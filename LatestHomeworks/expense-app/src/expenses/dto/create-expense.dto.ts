import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, Min } from 'class-validator';

export class CreateExpenseDto {
  @ApiProperty({ example: 'Groceries' })
  @IsString()
  title: string;

  @ApiProperty({ example: 150 })
  @IsNumber()
  @Min(0)
  amount: number;

  @ApiProperty({ example: 'food' })
  @IsString()
  category: string;

  @ApiProperty({ example: '65f1c2a9e123456789abcd01' })
  @IsString()
  userId: string;
}