import { Module } from "@nestjs/common";
import { PrismaModule } from "../prisma/prisma.module";
import { LogController } from "./log.controller";
import { LogService } from "./log.service";

@Module({
	imports: [PrismaModule],
	providers: [LogService],
	controllers: [LogController],
})
export class LogModule {}
