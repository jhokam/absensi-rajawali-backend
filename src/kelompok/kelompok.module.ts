import { Module } from '@nestjs/common';
import { KelompokService } from './kelompok.service';
import { KelompokController } from './kelompok.controller';

@Module({
  providers: [KelompokService],
  controllers: [KelompokController]
})
export class KelompokModule {}
