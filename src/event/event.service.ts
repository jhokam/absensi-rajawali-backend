import { Injectable, Logger } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class EventService {
	private readonly prisma: PrismaService;
	private readonly logger = new Logger(EventService.name);

	constructor(prisma: PrismaService) {
		this.prisma = prisma;
	}

	async getAllLogs() {
		this.logger.log("getAllLogs");
		try {
			return await this.prisma.event.findMany({
				select: {
					id: true,
					description: true,
					start_date: true,
					end_date: true,
					location: true,
					title: true,
				},
			});
		} catch (error) {
			this.logger.error(
				`Error getting all users: ${error.message}`,
				error.stack,
			);
			throw new Error("Failed to retrieve users.");
		}
	}
}
