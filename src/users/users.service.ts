import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class UsersService {
	private prisma: PrismaService;

	constructor(prisma: PrismaService) {
		this.prisma = prisma;
	}

	async findOne(username: string) {
		return await this.prisma.user.findUnique({
			where: {
				username: username,
			},
		});
	}

	async getAllUsers() {
		return await this.prisma.user.findMany({
			select: {
				id: true,
				username: true,
				role: true,
			},
		});
	}
}
