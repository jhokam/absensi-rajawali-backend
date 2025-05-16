import { Module } from "@nestjs/common";
import { PresentionController } from "./presention.controller";
import { PresentionService } from "./presention.service";

@Module({
	providers: [PresentionService],
	controllers: [PresentionController],
})
export class PresentionModule {}
