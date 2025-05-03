import { Injectable } from "@nestjs/common";
import type { User } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";
import { PublicUserDto } from "../dto/user.dto";

@Injectable()
export class UsersService {
	private prisma: PrismaService;

	constructor(prisma: PrismaService) {
		this.prisma = prisma;
	}

	async findOne(username: string): Promise<User | null> {
		return await this.prisma.user.findUnique({
			where: {
				username: username,
			},
		});
	}

	async getAllUsers(): Promise<PublicUserDto[]> {
		return await this.prisma.user.findMany({
			select: {
				id: true,
				username: true,
				role: true,
				generus_id: true,
			},
		});
	}
}
