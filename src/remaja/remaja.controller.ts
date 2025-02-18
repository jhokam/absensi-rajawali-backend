import {
	BadRequestException,
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
import { type Remaja, Role } from "@prisma/client";
import { AuthGuard } from "src/auth/auth.guard";
import type { RemajaDto } from "src/dto/remaja.dto";
import { Roles } from "src/roles/roles.decorator";
import { RolesGuard } from "src/roles/roles.guard";
import { RemajaService } from "./remaja.service";

@Controller("/remaja")
@UseGuards(AuthGuard, RolesGuard)
export class RemajaController {
	private readonly remajaService: RemajaService;

	constructor(remajaService: RemajaService) {
		this.remajaService = remajaService;
	}

	@Get()
	async getAllRemaja(): Promise<RemajaDto[]> {
		return await this.remajaService.getAllUsers();
	}

	@Get("/:id")
	async getRemajaById(@Param("id") id: string): Promise<RemajaDto> {
		const numericId = Number(id);

		if (Number.isNaN(numericId)) {
			throw new BadRequestException("Invalid ID provided.");
		}

		const remaja = await this.remajaService.remaja({
			id: numericId,
		});

		if (!remaja) {
			throw new NotFoundException(`Remaja with id ${numericId} not found`);
		}

		return remaja;
	}

	@Post()
	@Roles(Role.User)
	async createRemaja(@Body() data: Remaja) {
		return await this.remajaService.createUser(data);
	}

	@Delete("/:id")
	@Roles(Role.User)
	async deleteRemaja(@Param("id") id: string) {
		const numericId = Number(id);

		if (Number.isNaN(numericId)) {
			throw new BadRequestException("Invalid ID provided.");
		}
		return await this.remajaService.deleteUser({
			id: numericId,
		});
	}

	@Patch("/:id")
	@Roles(Role.User)
	async updateRemaja(@Param("id") id: string, @Body() data: Remaja) {
		const numericId = Number(id);

		if (Number.isNaN(numericId)) {
			throw new BadRequestException("Invalid ID provided.");
		}
		return await this.remajaService.updateUser({
			where: {
				id: numericId,
			},
			data: data,
		});
	}
}
