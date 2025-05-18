import { Module } from "@nestjs/common";
import { PrismaModule } from "../prisma/prisma.module";
import { EventController } from "./event.controller";
import { EventService } from "./event.service";

@Module({
	imports: [PrismaModule],
	providers: [EventService],
	controllers: [EventController],
})
export class EventModule {}
