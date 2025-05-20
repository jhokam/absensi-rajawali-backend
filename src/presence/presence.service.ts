import { Injectable, Logger } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class PresenceService {
	private readonly prisma: PrismaService;
	private readonly logger = new Logger(PresenceService.name);

	constructor(prisma: PrismaService) {
		this.prisma = prisma;
	}

	async getAllPresences() {
		this.logger.log("Get all Presence");
		return await this.prisma.presention.findMany();
	}

	// async getPresence
}
