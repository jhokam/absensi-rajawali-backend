import { Module } from "@nestjs/common";
import { PrismaModule } from "../prisma/prisma.module";
import { PresentionController } from "./presention.controller";
import { PresentionService } from "./presention.service";

@Module({
	imports: [PrismaModule],
	providers: [PresentionService],
	controllers: [PresentionController],
})
export class PresentionModule {}
