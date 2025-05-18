import { Injectable, Logger } from "@nestjs/common";
import type { Prisma } from "@prisma/client";
import { hash } from "argon2";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class GenerusService {
	private readonly prisma: PrismaService;
	private readonly logger = new Logger(GenerusService.name);

	constructor(prisma: PrismaService) {
		this.prisma = prisma;
	}

	private async findGenerus(searchTerm: string) {
		try {
			return await this.prisma.generus.findMany({
				where: { id: searchTerm },
				select: this.getGenerusSelect(),
			});
		} catch (error) {
			this.logger.error(`Error finding Generus: ${error.message}`, error.stack);
			throw new Error("Failed to find Generus.");
		}
	}

	async getUserById(searchTerm: string) {
		this.logger.log(`getUserById searchTerm: ${searchTerm}`);
		const results = await this.findGenerus(searchTerm);
		return results.length > 0 ? results[0] : null;
	}

	async getAllUsers() {
		this.logger.log("getAllUsers");
		try {
			return await this.prisma.generus.findMany({
				select: this.getGenerusSelect(),
			});
		} catch (error) {
			this.logger.error(
				`Error getting all users: ${error.message}`,
				error.stack,
			);
			throw new Error("Failed to retrieve users.");
		}
	}

	async getUsersByPartialId(id: string) {
		this.logger.log(`Get user by id: ${id}`);
		const allUsers = await this.prisma.generus.findMany();
		return allUsers.filter((user) => user.id.toString().includes(id));
	}

	async createUser(data: Prisma.GenerusCreateInput) {
		try {
			this.logger.log(`createUser ${data.id}`);
			// const hashedPassword = await hash(data.password);
			// return await this.prisma.generus.create({
			// 	data: { ...data, password: hashedPassword },
			// 	select: this.getGenerusSelect(),
			// });

			return await this.prisma.generus.create({
				data: data,
				select: this.getGenerusSelect(),
			});
		} catch (error) {
			this.logger.error(`Error creating user: ${error.message}`, error.stack);
			throw new Error("Failed to create user.");
		}
	}

	async updateUser(
		where: Prisma.GenerusWhereUniqueInput,
		data: Prisma.GenerusUpdateInput,
	) {
		this.logger.log(`updateUser: ${where.id}`);
		try {
			return await this.prisma.generus.update({
				where,
				data,
				select: this.getGenerusSelect(),
			});
		} catch (error) {
			this.logger.error(`Error updating user: ${error.message}`, error.stack);
			throw new Error("Failed to update user.");
		}
	}

	async deleteUser(where: Prisma.GenerusWhereUniqueInput) {
		try {
			this.logger.log(`deleteUser: ${where.id}`);
			return await this.prisma.generus.delete({
				where,
				select: this.getGenerusSelect(),
			});
		} catch (error) {
			this.logger.error(`Error deleting user: ${error.message}`, error.stack);
			throw new Error("Failed to delete user.");
		}
	}

	private getGenerusSelect(): Prisma.GenerusSelect {
		return {
			id: true,
			nama: true,
			alamat_asal: true,
			jenis_kelamin: true,
			jenjang: true,
			sambung: true,
			alamat_tempat_tinggal: true,
			keterangan: true,
			nama_orang_tua: true,
			nomer_whatsapp: true,
			nomer_whatsapp_orang_tua: true,
			pendidikan_terakhir: true,
			tanggal_lahir: true,
			tempat_lahir: true,
			kelompok_id: true,
		};
	}
}
