import { Injectable, Logger } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class KelompokService {
	private readonly prisma: PrismaService;
	private readonly logger = new Logger(KelompokService.name);

	constructor(prisma: PrismaService) {
		this.prisma = prisma;
	}

	async getAllKelompok() {
		this.logger.log("Get all Kelompok");
		return await this.prisma.kelompok.findMany();
	}

	async searchKelompok(searchQuery: string) {
		this.logger.log(`Search Kelompok: ${searchQuery}`);
		return await this.prisma.kelompok.findMany({
			where: {
				nama: {
					contains: searchQuery,
					mode: "insensitive",
				},
			},
		});
	}

	async getKelompokById(id: string) {
		this.logger.log(`Get Kelompok: ${id}`);
		return await this.prisma.kelompok.findUnique({
			where: {
				id,
			},
		});
	}
}
