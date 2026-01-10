jest.mock('uuid', () => ({
  v4: () => 'mock-uuid-123',
}));

import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { getModelToken } from '@nestjs/mongoose';
import { NotFoundException } from '@nestjs/common';
import { FilesService } from '../common/files/files.service';

jest.mock('../common/files/files.service'); 

describe('UsersService', () => {
  let service: UsersService;
  let filesService: FilesService;

  const mockUser = {
    _id: '65f1c2a9e123456789abcd01',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@gmail.com',
    profilePhoto: null,
    save: jest.fn().mockResolvedValue(this),
  };

  const mockUserModel = {
    new: jest.fn().mockResolvedValue(mockUser),
    constructor: jest.fn().mockReturnValue(mockUser),
    find: jest.fn().mockReturnValue({
      skip: jest.fn().mockReturnValue({
        limit: jest.fn().mockReturnValue({
          exec: jest.fn().mockResolvedValue([mockUser]),
        }),
      }),
    }),
    findById: jest.fn().mockReturnValue({
      exec: jest.fn().mockResolvedValue(mockUser),
    }),
    findOne: jest.fn().mockReturnValue({
      exec: jest.fn().mockResolvedValue(mockUser),
    }),
    updateMany: jest.fn().mockResolvedValue({ modifiedCount: 1 }),
    aggregate: jest.fn().mockResolvedValue([{ _id: 'm', averageAge: 25 }]),
  };

  const mockFilesService = {
    uploadFile: jest.fn().mockResolvedValue('https://cloudfront.net/photo.jpg'),
    deleteFile: jest.fn().mockResolvedValue(undefined),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getModelToken('User'),
          useValue: mockUserModel,
        },
        {
          provide: FilesService,
          useValue: mockFilesService,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    filesService = module.get<FilesService>(FilesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findById', () => {
    it('should return a user if found', async () => {
      const result = await service.findById('65f1c2a9e123456789abcd01');
      expect(result).toEqual(mockUser);
      expect(mockUserModel.findById).toHaveBeenCalled();
    });

    it('should throw NotFoundException if user is not found', async () => {
      mockUserModel.findById.mockReturnValueOnce({
        exec: jest.fn().mockResolvedValue(null),
      });

      await expect(service.findById('invalid-id')).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const result = await service.findAll(1, 10);
      expect(result).toEqual([mockUser]);
      expect(mockUserModel.find).toHaveBeenCalled();
    });
  });

  describe('updateProfilePhoto', () => {
    it('should upload a photo and update the user', async () => {
      const mockFile = { buffer: Buffer.from('test'), originalname: 'test.jpg' } as any;
      jest.spyOn(service, 'findById').mockResolvedValue(mockUser as any);
      
      const result = await service.updateProfilePhoto(mockUser._id, mockFile);

      expect(filesService.uploadFile).toHaveBeenCalledWith(mockFile, 'profiles');
      expect(mockUser.profilePhoto).toBe('https://cloudfront.net/photo.jpg');
      expect(mockUser.save).toHaveBeenCalled();
    });

    it('should delete the old photo if it exists', async () => {
      const mockFile = { buffer: Buffer.from('test') } as any;
      const userWithPhoto = { 
        ...mockUser, 
        profilePhoto: 'old-photo-url',
        save: jest.fn().mockResolvedValue(this) 
      };

      jest.spyOn(service, 'findById').mockResolvedValue(userWithPhoto as any);

      await service.updateProfilePhoto(mockUser._id, mockFile);

      expect(filesService.deleteFile).toHaveBeenCalledWith('old-photo-url');
    });
  });
});