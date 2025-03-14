import { Module } from "@nestjs/common";
import { PrismaModule } from "src/prisma/prisma.module";
import { DesaController } from "./desa.controller";
import { DesaService } from "./desa.service";

@Module({
	imports: [PrismaModule],
	providers: [DesaService],
	controllers: [DesaController],
})
export class DesaModule {}
