import { Injectable, Logger } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class UsersService {
	private prisma: PrismaService;
	private logger = new Logger(UsersService.name);

	constructor(prisma: PrismaService) {
		this.prisma = prisma;
	}

	async findOne(username: string) {
		this.logger.log(`Find user: ${username}`);
		return await this.prisma.user.findUnique({
			where: {
				username: username,
			},
			omit: {
				password: false,
			},
		});
	}

	async getAllUsers() {
		return await this.prisma.user.findMany();
	}
}
