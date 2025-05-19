import { Controller, Get, InternalServerErrorException } from "@nestjs/common";
import { formatErrorResponse, formatResponse } from "../helper/response.helper";
import { EventService } from "./event.service";

@Controller("event")
export class EventController {
	private readonly eventService: EventService;

	constructor(eventService: EventService) {
		this.eventService = eventService;
	}

	@Get()
	async getAllLogs() {
		const data = await this.eventService.getAllLogs();
		return formatResponse(
			true,
			"Berhasil mendapatkan semua Event data",
			data,
			null,
		);
	}
}
