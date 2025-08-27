import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseService } from '../database.service';

describe('DatabaseService', () => {
  let service: DatabaseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DatabaseService],
    }).compile();

    service = module.get<DatabaseService>(DatabaseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should call $connect on module init', async () => {
    const connectSpy = jest.spyOn(service, '$connect').mockResolvedValueOnce();

    await service.onModuleInit();

    expect(connectSpy).toHaveBeenCalledTimes(1);

    connectSpy.mockRestore();
  });
});
