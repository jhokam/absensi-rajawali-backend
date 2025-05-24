import { Injectable, Logger } from "@nestjs/common";
import type { Response } from "express";
import { PrismaService } from "src/prisma/prisma.service";
import { utils, write } from "xlsx";
import type { FilterGenerusDto } from "./dto/filter-generus.dto";
import type { GenerusDto } from "./dto/generus.dto";
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

	async filterGenerus({
		nama,
		jenis_kelamin,
		jenjang,
		pendidikan_terakhir,
		sambung,
		keterangan,
	}: FilterGenerusDto) {
		this.logger.log(
			`Get all Generus: ${nama}, ${jenis_kelamin}, ${jenjang}, ${pendidikan_terakhir}, ${sambung}, ${keterangan}`,
		);
		return await this.prisma.generus.findMany({
			where: {
				OR: [
					{ nama: { contains: nama, mode: "insensitive" } },
					{ jenis_kelamin: jenis_kelamin },
					{ jenjang: jenjang },
					{ pendidikan_terakhir: pendidikan_terakhir },
					{ sambung: sambung },
					{ keterangan: keterangan },
				],
			},
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
		this.logger.log(`Get Generus by ID: ${id}`);
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
