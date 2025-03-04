import { Module } from "@nestjs/common";
import { PrismaModule } from "src/prisma/prisma.module";
import { GenerusController } from "./generus.controller";
import { GenerusService } from "./generus.service";

@Module({
	imports: [PrismaModule],
	controllers: [GenerusController],
	providers: [GenerusService],
})
export class GenerusModule {}
