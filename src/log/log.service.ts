import { Injectable, Logger } from "@nestjs/common";
import { formatErrorResponse } from "../helper/response.helper";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class LogService {
	private readonly prisma: PrismaService;
	private readonly logger = new Logger(LogService.name);

	constructor(prisma: PrismaService) {
		this.prisma = prisma;
	}

	async getAllLogs() {
		this.logger.log("getAllLogs");
		try {
			return await this.prisma.log.findMany({
				select: {
					id: true,
					event: true,
					description: true,
					user_id: true,
				},
			});
		} catch (error) {
			this.logger.error(
				`Error getting all users: ${error.message}`,
				error.stack,
			);
			formatErrorResponse("Internal Server Error", error);
		}
	}
}
