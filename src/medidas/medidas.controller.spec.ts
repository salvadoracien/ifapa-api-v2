import { Test, TestingModule } from '@nestjs/testing';
import { MedidasController } from './medidas.controller';
import { MedidasService } from './medidas.service';

describe('MedidasController', () => {
  let controller: MedidasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MedidasController],
      providers: [MedidasService],
    }).compile();

    controller = module.get<MedidasController>(MedidasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
