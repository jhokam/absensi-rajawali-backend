import { Controller, Get, Param, Query } from "@nestjs/common";
import { ApiQuery } from "@nestjs/swagger";
import { formatResponse } from "../helper/response.helper";
import type { LogEntity } from "./log.entity";
import { LogService } from "./log.service";

@Controller("log")
export class LogController {
	private readonly logService: LogService;

	constructor(logService: LogService) {
		this.logService = logService;
	}

	@Get()
	@ApiQuery({
		name: "q",
		required: false,
		type: String,
		description: "Search Logs by Title",
		example: "Berhasil Login",
	})
	async getAllLogs(@Query("q") searchQuery: string) {
		let data: LogEntity[];
		let message: string;

		if (searchQuery) {
			data = await this.logService.searchLogs(searchQuery);
			message = `Berhasil mencari Logs: ${searchQuery}`;
		} else {
			data = await this.logService.getAllLogs();
			message = "Berhasil mendapatkan data Logs";
		}

		return formatResponse(true, message, data, null);
	}

	@Get(":id")
	async getLogById(@Param("id") id: string) {
		const data = await this.logService.getLogById(id);
		return formatResponse(
			true,
			`Berhasil mendapatkan data Log: ${id}`,
			data,
			null,
		);
	}
}
