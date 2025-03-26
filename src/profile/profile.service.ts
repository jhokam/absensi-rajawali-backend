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
			select: {
				alamat_tempat_tinggal: true,
				id: true,
				jenis_kelamin: true,
				jenjang: true,
				nama: true,
				sambung: true,
			},
		});

		if (!user) {
			throw new NotFoundException("User not found");
		}

		return user;
	}
}
