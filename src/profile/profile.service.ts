import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class ProfileService {
	private prisma: PrismaService;

	constructor(prisma: PrismaService) {
		this.prisma = prisma;
	}

	async getUserProfile(userId: number) {
		const user = await this.prisma.remaja.findUnique({
			where: { id: userId },
			select: {
				alamat: true,
				id: true,
				jenis_kelamin: true,
				jenjang: true,
				nama: true,
				role: true,
				sambung: true,
				username: true,
			},
		});

		if (!user) {
			throw new NotFoundException("User not found");
		}

		return user;
	}
}
