import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from './schemas/product.schema'; // Make sure this path is correct
import { UsersService } from '../users/users.service'; // Make sure this path is correct

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel('Product') private readonly productModel: Model<Product>,
    private readonly userService: UsersService,
  ) {}

  async findAll(email?: string) {
    // .lean() makes the documents plain JS objects so we can modify 'price'
    const products = await this.productModel.find().lean();

    if (email) {
      const user = await this.userService.findByEmail(email);
      
      // Fixed the "Object is possibly undefined" by checking if user exists first
      const isActive = user && user.subscriptionEndDate && new Date(user.subscriptionEndDate) > new Date();

      if (isActive) {
        // Return products with 10% discount
        return products.map((p) => ({
          ...p,
          price: (p.price || 0) * 0.9,
        }));
      }
    }

    return products;
  }
}