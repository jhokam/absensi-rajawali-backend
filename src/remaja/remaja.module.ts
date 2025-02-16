import { Module } from "@nestjs/common";
import { PrismaModule } from "src/prisma/prisma.module";
import { RemajaController } from "./remaja.controller";
import { RemajaService } from "./remaja.service";

@Module({
	imports: [PrismaModule],
	controllers: [RemajaController],
	providers: [RemajaService],
})
export class RemajaModule {}
