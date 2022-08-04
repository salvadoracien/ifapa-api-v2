import { Test, TestingModule } from '@nestjs/testing';
import { ReactoresService } from './reactores.service';

describe('ReactoresService', () => {
  let service: ReactoresService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReactoresService],
    }).compile();

    service = module.get<ReactoresService>(ReactoresService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
