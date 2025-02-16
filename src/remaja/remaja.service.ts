import { Injectable, Logger } from "@nestjs/common";
import { Prisma, Remaja } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class RemajaService {
	constructor(private readonly prisma: PrismaService) {}
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
		const createUser = await this.prisma.remaja.create({
			data,
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
}
