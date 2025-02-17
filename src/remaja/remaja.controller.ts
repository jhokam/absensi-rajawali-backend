import {
	Body,
	Controller,
	Delete,
	Get,
	NotFoundException,
	Param,
	Patch,
	Post,
	Query,
	UseGuards,
} from "@nestjs/common";
import type { Remaja } from "@prisma/client";
import * as argon2 from "argon2";
import { AuthGuard } from "src/auth/auth.guard";
import { RemajaService } from "./remaja.service";

@UseGuards(AuthGuard)
@Controller("/remaja")
export class RemajaController {
	private readonly remajaService: RemajaService;

	constructor(remajaService: RemajaService) {
		this.remajaService = remajaService;
	}

	@Get()
	async getRemaja(@Query() query: { id: number }) {
		if (query.id) {
			const allRemaja = await this.remajaService.getAllUsers();
			const remaja = allRemaja.find((remaja) => remaja.id);

			if (!remaja) {
				throw new NotFoundException(
					`Remaja with id containing ${query.id} not found`,
				);
			}

			return remaja;
		}
		return await this.remajaService.getAllUsers();
	}

	@Get("/:id")
	async getRemajaById(@Param("id") id: number) {
		return await this.remajaService.remaja({
			id: id,
		});
	}

	@Post()
	async createRemaja(@Body() data: Remaja) {
		return await this.remajaService.createUser(data);
	}

	@Delete("/:id")
	async deleteRemaja(@Param("id") id: number) {
		return await this.remajaService.deleteUser({
			id: id,
		});
	}

	@Patch("/:id")
	async updateRemaja(@Param("id") id: number, @Body() data: Remaja) {
		return await this.remajaService.updateUser({
			where: {
				id: id,
			},
			data: data,
		});
	}
}
