jest.mock('uuid', () => ({ v4: () => 'mock-uuid' }));

const mockS3Send = jest.fn();
jest.mock('@aws-sdk/client-s3', () => {
  return {
    S3Client: jest.fn().mockImplementation(() => ({
      send: mockS3Send,
    })),
    PutObjectCommand: jest.fn().mockImplementation((args) => args),
    DeleteObjectCommand: jest.fn().mockImplementation((args) => args),
  };
});

import { Test, TestingModule } from '@nestjs/testing';
import { FilesService } from './files.service';
import { ConfigService } from '@nestjs/config';

describe('FilesService', () => {
  let service: FilesService;
  let configService: ConfigService;

  const mockConfig = {
    'AWS_REGION': 'eu-north-1',
    'AWS_ACCESS_KEY_ID': 'fake-key',
    'AWS_SECRET_ACCESS_KEY': 'fake-secret',
    'AWS_S3_BUCKET_NAME': 'test-bucket',
    'AWS_CLOUDFRONT_DOMAIN': 'test.cloudfront.net',
  };

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FilesService,
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn((key: string) => mockConfig[key]),
          },
        },
      ],
    }).compile();

    service = module.get<FilesService>(FilesService);
    configService = module.get<ConfigService>(ConfigService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('uploadFile', () => {
    it('should upload a file and return the CloudFront URL', async () => {
      const mockFile = {
        originalname: 'test.png',
        mimetype: 'image/png',
        buffer: Buffer.from('fake-image-data'),
      } as Express.Multer.File;

      const result = await service.uploadFile(mockFile, 'test-folder');

      expect(mockS3Send).toHaveBeenCalledTimes(1);
      expect(result).toBe('https://test.cloudfront.net/test-folder/mock-uuid-test.png');
    });
  });

  describe('deleteFile', () => {
    it('should extract the key and call delete on S3', async () => {
      const url = 'https://test.cloudfront.net/test-folder/file-to-delete.png';
      
      await service.deleteFile(url);

      expect(mockS3Send).toHaveBeenCalledTimes(1);
      
      const calledArgs = mockS3Send.mock.calls[0][0];
      expect(calledArgs.Key).toBe('test-folder/file-to-delete.png');
      expect(calledArgs.Bucket).toBe('test-bucket');
    });

    it('should not call S3 if the URL is invalid or from a different domain', async () => {
      const invalidUrl = 'https://wrong-domain.com/file.png';
      
      await service.deleteFile(invalidUrl);

      expect(mockS3Send).not.toHaveBeenCalled();
    });
  });
});