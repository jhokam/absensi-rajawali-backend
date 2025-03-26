import { Injectable, Logger } from "@nestjs/common";
import type { PublicDesaDto } from "src/dto/desa.dto";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class DesaService {
	private readonly prisma: PrismaService;
	private readonly logger = new Logger(DesaService.name);

	constructor(prisma: PrismaService) {
		this.prisma = prisma;
	}

	async getAllUsers(): Promise<PublicDesaDto[]> {
		this.logger.log("getAllUsers");
		try {
			return await this.prisma.desa.findMany({
				select: {
					id: true,
					nama: true,
				},
			});
		} catch (error) {
			this.logger.error(error);
			throw new Error(error);
		}
	}
}
