import { Test, TestingModule } from '@nestjs/testing';
import { MedidasService } from './medidas.service';

describe('MedidasService', () => {
  let service: MedidasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MedidasService],
    }).compile();

    service = module.get<MedidasService>(MedidasService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
