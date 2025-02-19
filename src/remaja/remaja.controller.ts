import {
	BadRequestException,
	Body,
	Controller,
	Delete,
	Get,
	InternalServerErrorException,
	NotFoundException,
	Param,
	Patch,
	Post,
	Query,
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
		schema: {
			type: "object",
			properties: {
				success: {
					type: "boolean",
					example: true,
				},
				message: {
					type: "string",
					example: "Successfully retrieved all Remaja data",
				},
				error: {
					type: "string",
					nullable: true,
					example: null,
				},
				data: {
					type: "array",
					items: {
						type: "object",
						properties: {
							id: {
								type: "integer",
								example: 1,
							},
							nama: {
								type: "string",
								example: "Jane Doe",
							},
							alamat: {
								type: "string",
								example: "Jl. Sendangsari Utara XV No. 27",
							},
							jenis_kelamin: {
								type: "string",
								example: "Laki_Laki",
							},
							jenjang: {
								type: "string",
								example: "Remaja",
							},
							role: {
								type: "string",
								example: "User",
							},
							sambung: {
								type: "string",
								example: "Aktif",
							},
							username: {
								type: "string",
								example: "abdul",
							},
						},
					},
				},
			},
		},
	})
	async getAllRemaja(@Query("id") id?: string): Promise<any> {
		try {
			let data: Partial<Remaja>[] | Partial<Remaja> | null;
			let message = "Successfully retrieved Remaja data";

			if (id) {
				// If an ID is provided, retrieve a single Remaja
				const numericId = Number(id);

				if (Number.isNaN(numericId)) {
					return formatErrorResponse(
						"Invalid ID provided.",
						new BadRequestException("Invalid ID provided."),
					);
				}

				const remaja = await this.remajaService.getUserById(numericId);

				if (!remaja) {
					return formatErrorResponse(
						`Remaja with ID ${numericId} not found.`,
						new NotFoundException(`Remaja with ID ${numericId} not found.`),
					);
				}

				data = remaja; // Assign single Remaja object
				message = `Successfully retrieved Remaja with ID ${numericId}`;
			} else {
				// If no ID is provided, retrieve all Remaja
				data = await this.remajaService.getAllUsers();
				message = "Successfully retrieved all Remaja data";
			}

			return formatResponse(data, message, true, null);
		} catch (error: any) {
			console.error("Error retrieving Remaja:", error);

			return formatErrorResponse("An unexpected error occurred.", error);
		}
	}

	@Get("/:id")
	@ApiResponse({
		status: 200,
		description: "Successfully retrieved 1 Remaja data",
		schema: {
			type: "object",
			properties: {
				success: {
					type: "boolean",
					example: true,
				},
				message: {
					type: "string",
					example: "Successfully retrieved 1 Remaja data",
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
						nama: {
							type: "string",
							example: "Jane Doe",
						},
						alamat: {
							type: "string",
							example: "Jl. Sendangsari Utara XV No. 27",
						},
						jenis_kelamin: {
							type: "string",
							example: "Laki_Laki",
						},
						jenjang: {
							type: "string",
							example: "Remaja",
						},
						role: {
							type: "string",
							example: "User",
						},
						sambung: {
							type: "string",
							example: "Aktif",
						},
						username: {
							type: "string",
							example: "abdul",
						},
					},
				},
			},
		},
	})
	@ApiResponse({
		status: 404,
		description: "Remaja with id ${id} not found",
	})
	async getRemajaById(@Param("id") id: string): Promise<any> {
		const numericId = Number(id);

		if (isNaN(numericId)) {
			return formatErrorResponse(
				"Invalid ID provided.",
				new BadRequestException("Invalid ID provided."),
			);
		}

		try {
			const remaja = await this.remajaService.getUserById(numericId);

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
			console.error("Error retrieving Remaja:", error);
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
		schema: {
			type: "object",
			properties: {
				success: {
					type: "boolean",
					example: true,
				},
				message: {
					type: "string",
					example: "Successfully created a new Remaja",
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
						nama: {
							type: "string",
							example: "Jane Doe",
						},
						alamat: {
							type: "string",
							example: "Jl. Sendangsari Utara XV No. 27",
						},
						jenis_kelamin: {
							type: "string",
							example: "Laki_Laki",
						},
						jenjang: {
							type: "string",
							example: "Remaja",
						},
						role: {
							type: "string",
							example: "User",
						},
						sambung: {
							type: "string",
							example: "Aktif",
						},
						username: {
							type: "string",
							example: "abdul",
						},
					},
				},
			},
		},
	})
	async createRemaja(@Body() data: Remaja): Promise<any> {
		try {
			const createdRemaja = await this.remajaService.createUser(data);
			return formatResponse(
				createdRemaja,
				"Successfully created a new Remaja",
				true,
				null,
			);
		} catch (error: any) {
			// Specific error handling for known cases
			if (error instanceof BadRequestException) {
				return formatErrorResponse(error.message, error);
			}

			// Log the error for debugging purposes
			console.error("Error creating Remaja:", error);

			// Generic error handling for unexpected errors
			return formatErrorResponse(
				"Failed to create Remaja. Please try again later.",
				new InternalServerErrorException("Failed to create Remaja."),
			);
		}
	}

	@Delete("/:id")
	@ApiResponse({
		status: 200,
		description: "Successfully deleted a Remaja",
		schema: {
			type: "object",
			properties: {
				success: {
					type: "boolean",
					example: true,
				},
				message: {
					type: "string",
					example: "Successfully deleted a Remaja",
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
						nama: {
							type: "string",
							example: "Jane Doe",
						},
						alamat: {
							type: "string",
							example: "Jl. Sendangsari Utara XV No. 27",
						},
						jenis_kelamin: {
							type: "string",
							example: "Laki_Laki",
						},
						jenjang: {
							type: "string",
							example: "Remaja",
						},
						role: {
							type: "string",
							example: "User",
						},
						sambung: {
							type: "string",
							example: "Aktif",
						},
						username: {
							type: "string",
							example: "abdul",
						},
					},
				},
			},
		},
	})
	async deleteRemaja(@Param("id") id: string): Promise<any> {
		try {
			const numericId = Number(id);

			if (Number.isNaN(numericId)) {
				return formatErrorResponse(
					"Invalid ID provided.",
					new BadRequestException("Invalid ID provided."),
				);
			}

			const deletedRemaja = await this.remajaService.deleteUser({
				id: numericId,
			});

			if (!deletedRemaja) {
				return formatErrorResponse(
					`Remaja with ID ${numericId} not found.`,
					new NotFoundException(`Remaja with ID ${numericId} not found.`),
				);
			}

			return formatResponse(
				deletedRemaja,
				"Successfully deleted a Remaja",
				true,
				null,
			);
		} catch (error: any) {
			// Specific error handling for known cases
			if (
				error instanceof NotFoundException ||
				error instanceof BadRequestException
			) {
				return formatErrorResponse(error.message, error);
			}

			// Log the error for debugging purposes
			console.error("Error deleting Remaja:", error);

			// Generic error handling for unexpected errors
			return formatErrorResponse(
				"Failed to delete Remaja. Please try again later.",
				new InternalServerErrorException("Failed to delete Remaja."),
			);
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
						nama: {
							type: "string",
							example: "Jane Doe",
						},
						alamat: {
							type: "string",
							example: "Jl. Sendangsari Utara XV No. 27",
						},
						jenis_kelamin: {
							type: "string",
							example: "Laki_Laki",
						},
						jenjang: {
							type: "string",
							example: "Remaja",
						},
						role: {
							type: "string",
							example: "User",
						},
						sambung: {
							type: "string",
							example: "Aktif",
						},
						username: {
							type: "string",
							example: "abdul",
						},
					},
				},
			},
		},
	})
	async updateRemaja(
		@Param("id") id: string,
		@Body() data: Remaja,
	): Promise<any> {
		try {
			const numericId = Number(id);

			if (Number.isNaN(numericId)) {
				return formatErrorResponse(
					"Invalid ID provided.",
					new BadRequestException("Invalid ID provided."),
				);
			}

			const updatedRemaja = await this.remajaService.updateUser({
				where: { id: numericId },
				data: data,
			});

			if (!updatedRemaja) {
				return formatErrorResponse(
					`Remaja with ID ${numericId} not found.`,
					new NotFoundException(`Remaja with ID ${numericId} not found.`),
				);
			}

			return formatResponse(
				updatedRemaja,
				"Successfully updated a Remaja",
				true,
				null,
			);
		} catch (error: any) {
			// Specific error handling for known cases
			if (
				error instanceof NotFoundException ||
				error instanceof BadRequestException
			) {
				return formatErrorResponse(error.message, error);
			}

			// Log the error for debugging purposes
			console.error("Error updating Remaja:", error);

			// Generic error handling for unexpected errors
			return formatErrorResponse(
				"Failed to update Remaja. Please try again later.",
				new InternalServerErrorException("Failed to update Remaja."),
			);
		}
	}
}
