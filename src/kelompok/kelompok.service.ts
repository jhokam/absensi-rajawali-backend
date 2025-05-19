import { Injectable, Logger } from "@nestjs/common";
import { formatErrorResponse } from "../helper/response.helper";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class KelompokService {
	private readonly prisma: PrismaService;
	private readonly logger = new Logger(KelompokService.name);

	constructor(prisma: PrismaService) {
		this.prisma = prisma;
	}

	async getAllUsers() {
		this.logger.log("getAllUsers");
		try {
			return await this.prisma.kelompok.findMany({
				select: {
					id: true,
					nama: true,
					code: true,
					desa_id: true,
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
