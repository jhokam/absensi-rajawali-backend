import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import type { Remaja } from "@prisma/client";
import { RemajaService } from "./remaja.service";

@Controller("/remaja")
export class RemajaController {
	private readonly remajaService: RemajaService;

	constructor(remajaService: RemajaService) {
		this.remajaService = remajaService;
	}

	@Get()
	async getRemaja() {
		const users = await this.remajaService.getAllUsers();
		return { users };
	}

	@Get("/:id")
	async getRemajaById(@Param("id") id: string) {
		return await this.remajaService.remaja({
			id: id,
		});
	}

	@Post()
	async createRemaja(@Body() data: Remaja) {
		return await this.remajaService.createUser(data);
	}
}
