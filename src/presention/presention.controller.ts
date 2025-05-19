import { Controller, Get, InternalServerErrorException } from "@nestjs/common";
import { formatErrorResponse, formatResponse } from "../helper/response.helper";
import { PresentionService } from "./presention.service";

@Controller("presention")
export class PresentionController {
	private readonly presentionService: PresentionService;

	constructor(presentionService: PresentionService) {
		this.presentionService = presentionService;
	}

	@Get()
	async getAllLogs() {
		const data = await this.presentionService.getAllLogs();
		return formatResponse(
			true,
			"Berhasil mendapatkan semua Presention data",
			data,
			null,
		);
	}
}
