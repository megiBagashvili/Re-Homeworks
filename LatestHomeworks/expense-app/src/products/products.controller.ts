import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  Param,
  UseInterceptors,
  UploadedFiles,
  Delete,
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import {
  ApiTags,
  ApiOperation,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiQuery,
  ApiConsumes,
  ApiBody,
} from '@nestjs/swagger';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  @ApiOperation({
    summary: 'Get all products (discount applies if email is active subscriber)',
  })
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

  @Post(':id/photos')
  @ApiOperation({ summary: 'Upload multiple photos for a product' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        files: {
          type: 'array',
          items: { type: 'string', format: 'binary' },
        },
      },
    },
  })
  @UseInterceptors(FilesInterceptor('files', 5))
  async uploadPhotos(
    @Param('id') id: string,
    @UploadedFiles(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 5 }),
          new FileTypeValidator({ fileType: 'image/*' }),
        ],
      }),
    )
    files: Express.Multer.File[],
  ) {
    return this.productsService.uploadPhotos(id, files);
  }

  @Delete(':id/photos')
  @ApiOperation({ summary: 'Delete a specific photo from a product' })
  @ApiQuery({ name: 'photoUrl', required: true })
  async deletePhoto(
    @Param('id') id: string,
    @Query('photoUrl') photoUrl: string,
  ) {
    return this.productsService.deletePhoto(id, photoUrl);
  }
}