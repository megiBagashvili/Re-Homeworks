import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Expense } from './schemas/expense.schema';

@Injectable()
export class ExpensesService {
  constructor(
    @InjectModel('Expense') private readonly expenseModel: Model<Expense>,
  ) { }

  async create(dto: any, userId: string) {
    const newExpense = new this.expenseModel({
      ...dto,
      amount: dto.amount,
      userId,
    });

    return newExpense.save();
  }

  async findAll(page = 1, take = 30, filters: any) {
    return this.expenseModel.find(filters).skip((page - 1) * take).limit(take).exec();
  }

  async getStatistics() {
    return this.expenseModel.aggregate([
      {
        $group: {
          _id: '$category',
          totalAmount: { $sum: '$amount' },
          itemCount: { $sum: 1 },
          expenses: { $push: '$$ROOT' },
        },
      },
    ]);
  }

  async getTopSpenders(limit: number = 10) {
    return this.expenseModel.aggregate([
      {
        $group: {
          _id: '$userId',
          totalSpent: { $sum: '$amount' },
        },
      },
      { $sort: { totalSpent: -1 } },
      { $limit: Number(limit) },
    ]);
  }
}