import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import {
  ApiTags,
  ApiOperation,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiQuery,
} from '@nestjs/swagger';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) { }

  @Get()
  @ApiOperation({ summary: 'Get all products (discount applies if email is active subscriber)' })
  @ApiQuery({ name: 'email', required: false, example: 'john@gmail.com' })
  @ApiOkResponse({ description: 'List of products' })
  async findAll(@Query('email') email?: string) {
    return this.productsService.findAll(email);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new product' })
  @ApiCreatedResponse({
    example: {
      _id: '65f1c2a9e123456789abcd03',
      name: 'Laptop',
      price: 1500,
      category: 'electronics',
      quantity: 5,
    },
  })
  async create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }
}