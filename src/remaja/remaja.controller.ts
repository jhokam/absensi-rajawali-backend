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
	UseGuards,
} from "@nestjs/common";
import { type Remaja, Role } from "@prisma/client";
import { AuthGuard } from "src/auth/auth.guard";
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
	@Roles(Role.Admin)
	async getAllRemaja() {
		const data = await this.remajaService.getAllUsers();
		return {
			data: data,
			message: "Successfully retrieved all Remaja data",
		};
	}

	@Get("/:id")
	async getRemajaById(@Param("id") id: string) {
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

		return {
			data: remaja,
			message: "Successfully retrieved 1 Remaja data",
		};
	}

	@Post()
	@Roles(Role.Admin)
	async createRemaja(@Body() data: Remaja) {
		const createData = await this.remajaService.createUser(data);
		return {
			data: createData,
			message: "Successfully created a new Remaja",
		};
	}

	@Delete("/:id")
	@Roles(Role.Admin)
	async deleteRemaja(@Param("id") id: string) {
		const numericId = Number(id);

		if (Number.isNaN(numericId)) {
			throw new BadRequestException("Invalid ID provided.");
		}
		const deleteData = await this.remajaService.deleteUser({
			id: numericId,
		});

		return {
			data: deleteData,
			message: "Successfully deleted a Remaja",
		};
	}

	@Patch("/:id")
	@Roles(Role.Admin)
	async updateRemaja(@Param("id") id: string, @Body() data: Remaja) {
		const numericId = Number(id);

		if (Number.isNaN(numericId)) {
			throw new BadRequestException("Invalid ID provided.");
		}
		const updateData = await this.remajaService.updateUser({
			where: { id: numericId },
			data: data,
		});
		return {
			data: updateData,
			message: "Successfully updated a Remaja",
		};
	}
}
