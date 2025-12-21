import { Controller, Get, Post, Body, Query, UseGuards, Req } from '@nestjs/common';
import { ExpensesService } from './expenses.service';

@Controller('expenses')
export class ExpensesController {
  constructor(private readonly expensesService: ExpensesService) {}

  @Post()
  async create(@Body() createExpenseDto: any, @Body('userId') userId: string) {
    return this.expensesService.create(createExpenseDto, userId);
  }
  
  @Get()
  async findAll(
    @Query('page') page: number = 1,
    @Query('take') take: number = 30,
    @Query('category') category?: string,
    @Query('priceFrom') priceFrom?: number,
    @Query('priceTo') priceTo?: number,
  ) {
    const filters: any = {};
    if (category) filters.category = category;
    if (priceFrom || priceTo) {
      filters.price = {};
      if (priceFrom) filters.price.$gte = Number(priceFrom);
      if (priceTo) filters.price.$lte = Number(priceTo);
    }

    return this.expensesService.findAll(page, take, filters);
  }
}