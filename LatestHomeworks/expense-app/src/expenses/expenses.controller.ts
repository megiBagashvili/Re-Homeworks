import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { ExpensesService } from './expenses.service';

@Controller('expenses')
export class ExpensesController {
  constructor(private readonly expensesService: ExpensesService) {}

  @Post()
  async create(@Body() createExpenseDto: any) {
    return this.expensesService.create(createExpenseDto, createExpenseDto.userId);
  }

  @Get('statistic')
  async getStats() {
    return this.expensesService.getStatistics();
  }

  @Get('top-spenders')
  async getTopSpenders(@Query('limit') limit: number) {
    return this.expensesService.getTopSpenders(limit);
  }

  @Get()
  async findAll(@Query('page') page: number, @Query('take') take: number) {
    return this.expensesService.findAll(page, Number(take), {});
  }
}