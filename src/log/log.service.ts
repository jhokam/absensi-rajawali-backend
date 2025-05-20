import { Injectable, Logger } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class LogService {
	private readonly prisma: PrismaService;
	private readonly logger = new Logger(LogService.name);

	constructor(prisma: PrismaService) {
		this.prisma = prisma;
	}

	async getAllLogs() {
		this.logger.log("Get all Logs");
		return await this.prisma.log.findMany();
	}

	async searchLogs(searchQuery: string) {
		this.logger.log(`Search Logs: ${searchQuery}`);
		return await this.prisma.log.findMany({
			where: {
				event: {
					contains: searchQuery,
				},
			},
		});
	}

	async getLogById(id: string) {
		this.logger.log(`Get Log by ID: ${id}`);
		return await this.prisma.log.findUnique({
			where: {
				id: id,
			},
		});
	}
}
