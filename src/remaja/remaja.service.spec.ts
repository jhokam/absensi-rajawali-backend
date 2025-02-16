import { Test, TestingModule } from '@nestjs/testing';
import { RemajaService } from './remaja.service';

describe('RemajaService', () => {
  let service: RemajaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RemajaService],
    }).compile();

    service = module.get<RemajaService>(RemajaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
