import { Test, TestingModule } from '@nestjs/testing';
import { KelompokService } from './kelompok.service';

describe('KelompokService', () => {
  let service: KelompokService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [KelompokService],
    }).compile();

    service = module.get<KelompokService>(KelompokService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
