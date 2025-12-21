import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Expense } from './schemas/expense.schema';

@Injectable()
export class ExpensesService {
  constructor(@InjectModel('Expense') private expenseModel: Model<Expense>) {}

  async findAll(page = 1, take = 30, filters: any) {
    const skip = (page - 1) * take;
    return this.expenseModel.find(filters).skip(skip).limit(take).exec();
  }

  async create(createExpenseDto: any, userId: string) {
    const total = createExpenseDto.price * createExpenseDto.quantity;
    const newExpense = new this.expenseModel({
      ...createExpenseDto,
      totalPrice: total,
      userId,
    });
    return newExpense.save();
  }
}