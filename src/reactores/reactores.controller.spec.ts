import { Test, TestingModule } from '@nestjs/testing';
import { ReactoresController } from './reactores.controller';
import { ReactoresService } from './reactores.service';

describe('ReactoresController', () => {
  let controller: ReactoresController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReactoresController],
      providers: [ReactoresService],
    }).compile();

    controller = module.get<ReactoresController>(ReactoresController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
