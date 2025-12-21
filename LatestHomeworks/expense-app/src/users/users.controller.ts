import { Controller, Post, Body, NotFoundException } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  
  constructor(private readonly userService: UsersService) {}

  @Post('upgrade-subscription')
  async upgrade(@Body('userId') userId: string) {
    const user = await this.userService.findById(userId);
    
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const currentEnd = new Date(user.subscriptionEndDate);
    user.subscriptionEndDate = new Date(currentEnd.setMonth(currentEnd.getMonth() + 1));
    
    return user.save();
  }
}