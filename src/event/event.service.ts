import { Injectable, Logger } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import type { EventDto } from "./event.dto";

@Injectable()
export class EventService {
	private readonly prisma: PrismaService;
	private readonly logger = new Logger(EventService.name);

	constructor(prisma: PrismaService) {
		this.prisma = prisma;
	}

	async getAllEvents() {
		this.logger.log("Get all Events");
		return await this.prisma.event.findMany();
	}

	async filterEvents(title: string) {
		this.logger.log(`Filter Event: ${title}`);
		return await this.prisma.event.findMany({
			where: { title: { contains: title, mode: "insensitive" } },
		});
	}

	async getEventById(id: string) {
		this.logger.log(`Get Event by ID: ${id}`);
		return await this.prisma.event.findUnique({
			where: { id },
		});
	}

	async createEvent(data: EventDto) {
		this.logger.log(`Create Event: ${data.title}`);
		return await this.prisma.event.create({
			data,
		});
	}

	async updateEvent(id: string, data: EventDto) {
		this.logger.log(`Update Event: ${id}`);
		return await this.prisma.event.update({
			where: {
				id,
			},
			data,
		});
	}

	async deleteEvent(id: string) {
		this.logger.log(`Delete Event: ${id}`);
		return await this.prisma.event.delete({
			where: {
				id,
			},
		});
	}
}
