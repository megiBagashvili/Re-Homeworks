jest.mock('uuid', () => ({ v4: () => 'mock-uuid' }));

import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from './products.service';
import { getModelToken } from '@nestjs/mongoose';
import { NotFoundException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { FilesService } from '../common/files/files.service';

describe('ProductsService', () => {
  let service: ProductsService;
  let usersService: UsersService;
  let filesService: FilesService;

  const mockProduct = {
    _id: 'prod-123',
    name: 'Laptop',
    price: 1000,
    photos: [],
    save: jest.fn().mockResolvedValue(this),
  };

  const mockProductModel = {
    create: jest.fn().mockResolvedValue(mockProduct),
    findById: jest.fn(),
    find: jest.fn().mockReturnValue({
      lean: jest.fn().mockResolvedValue([{ ...mockProduct }]),
    }),
  };

  const mockUsersService = {
    findByEmail: jest.fn(),
  };

  const mockFilesService = {
    uploadFile: jest.fn().mockResolvedValue('https://cloudfront.net/img.jpg'),
    deleteFile: jest.fn().mockResolvedValue(undefined),
  };

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsService,
        {
          provide: getModelToken('Product'),
          useValue: mockProductModel,
        },
        {
          provide: UsersService,
          useValue: mockUsersService,
        },
        {
          provide: FilesService,
          useValue: mockFilesService,
        },
      ],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
    usersService = module.get<UsersService>(UsersService);
    filesService = module.get<FilesService>(FilesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll (Discount Logic)', () => {
    it('should return original prices if no email is provided', async () => {
      const result = await service.findAll();
      expect(result[0].price).toBe(1000);
      expect(usersService.findByEmail).not.toHaveBeenCalled();
    });

    it('should return discounted prices for active subscribers', async () => {
      const futureDate = new Date();
      futureDate.setMonth(futureDate.getMonth() + 1);
      
      mockUsersService.findByEmail.mockResolvedValue({
        subscriptionEndDate: futureDate,
      });

      const result = await service.findAll('active@user.com');
      
      expect(result[0].price).toBe(900);
    });

    it('should return original prices if user is not active', async () => {
      const pastDate = new Date();
      pastDate.setMonth(pastDate.getMonth() - 1);

      mockUsersService.findByEmail.mockResolvedValue({
        subscriptionEndDate: pastDate,
      });

      const result = await service.findAll('expired@user.com');
      expect(result[0].price).toBe(1000);
    });
  });

  describe('uploadPhotos', () => {
    it('should upload multiple files and update product', async () => {
      const mockFiles = [
        { originalname: 'img1.jpg' },
        { originalname: 'img2.jpg' },
      ] as any[];

      const productToUpdate = { ...mockProduct, photos: [], save: jest.fn().mockResolvedValue(true) };
      jest.spyOn(service, 'findById').mockResolvedValue(productToUpdate as any);

      await service.uploadPhotos('prod-123', mockFiles);

      expect(filesService.uploadFile).toHaveBeenCalledTimes(2);
      expect(productToUpdate.photos).toHaveLength(2);
      expect(productToUpdate.save).toHaveBeenCalled();
    });
  });

  describe('deletePhoto', () => {
    it('should delete file from S3 and remove URL from array', async () => {
      const photoUrl = 'https://cloudfront.net/delete-me.jpg';
      const productWithPhotos = { 
        ...mockProduct, 
        photos: [photoUrl, 'other.jpg'],
        save: jest.fn().mockResolvedValue(true)
      };

      jest.spyOn(service, 'findById').mockResolvedValue(productWithPhotos as any);

      await service.deletePhoto('prod-123', photoUrl);

      expect(filesService.deleteFile).toHaveBeenCalledWith(photoUrl);
      expect(productWithPhotos.photos).not.toContain(photoUrl);
      expect(productWithPhotos.photos).toHaveLength(1);
    });
  });

  describe('findById', () => {
    it('should throw NotFoundException if product missing', async () => {
      mockProductModel.findById.mockReturnValue({
        exec: jest.fn().mockResolvedValue(null),
      });

      await expect(service.findById('non-existent')).rejects.toThrow(NotFoundException);
    });
  });
});