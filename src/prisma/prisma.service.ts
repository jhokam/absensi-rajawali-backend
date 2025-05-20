import { Injectable, type OnModuleInit } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
	constructor() {
		super({
			omit: {
				desa: {
					created_at: true,
				},
				kelompok: {
					created_at: true,
				},
				generus: {
					created_at: true,
					updated_at: true,
				},
				user: {
					created_at: true,
					updated_at: true,
					password: true,
				},
				event: {
					created_at: true,
					updated_at: true,
				},
				presention: {
					created_at: true,
				},
				log: {
					created_at: true,
				},
			},
		});
	}

	async onModuleInit() {
		await this.$connect();
	}
}
