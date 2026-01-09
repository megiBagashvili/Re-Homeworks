import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { ExpensesService } from './expenses.service';
import { CreateExpenseDto } from './dto/create-expense.dto';

@Controller('expenses')
export class ExpensesController {
  constructor(private readonly expensesService: ExpensesService) {}

  @Post()
  async create(@Body() createExpenseDto: CreateExpenseDto) {
    return this.expensesService.create(
      createExpenseDto,
      createExpenseDto.userId,
    );
  }

  @Get('statistic')
  async getStats() {
    return this.expensesService.getStatistics();
  }

  @Get('top-spenders')
  async getTopSpenders(@Query('limit') limit: number) {
    return this.expensesService.getTopSpenders(Number(limit));
  }

  @Get()
  async findAll(@Query('page') page: number, @Query('take') take: number) {
    return this.expensesService.findAll(page, Number(take), {});
  }
}
