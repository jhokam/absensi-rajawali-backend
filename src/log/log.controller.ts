import { Controller, Get, InternalServerErrorException } from "@nestjs/common";
import { formatErrorResponse, formatResponse } from "../helper/response.helper";
import { LogService } from "./log.service";

@Controller("log")
export class LogController {
	private readonly logService: LogService;

	constructor(logService: LogService) {
		this.logService = logService;
	}

	@Get()
	async getAllLogs() {
		try {
			const data = await this.logService.getAllLogs();
			return formatResponse(
				true,
				"Berhasil mendapatkan semua Log data",
				data,
				null,
			);
		} catch (error) {
			return formatErrorResponse(
				"Failed to retrieve all Log data",
				new InternalServerErrorException("Failed to retrieve all Log data"),
			);
		}
	}
}
