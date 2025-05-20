import { Injectable, Logger } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class DesaService {
	private readonly prisma: PrismaService;
	private readonly logger = new Logger(DesaService.name);

	constructor(prisma: PrismaService) {
		this.prisma = prisma;
	}

	async getAllUsers() {
		this.logger.log("Get all Desa");
		return await this.prisma.desa.findMany();
	}
}
