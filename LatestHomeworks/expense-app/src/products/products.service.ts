import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from './schemas/product.schema';
import { UsersService } from '../users/users.service';

@Injectable()
export class ProductsService {
    constructor(
        @InjectModel('Product') private readonly productModel: Model<Product>,
        private readonly userService: UsersService,
    ) { }

    async create(createProductDto: any) {
        return this.productModel.create(createProductDto);
    }

    async findAll(email?: string) {
        const products = await this.productModel.find().lean();

        if (email) {
            const user = await this.userService.findByEmail(email);

            const isActive = user && user.subscriptionEndDate && new Date(user.subscriptionEndDate) > new Date();

            if (isActive) {
                return products.map((p) => ({
                    ...p,
                    price: (p.price || 0) * 0.9,
                }));
            }
        }

        return products;
    }
}