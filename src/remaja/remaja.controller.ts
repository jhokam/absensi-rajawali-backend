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
import { ApiBody, ApiResponse, ApiTags } from "@nestjs/swagger";
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
	@ApiResponse({
		status: 200,
		description: "Successfully retrieved all Remaja data",
	})
	async getAllRemaja() {
		const data = await this.remajaService.getAllUsers();
		return {
			data: data,
			message: "Successfully retrieved all Remaja data",
		};
	}

	@Get("/:id")
	@ApiResponse({
		status: 200,
		description: "Successfully retrieved 1 Remaja data",
	})
	@ApiResponse({
		status: 404,
		description: "Remaja with id ${id} not found",
	})
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
	@ApiBody({
		schema: {
			type: "object",
			properties: {
				nama: {
					type: "string",
					example: "John Doe",
				},
				username: {
					type: "string",
					example: "johndoe",
				},
				jenis_kelamin: {
					type: "string",
					example: "Laki-Laki",
				},
				jenjang: {
					type: "string",
					example: "Remaja",
				},
				alamat: {
					type: "string",
					example: "Jl. Kenangan No. 1",
				},
				sambung: {
					type: "string",
					example: "Aktif",
				},
				role: {
					type: "string",
					example: "User",
				},
				password: {
					type: "string",
					example: "password",
				},
			},
		},
	})
	@ApiResponse({
		status: 200,
		description: "Successfully created a new Remaja",
	})
	// @Roles(Role.Admin)
	async createRemaja(@Body() data: Remaja) {
		const createData = await this.remajaService.createUser(data);
		return {
			data: createData,
			message: "Successfully created a new Remaja",
		};
	}

	@Delete("/:id")
	@ApiResponse({
		status: 200,
		description: "Successfully deleted a Remaja",
	})
	// @Roles(Role.Admin)
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
	@ApiBody({
		schema: {
			type: "object",
			properties: {
				nama: {
					type: "string",
					example: "Jane Doe",
				},
				username: {
					type: "string",
					example: "janedoe",
				},
				jenis_kelamin: {
					type: "string",
					example: "Perempuan",
				},
				jenjang: {
					type: "string",
					example: "Pra_Nikah",
				},
				alamat: {
					type: "string",
					example: "Jl. in aja dulu No. 1",
				},
				sambung: {
					type: "string",
					example: "Tidak_Aktif",
				},
				role: {
					type: "string",
					example: "Admin",
				},
				password: {
					type: "string",
					example: "password",
				},
			},
		},
	})
	@ApiResponse({
		status: 200,
		description: "Successfully updated a Remaja",
		schema: {
			type: "object",
			properties: {
				success: {
					type: "boolean",
					example: true,
				},
				message: {
					type: "string",
					example: "Successfully updated a Remaja",
				},
				error: {
					type: "string",
					nullable: true,
					example: null,
				},
				data: {
					type: "object",
					properties: {
						id: {
							type: "integer",
							example: 1,
						},
					},
				},
			},
		},
	})
	// @Roles(Role.Admin)
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
