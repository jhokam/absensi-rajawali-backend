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

	async filterKelompok(nama, desa_id) {
		this.logger.log(`Filter Kelompok: ${nama}`);
		return await this.prisma.kelompok.findMany({
			where: {
				OR: [
					{
						nama: {
							contains: nama,
							mode: "insensitive",
						},
					},
					{ desa_id: desa_id },
				],
			},
		});
	}

	async getKelompokById(id: string) {
		this.logger.log(`Get Kelompok by ID: ${id}`);
		return await this.prisma.kelompok.findUnique({
			where: {
				id,
			},
		});
	}
}
