import { Module } from '@nestjs/common';
import { DesaService } from './desa.service';
import { DesaController } from './desa.controller';

@Module({
  providers: [DesaService],
  controllers: [DesaController]
})
export class DesaModule {}
