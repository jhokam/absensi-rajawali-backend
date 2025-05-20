import { Injectable, Logger } from "@nestjs/common";
import { hash } from "argon2";
import type { Response } from "express";
import { PrismaService } from "src/prisma/prisma.service";
import { utils, write } from "xlsx";
import type { GenerusDto } from "./generus.dto";
import type { GenerusEntity } from "./generus.entity";

@Injectable()
export class GenerusService {
	private readonly prisma: PrismaService;
	private readonly logger = new Logger(GenerusService.name);

	constructor(prisma: PrismaService) {
		this.prisma = prisma;
	}

	async getAllGenerus() {
		this.logger.log("Get all Generus");
		return await this.prisma.generus.findMany();
	}

	async searchGenerus(searchQuery: string) {
		this.logger.log(`Search Generus: ${searchQuery}`);
		return await this.prisma.generus.findMany({
			where: { nama: { contains: searchQuery } },
		});
	}

	async exportGenerus(res: Response, data: GenerusEntity[]) {
		this.logger.log("Export all Generus");
		const workbook = utils.book_new();
		const worksheet = utils.json_to_sheet(data);
		utils.book_append_sheet(workbook, worksheet, "Generus Data");

		const excelBuffer = write(workbook, {
			type: "buffer",
			bookType: "xlsx",
		});

		res.set({
			"Content-Type":
				"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
			"Content-Disposition": 'attachment; filename="generus_data.xlsx"',
			"Content-Length": excelBuffer.length,
		});

		return await res.send(excelBuffer);
	}

	async getGenerusById(id: string) {
		this.logger.log(`Get Generus by id: ${id}`);
		return await this.prisma.generus.findUnique({
			where: { id },
		});
	}

	async createGenerus(data: GenerusDto) {
		this.logger.log(`Create Generus: ${data.nama}`);
		// const hashedPassword = await hash(data.password);
		// return await this.prisma.generus.create({
		// 	data: { ...data, password: hashedPassword },
		// });

		return await this.prisma.generus.create({
			data: data,
		});
	}

	async updateGenerus(id: string, data: GenerusDto) {
		this.logger.log(`Update Generus: ${id}`);
		return await this.prisma.generus.update({
			where: { id },
			data,
		});
	}

	async deleteGenerus(id: string) {
		this.logger.log(`Delete Generus: ${id}`);
		return await this.prisma.generus.delete({
			where: { id },
		});
	}
}
