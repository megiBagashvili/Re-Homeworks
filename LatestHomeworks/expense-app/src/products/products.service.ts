import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from './schemas/product.schema';
import { UsersService } from '../users/users.service';
import { FilesService } from '../common/files/files.service';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel('Product') private readonly productModel: Model<Product>,
    private readonly userService: UsersService,
    private readonly filesService: FilesService,
  ) {}

  async create(createProductDto: any) {
    return this.productModel.create(createProductDto);
  }

  async findById(id: string): Promise<Product> {
    const product = await this.productModel.findById(id).exec();
    if (!product) throw new NotFoundException('Product not found');
    return product;
  }

  async findAll(email?: string) {
    const products = await this.productModel.find().lean();

    if (email) {
      const user = await this.userService.findByEmail(email);
      const isActive =
        user && user.subscriptionEndDate && new Date(user.subscriptionEndDate) > new Date();

      if (isActive) {
        return products.map((p) => ({
          ...p,
          price: (p.price || 0) * 0.9,
        }));
      }
    }
    return products;
  }

  async uploadPhotos(productId: string, files: Express.Multer.File[]) {
    const product = await this.findById(productId);

    const uploadPromises = files.map((file) =>
      this.filesService.uploadFile(file, 'products'),
    );
    const newPhotoUrls = await Promise.all(uploadPromises);

    product.photos.push(...newPhotoUrls);
    return product.save();
  }

  async deletePhoto(productId: string, photoUrl: string) {
    const product = await this.findById(productId);

    await this.filesService.deleteFile(photoUrl);

    product.photos = product.photos.filter((url) => url !== photoUrl);
    
    return product.save();
  }
}