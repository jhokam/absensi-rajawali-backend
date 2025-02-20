import { Injectable, Logger } from "@nestjs/common";
import type { Prisma } from "@prisma/client";
import { hash } from "argon2";
import { PrismaService } from "src/prisma/prisma.service";
import type { PublicRemaja } from "../types/remaja";

@Injectable()
export class RemajaService {
	private readonly prisma: PrismaService;
	private readonly logger = new Logger(RemajaService.name);

	constructor(prisma: PrismaService) {
		this.prisma = prisma;
	}

	private async findRemaja(searchTerm: string): Promise<PublicRemaja[]> {
		try {
			return await this.prisma.remaja.findMany({
				where: {
					id: Number.isNaN(Number(searchTerm)) ? undefined : Number(searchTerm),
				},
				select: this.getRemajaSelect(),
			});
		} catch (error) {
			this.logger.error(`Error finding Remaja: ${error.message}`, error.stack);
			throw new Error("Failed to find Remaja.");
		}
	}

	async getUserById(searchTerm: string): Promise<PublicRemaja | null> {
		this.logger.log(`getUserById searchTerm: ${searchTerm}`);
		const results = await this.findRemaja(searchTerm);
		return results.length > 0 ? results[0] : null;
	}

	async getAllUsers(): Promise<PublicRemaja[]> {
		this.logger.log("getAllUsers");
		try {
			return await this.prisma.remaja.findMany({
				select: this.getRemajaSelect(),
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
		const allUsers = await this.prisma.remaja.findMany(); // Get all records

		// Filter IDs that contain the search term (convert both to strings)
		return allUsers.filter((user) => user.id.toString().includes(id));
	}

	async createUser(data: Prisma.RemajaCreateInput): Promise<PublicRemaja> {
		try {
			this.logger.log("createUser");
			const hashedPassword = await hash(data.password);
			return await this.prisma.remaja.create({
				data: { ...data, password: hashedPassword },
				select: this.getRemajaSelect(),
			});
		} catch (error) {
			this.logger.error(`Error creating user: ${error.message}`, error.stack);
			throw new Error("Failed to create user.");
		}
	}

	async updateUser(
		where: Prisma.RemajaWhereUniqueInput,
		data: Prisma.RemajaUpdateInput,
	): Promise<PublicRemaja> {
		this.logger.log(`updateUser: ${JSON.stringify(where)}`);
		try {
			return await this.prisma.remaja.update({
				where,
				data,
				select: this.getRemajaSelect(),
			});
		} catch (error) {
			this.logger.error(`Error updating user: ${error.message}`, error.stack);
			throw new Error("Failed to update user.");
		}
	}

	async deleteUser(
		where: Prisma.RemajaWhereUniqueInput,
	): Promise<PublicRemaja> {
		try {
			this.logger.log("deleteUser");
			return await this.prisma.remaja.delete({
				where,
				select: this.getRemajaSelect(),
			});
		} catch (error) {
			this.logger.error(`Error deleting user: ${error.message}`, error.stack);
			throw new Error("Failed to delete user.");
		}
	}

	private getRemajaSelect(): Prisma.RemajaSelect {
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
