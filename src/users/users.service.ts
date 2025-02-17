import { Injectable } from "@nestjs/common";
import type { Remaja } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class UsersService {
	private prisma: PrismaService;

	constructor(prisma: PrismaService) {
		this.prisma = prisma;
	}

	async findOne(username: string): Promise<Remaja | null> {
		return await this.prisma.remaja.findUnique({
			where: {
				username: username,
			},
		});
	}
}
