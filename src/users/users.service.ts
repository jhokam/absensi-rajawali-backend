import { Injectable } from "@nestjs/common";
import type { User } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class UsersService {
	private prisma: PrismaService;

	constructor(prisma: PrismaService) {
		this.prisma = prisma;
	}

	async findOne(username: string): Promise<User | null> {
		return await this.prisma.user.findUnique({
			where: {
				id: Number.isNaN(Number(username)) ? undefined : Number(username),
				username: username,
			},
		});
	}

	async getAllUsers(): Promise<User[]> {
		return await this.prisma.user.findMany();
	}
}
