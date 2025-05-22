import { Injectable, Logger, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class ProfileService {
	private prisma: PrismaService;
	private logger = new Logger(ProfileService.name);

	constructor(prisma: PrismaService) {
		this.prisma = prisma;
	}

	async getUserProfile(userId: string) {
		const user = await this.prisma.generus.findUnique({
			where: { id: userId },
		});

		if (!user) {
			this.logger.error(`User not found: ${userId}`);
			throw new NotFoundException("User tidak ditemukan");
		}

		this.logger.log(`Get User by ID: ${userId}`);
		return user;
	}
}
