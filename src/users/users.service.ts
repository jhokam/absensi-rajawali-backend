import { Injectable } from "@nestjs/common";
import type { Generus } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class UsersService {
	private prisma: PrismaService;

	constructor(prisma: PrismaService) {
		this.prisma = prisma;
	}

	async findOne(username: string): Promise<Generus | null> {
		return await this.prisma.generus.findUnique({
			where: {
				id: Number.isNaN(Number(username)) ? undefined : Number(username),
				nama: username,
			},
		});
	}
}
