import { Injectable, Logger } from "@nestjs/common";
import type { Prisma } from "@prisma/client";
import { hash } from "argon2";
import { PrismaService } from "src/prisma/prisma.service";
import type { PublicGenerus } from "../types";

@Injectable()
export class GenerusService {
	private readonly prisma: PrismaService;
	private readonly logger = new Logger(GenerusService.name);

	constructor(prisma: PrismaService) {
		this.prisma = prisma;
	}

	private async findGenerus(searchTerm: string): Promise<PublicGenerus[]> {
		try {
			return await this.prisma.generus.findMany({
				where: {
					id: Number.isNaN(Number(searchTerm)) ? undefined : Number(searchTerm),
				},
				select: this.getGenerusSelect(),
			});
		} catch (error) {
			this.logger.error(`Error finding Generus: ${error.message}`, error.stack);
			throw new Error("Failed to find Generus.");
		}
	}

	async getUserById(searchTerm: string): Promise<PublicGenerus | null> {
		this.logger.log(`getUserById searchTerm: ${searchTerm}`);
		const results = await this.findGenerus(searchTerm);
		return results.length > 0 ? results[0] : null;
	}

	async getAllUsers(): Promise<PublicGenerus[]> {
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
		const allUsers = await this.prisma.generus.findMany(); // Get all records

		// Filter IDs that contain the search term (convert both to strings)
		return allUsers.filter((user) => user.id.toString().includes(id));
	}

	async createUser(data: Prisma.GenerusCreateInput): Promise<PublicGenerus> {
		try {
			this.logger.log("createUser");
			const hashedPassword = await hash(data.password);
			return await this.prisma.generus.create({
				data: { ...data, password: hashedPassword },
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
	): Promise<PublicGenerus> {
		this.logger.log(`updateUser: ${JSON.stringify(where)}`);
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

	async deleteUser(
		where: Prisma.GenerusWhereUniqueInput,
	): Promise<PublicGenerus> {
		try {
			this.logger.log("deleteUser");
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
			alamat: true,
			jenis_kelamin: true,
			jenjang: true,
			role: true,
			sambung: true,
			username: true,
		};
	}
}
