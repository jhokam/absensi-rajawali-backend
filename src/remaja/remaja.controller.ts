import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	Post,
	Query,
} from "@nestjs/common";
import type { Remaja } from "@prisma/client";
import { RemajaService } from "./remaja.service";

@Controller("/remaja")
export class RemajaController {
	private readonly remajaService: RemajaService;

	constructor(remajaService: RemajaService) {
		this.remajaService = remajaService;
	}

	@Get()
	async getRemaja(@Query() query: { id: string }) {
		if (query.id) {
			return await this.remajaService.remaja({
				id: query.id,
			});
		}
		return await this.remajaService.getAllUsers();
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

	@Delete("/:id")
	async deleteRemaja(@Param("id") id: string) {
		return await this.remajaService.deleteUser({
			id: id,
		});
	}

	@Patch("/:id")
	async updateRemaja(@Param("id") id: string, @Body() data: Remaja) {
		return await this.remajaService.updateUser({
			where: {
				id: id,
			},
			data: data,
		});
	}
}
