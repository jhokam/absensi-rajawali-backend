import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class ProfileService {
	private prisma: PrismaService;

	constructor(prisma: PrismaService) {
		this.prisma = prisma;
	}

	async getUserProfile(userId: string) {
		const user = await this.prisma.generus.findUnique({
			where: { id: userId },
		});

		if (!user) {
			throw new NotFoundException("User not found");
		}

		return user;
	}
}
