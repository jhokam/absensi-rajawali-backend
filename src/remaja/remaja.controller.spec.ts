import { Test, TestingModule } from '@nestjs/testing';
import { RemajaController } from './remaja.controller';

describe('RemajaController', () => {
  let controller: RemajaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RemajaController],
    }).compile();

    controller = module.get<RemajaController>(RemajaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
