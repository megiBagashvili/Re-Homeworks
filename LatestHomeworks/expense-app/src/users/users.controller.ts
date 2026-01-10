import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  NotFoundException,
  UseInterceptors,
  UploadedFile,
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiTags,
  ApiOperation,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiConsumes,
  ApiBody,
} from '@nestjs/swagger';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

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
    user.subscriptionEndDate = new Date(
      currentEnd.setMonth(currentEnd.getMonth() + 1),
    );
    return user.save();
  }

  @Post(':id/profile-photo')
  @ApiOperation({ summary: 'Upload a profile photo for a user' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiOkResponse({ description: 'Photo uploaded successfully' })
  @UseInterceptors(FileInterceptor('file'))
  async uploadProfilePhoto(
    @Param('id') id: string,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 2 }),
          new FileTypeValidator({ fileType: 'image/*' }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    return this.usersService.updateProfilePhoto(id, file);
  }
}