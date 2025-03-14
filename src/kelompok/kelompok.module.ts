import { Module } from "@nestjs/common";
import { PrismaModule } from "../prisma/prisma.module";
import { KelompokController } from "./kelompok.controller";
import { KelompokService } from "./kelompok.service";

@Module({
	imports: [PrismaModule],
	providers: [KelompokService],
	controllers: [KelompokController],
})
export class KelompokModule {}
