import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { ExpensesService } from './expenses.service';
import { CreateExpenseDto } from './dto/create-expense.dto';
import {
  ApiTags,
  ApiOperation,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiQuery,
} from '@nestjs/swagger';


@ApiTags('Expenses')
@Controller('expenses')
export class ExpensesController {
  constructor(private readonly expensesService: ExpensesService) { }

  @Post()
  @ApiOperation({ summary: 'Create a new expense' })
  @ApiCreatedResponse({
    example: {
      _id: '65f1c2a9e123456789abcd02',
      category: 'food',
      amount: 150,
      userId: '65f1c2a9e123456789abcd01',
    },
  })
  async create(@Body() createExpenseDto: CreateExpenseDto) {
    return this.expensesService.create(
      createExpenseDto,
      createExpenseDto.userId,
    );
  }


  @Get('statistic')
  @ApiOperation({ summary: 'Get expenses grouped by category' })
  @ApiOkResponse({
    example: [
      {
        _id: 'food',
        totalAmount: 450,
        itemCount: 3,
      },
    ],
  })
  async getStats() {
    return this.expensesService.getStatistics();
  }

  @Get('top-spenders')
  @ApiOperation({ summary: 'Get top users by total spending' })
  @ApiQuery({ name: 'limit', required: false, example: 10 })
  @ApiOkResponse({
    example: [
      {
        _id: '65f1c2a9e123456789abcd01',
        totalSpent: 1200,
      },
    ],
  })
  async getTopSpenders(@Query('limit') limit: number) {
    return this.expensesService.getTopSpenders(Number(limit));
  }

  @Get()
  @ApiOperation({ summary: 'Get all expenses with pagination' })
  @ApiQuery({ name: 'page', required: false, example: 1 })
  @ApiQuery({ name: 'take', required: false, example: 30 })
  @ApiOkResponse({ description: 'List of expenses' })

  async findAll(@Query('page') page: number, @Query('take') take: number) {
    return this.expensesService.findAll(page, Number(take), {});
  }
}
