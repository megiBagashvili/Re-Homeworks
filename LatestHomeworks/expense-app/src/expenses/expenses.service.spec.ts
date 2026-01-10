import { Test, TestingModule } from '@nestjs/testing';
import { ExpensesService } from './expenses.service';
import { getModelToken } from '@nestjs/mongoose';

describe('ExpensesService', () => {
  let service: ExpensesService;

  const mockExpense = {
    _id: '65f1c2a9e123456789abcd02',
    userId: '65f1c2a9e123456789abcd01',
    category: 'food',
    amount: 150,
  };

  const mockExpenseModelMethods = {
    find: jest.fn().mockReturnValue({
      skip: jest.fn().mockReturnValue({
        limit: jest.fn().mockReturnValue({
          exec: jest.fn().mockResolvedValue([mockExpense]),
        }),
      }),
    }),
    aggregate: jest.fn(),
  };

  const MockModel: any = jest.fn().mockImplementation((dto) => ({
    ...dto,
    save: jest.fn().mockResolvedValue({ ...dto, _id: 'mock-id' }),
  }));
  Object.assign(MockModel, mockExpenseModelMethods);

  beforeEach(async () => {
    jest.clearAllMocks();
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ExpensesService,
        {
          provide: getModelToken('Expense'),
          useValue: MockModel,
        },
      ],
    }).compile();

    service = module.get<ExpensesService>(ExpensesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create and save a new expense', async () => {
      const dto = { category: 'travel', amount: 50 };
      const userId = 'user-123';

      const result = await service.create(dto, userId);

      expect(result).toBeDefined();
      expect(result.amount).toBe(50);
      expect(result.userId).toBe(userId);
    });
  });

  describe('findAll', () => {
    it('should return paginated expenses', async () => {
      const result = await service.findAll(1, 10, {});
      expect(result).toEqual([mockExpense]);
      expect(MockModel.find).toHaveBeenCalled();
    });
  });

  describe('getStatistics', () => {
    it('should return aggregated category statistics', async () => {
      const mockStats = [
        { _id: 'food', totalAmount: 500, itemCount: 5 },
      ];
      MockModel.aggregate.mockResolvedValue(mockStats);

      const result = await service.getStatistics();
      
      expect(result).toEqual(mockStats);
      expect(MockModel.aggregate).toHaveBeenCalled();
    });
  });

  describe('getTopSpenders', () => {
    it('should return top spenders', async () => {
      const mockTopSpenders = [
        { _id: 'user1', totalSpent: 2000 },
      ];

      MockModel.aggregate.mockResolvedValue(mockTopSpenders);

      const result = await service.getTopSpenders(2);

      expect(result).toEqual(mockTopSpenders);
      const pipeline = MockModel.aggregate.mock.calls[0][0];
      expect(pipeline).toContainEqual({ $limit: 2 });
    });
  });
});