import { Controller, Get, Post, Body, NotFoundException } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import {
  ApiTags,
  ApiOperation,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiBadRequestResponse,
  ApiNotFoundResponse,
} from '@nestjs/swagger';


@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post()
  @ApiOperation({ summary: 'Create a new user' })
  @ApiCreatedResponse({
    example: {
      _id: '65f1c2a9e123456789abcd01',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@gmail.com',
      gender: 'm',
      age: 25,
      role: 'user',
      isActive: true,
    },
  })
  @ApiBadRequestResponse({
    example: {
      statusCode: 400,
      message: 'Validation failed',
      error: 'Bad Request',
    },
  })
  async create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get('gender-stats')
  @ApiOperation({ summary: 'Get average age grouped by gender' })
  @ApiOkResponse({
    example: {
      m: { averageAge: 27 },
      f: { averageAge: 24 },
    },
  })
  async getGenderStats() {
    return this.usersService.getGenderStats();
  }

  @Post('upgrade-subscription')
  @ApiOperation({ summary: 'Extend user subscription by one month' })
  @ApiOkResponse({
    example: {
      message: 'Subscription upgraded',
    },
  })
  @ApiNotFoundResponse({
    example: {
      statusCode: 404,
      message: 'User not found',
      error: 'Not Found',
    },
  })

  async upgrade(@Body('userId') userId: string) {
    const user = await this.usersService.findById(userId);
    if (!user) throw new NotFoundException('User not found');
    const currentEnd = new Date(user.subscriptionEndDate);
    user.subscriptionEndDate = new Date(currentEnd.setMonth(currentEnd.getMonth() + 1));
    return user.save();
  }
}