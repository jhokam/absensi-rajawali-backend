import { Injectable, type OnModuleInit } from "@nestjs/common";
import { PrismaClient } from "../generated/client";

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
				presence: {
					created_at: true,
				},
				log: {
					created_at: true,
				},
			},
			datasourceUrl: process.env.DATABASE_URL,
		});
	}

	async onModuleInit() {
		await this.$connect();
	}
}
