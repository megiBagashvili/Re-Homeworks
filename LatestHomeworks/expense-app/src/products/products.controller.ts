import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  async findAll(@Query('email') email?: string) {
    return this.productsService.findAll(email);
  }

  @Post()
  async create(@Body() createProductDto: any) {
    return this.productsService.create(createProductDto);
  }
}