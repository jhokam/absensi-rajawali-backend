import { Injectable, Logger } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class PresentionService {
	private readonly prisma: PrismaService;
	private readonly logger = new Logger(PresentionService.name);

	constructor(prisma: PrismaService) {
		this.prisma = prisma;
	}

	async getAllLogs() {
		this.logger.log("getAllLogs");
		try {
			return await this.prisma.presention.findMany({
				select: {
					id: true,
					event_id: true,
					generus_id: true,
					status: true,
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
