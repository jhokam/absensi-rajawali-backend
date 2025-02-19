import { Injectable, Logger } from "@nestjs/common";
import type { Prisma, Remaja } from "@prisma/client";
import { hash } from "argon2";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class RemajaService {
	private readonly prisma: PrismaService;

	constructor(prisma: PrismaService) {
		this.prisma = prisma;
	}
	private logger = new Logger("RemajaService");

	private async findRemaja(
		where: Prisma.RemajaWhereUniqueInput,
	): Promise<Partial<Remaja> | null> {
		try {
			return await this.prisma.remaja.findUnique({
				where,
				select: this.getRemajaSelect(),
			});
		} catch (error) {
			this.logger.error(`Error finding Remaja: ${error.message}`, error.stack);
			throw new Error("Failed to find Remaja.");
		}
	}

	async getUserById(id: number): Promise<Partial<Remaja> | null> {
		this.logger.log(`getUserById: ${id}`);
		return await this.findRemaja({ id });
	}

	async remaja(
		remajaWhereUniqueInput: Prisma.RemajaWhereUniqueInput,
	): Promise<Partial<Remaja> | null> {
		this.logger.log(`remaja: ${JSON.stringify(remajaWhereUniqueInput)}`);
		return await this.findRemaja(remajaWhereUniqueInput);
	}

	async getAllUsers(): Promise<Partial<Remaja>[]> {
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

	// Post
	async createUser(data: Prisma.RemajaCreateInput): Promise<Partial<Remaja>> {
		this.logger.log("createUser");
		const hashedPassword = await hash(data.password);
		const createUser = await this.prisma.remaja.create({
			data: {
				...data,
				password: hashedPassword,
			},
			select: this.getRemajaSelect(),
		});
		return createUser;
	}

	// Patch
	async updateUser(params: {
		where: Prisma.RemajaWhereUniqueInput;
		data: Prisma.RemajaUpdateInput;
	}): Promise<Partial<Remaja>> {
		this.logger.log(`updateUser: ${JSON.stringify(params.where)}`);
		try {
			return await this.prisma.remaja.update({
				where: params.where,
				data: params.data,
				select: this.getRemajaSelect(),
			});
		} catch (error) {
			this.logger.error(`Error updating user: ${error.message}`, error.stack);
			throw new Error("Failed to update user.");
		}
	}

	// Delete
	async deleteUser(
		where: Prisma.RemajaWhereUniqueInput,
	): Promise<Partial<Remaja>> {
		this.logger.log("deleteUser");
		const deleteUser = await this.prisma.remaja.delete({
			where,
			select: this.getRemajaSelect(),
		});
		return deleteUser;
	}

	async findById(id: number): Promise<Partial<Remaja> | null> {
		this.logger.log(`findByID: ${id}`);
		return await this.findRemaja({ id });
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
