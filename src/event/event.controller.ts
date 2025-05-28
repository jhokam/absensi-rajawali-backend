import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	Post,
	Query,
} from "@nestjs/common";
import { ApiCreatedResponse, ApiOkResponse, ApiQuery } from "@nestjs/swagger";
import { formatResponse } from "../helper/response.helper";
import { EventDto } from "./event.dto";
import { EventEntity } from "./event.entity";
import { EventService } from "./event.service";

@Controller("event")
export class EventController {
	private readonly eventService: EventService;

	constructor(eventService: EventService) {
		this.eventService = eventService;
	}

	@Get()
	@ApiOkResponse({
		type: EventEntity,
		isArray: true,
	})
	@ApiQuery({
		name: "q",
		required: false,
		type: String,
		description: "Search Events by Title",
		example: "Pengajian muda-mudi April 2025",
	})
	async getAllEvents(@Query("q") title: string) {
		let data: EventEntity[];
		let message: string;

		if (title) {
			data = await this.eventService.filterEvents(title);
			message = `Berhasil mencari Event: ${title}`;
		} else {
			data = await this.eventService.getAllEvents();
			message = "Berhasil mendapatkan data Event";
		}
		return formatResponse(true, message, data, null);
	}

	@Get(":id")
	@ApiOkResponse({
		type: EventEntity,
	})
	async getEventById(@Param("id") id: string) {
		const data = await this.eventService.getEventById(id);
		return formatResponse(
			true,
			`Berhasil mendapatkan data Event: ${id}`,
			data,
			null,
		);
	}

	@Post()
	@ApiCreatedResponse({
		type: EventEntity,
	})
	async createEvent(@Body() input: EventDto) {
		const data = await this.eventService.createEvent(input);
		return formatResponse(
			true,
			`Berhasil menambahkan data Event: ${input.title}`,
			data,
			null,
		);
	}

	@Patch(":id")
	@ApiOkResponse({
		type: EventEntity,
	})
	async updateEvent(@Param("id") id: string, @Body() input: EventDto) {
		const data = await this.eventService.updateEvent(id, input);
		return formatResponse(
			true,
			`Berhasil mengubah Event data: ${input.title}`,
			data,
			null,
		);
	}

	@Delete(":id")
	@ApiOkResponse({
		type: EventEntity,
	})
	async deleteEvent(@Param("id") id: string) {
		const data = await this.eventService.deleteEvent(id);
		return formatResponse(true, "Berhasil menghapus data Event", data, null);
	}
}
