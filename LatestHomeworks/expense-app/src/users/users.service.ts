import { Injectable, OnModuleInit, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';

@Injectable()
export class UsersService implements OnModuleInit {
  constructor(
    @InjectModel('User') private readonly userModel: Model<User>,
  ) { }

  async create(createUserDto: any): Promise<User> {
    const newUser = new this.userModel(createUserDto);
    return newUser.save();
  }

  async onModuleInit(): Promise<void> {
    await this.runIsActiveMigration();
  }

  async runIsActiveMigration(): Promise<void> {
    const result = await this.userModel.updateMany(
      { isActive: { $exists: false } },
      { $set: { isActive: true } },
    );

    if (result.modifiedCount > 0) {
      console.log(`Migration: Added isActive property to ${result.modifiedCount} users.`);
    }
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ email }).exec();
  }

  async findById(id: string): Promise<User | null> {
    const user = await this.userModel.findById(id).exec();
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async getGenderStats() {
    return this.userModel.aggregate([
      {
        $group: {
          _id: '$gender',
          averageAge: { $avg: '$age' },
          count: { $sum: 1 },
        },
      },
    ]);
  }
}