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
import { ApiBody, ApiResponse } from "@nestjs/swagger";
import type { Remaja } from "@prisma/client";
import { AuthGuard } from "src/auth/auth.guard";
import {
	formatErrorResponse,
	formatResponse,
} from "src/helper/response.helper";
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
		try {
			const data = await this.remajaService.getAllUsers();
			return formatResponse(
				data,
				"Successfully retrieved all Remaja data",
				true,
				null,
			);
		} catch (error) {
			return formatErrorResponse("An unexpected error occurred.", error);
		}
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
			return formatErrorResponse(
				"Invalid ID provided.",
				new BadRequestException("Invalid ID provided."),
			);
		}

		try {
			const remaja = await this.remajaService.remaja({
				id: numericId,
			});

			if (!remaja) {
				return formatErrorResponse(
					`Remaja with ID ${numericId} not found.`,
					new NotFoundException(`Remaja with ID ${numericId} not found.`),
				);
			}

			return formatResponse(
				remaja,
				"Successfully retrieved 1 Remaja data",
				true,
				null,
			);
		} catch (error: any) {
			return formatErrorResponse("An unexpected error occurred.", error);
		}
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
	async createRemaja(@Body() data: Remaja) {
		try {
			const createData = await this.remajaService.createUser(data);
			return formatResponse(
				createData,
				"Successfully created a new Remaja",
				true,
				null,
			);
		} catch (error: any) {
			return formatErrorResponse(error.message, error);
		}
	}

	@Delete("/:id")
	@ApiResponse({
		status: 200,
		description: "Successfully deleted a Remaja",
	})
	async deleteRemaja(@Param("id") id: string) {
		try {
			const numericId = Number(id);

			if (Number.isNaN(numericId)) {
				throw new BadRequestException("Invalid ID provided.");
			}
			const deleteData = await this.remajaService.deleteUser({
				id: numericId,
			});

			return formatResponse(
				deleteData,
				"Successfully deleted a Remaja",
				true,
				null,
			);
		} catch (error) {
			return formatErrorResponse("An unexpected error occurred.", error);
		}
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
	async updateRemaja(@Param("id") id: string, @Body() data: Remaja) {
		try {
			const numericId = Number(id);

			if (Number.isNaN(numericId)) {
				throw new BadRequestException("Invalid ID provided.");
			}
			const updateData = await this.remajaService.updateUser({
				where: { id: numericId },
				data: data,
			});
			return formatResponse(
				updateData,
				"Successfully updated a Remaja",
				true,
				null,
			);
		} catch (error) {
			return formatErrorResponse("An unexpected error occurred.", error);
		}
	}
}
