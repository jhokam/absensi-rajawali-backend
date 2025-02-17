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

	async remaja(
		remajaWhereUniqueInput: Prisma.RemajaWhereUniqueInput,
	): Promise<Remaja | null> {
		this.logger.log("userById");
		const remaja = await this.prisma.remaja.findUnique({
			where: remajaWhereUniqueInput,
		});
		return remaja;
	}

	async getAllUsers() {
		this.logger.log("getAllUsers");
		const users = await this.prisma.remaja.findMany();
		return users;
	}

	async createUser(data: Prisma.RemajaCreateInput): Promise<Remaja> {
		this.logger.log("createUser");
		const hashedPassword = await hash(data.password);
		const createUser = await this.prisma.remaja.create({
			data: {
				...data,
				password: hashedPassword,
			},
		});
		return createUser;
	}

	async updateUser(params: {
		where: Prisma.RemajaWhereUniqueInput;
		data: Prisma.RemajaUpdateInput;
	}): Promise<Remaja> {
		this.logger.log("updateUser");
		const updateUser = await this.prisma.remaja.update({
			where: params.where,
			data: params.data,
		});
		return updateUser;
	}

	async deleteUser(where: Prisma.RemajaWhereUniqueInput): Promise<Remaja> {
		this.logger.log("deleteUser");
		const deleteUser = await this.prisma.remaja.delete({
			where,
		});
		return deleteUser;
	}

	async findById(id: number): Promise<Remaja | null> {
		this.logger.log("findByID");
		const searchRemaja = await this.prisma.remaja.findUnique({
			where: {
				id: id,
			},
		});
		return searchRemaja;
	}
}
