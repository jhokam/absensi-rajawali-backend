import { Controller, Get } from "@nestjs/common";
import { formatResponse } from "../helper/response.helper";
import { LogService } from "./log.service";

@Controller("log")
export class LogController {
	private readonly logService: LogService;

	constructor(logService: LogService) {
		this.logService = logService;
	}

	@Get()
	async getAllLogs() {
		const data = await this.logService.getAllLogs();
		return formatResponse(
			true,
			"Berhasil mendapatkan semua Log data",
			data,
			null,
		);
	}
}
