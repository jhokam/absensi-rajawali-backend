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
import { Prisma, Remaja } from "@prisma/client";
import { AuthGuard } from "src/auth/auth.guard";
import {
	formatErrorResponse,
	formatResponse,
} from "src/helper/response.helper";
import { RolesGuard } from "src/roles/roles.guard";
import type { PublicRemaja, RemajaResponseArray } from "../types/remaja";
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
			let data;

			if (id) {
				if (!/^\d+$/.test(id)) {
					throw new BadRequestException("Invalid ID format. Must be a number.");
				}
				// Fetch users where ID contains the provided number (e.g., searching "5" returns 5, 15, 25)
				data = await this.remajaService.getUsersByPartialId(id);
			} else {
				// Fetch all users if no ID is provided
				data = await this.remajaService.getAllUsers();
			}

			return formatResponse(
				data,
				"Successfully retrieved Remaja data",
				true,
				null,
			);
		} catch (error) {
			console.error("Error retrieving Remaja:", error);
			return formatErrorResponse(
				"Failed to retrieve Remaja. Please try again later.",
				new InternalServerErrorException("Failed to retrieve Remaja."),
			);
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
						username: {
							type: "string",
							example: "abdul",
						},
						jenis_kelamin: {
							type: "string",
							example: "Laki_Laki",
						},
						alamat: {
							type: "string",
							example: "Jl. Sendangsari Utara XV No. 27",
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
					},
				},
				error: {
					type: "string",
					nullable: true,
					example: null,
				},
			},
		},
	})
	@ApiResponse({
		status: 404,
		schema: {
			type: "object",
			properties: {
				success: {
					type: "boolean",
					example: false,
				},
				message: {
					type: "string",
					example: "Remaja with ID 3 not found.",
				},
				data: {
					type: "string",
					nullable: true,
					example: null,
				},
				error: {
					type: "object",
					properties: {
						response: {
							type: "object",
							properties: {
								message: {
									type: "string",
									example: "Remaja with ID 3 not found.",
								},
								error: {
									type: "string",
									example: "Not Found",
								},
								statusCode: {
									type: "integer",
									example: 404,
								},
							},
						},
						status: {
							type: "integer",
							example: 404,
						},
						options: {
							type: "object",
							properties: {},
						},
						message: {
							type: "string",
							example: "Remaja with ID 3 not found.",
						},
						name: {
							type: "string",
							example: "NotFoundException",
						},
					},
				},
			},
		},
	})
	async getRemajaById(@Param("id") id: string): Promise<any> {
		const numericId = Number(id);
		if (Number.isNaN(numericId)) {
			throw new BadRequestException("Invalid ID provided.");
		}

		try {
			const remaja = await this.remajaService.getUserById(id);
			if (!remaja) {
				throw new NotFoundException(`Remaja with ID ${numericId} not found.`);
			}
			return formatResponse(
				remaja,
				"Successfully retrieved 1 Remaja data",
				true,
				null,
			);
		} catch (error) {
			console.error("Error retrieving Remaja:", error);
			throw error;
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
		status: 201,
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
	@ApiResponse({
		status: 500,
		description: "Failed to create a new Remaja",
		schema: {
			type: "object",
			properties: {
				success: {
					type: "boolean",
					example: false,
				},
				message: {
					type: "string",
					example: "Failed to create user.",
				},
				data: {
					type: "string",
					nullable: true,
					example: null,
				},
				error: {
					type: "object",
					example: {},
				},
			},
		},
	})
	async createRemaja(@Body() data: Prisma.RemajaCreateInput): Promise<any> {
		try {
			const createdRemaja = await this.remajaService.createUser(data);
			return formatResponse(
				createdRemaja,
				"Successfully created a new Remaja",
				true,
				null,
			);
		} catch (error) {
			console.error("Error creating Remaja:", error);
			if (error instanceof BadRequestException) {
				return formatErrorResponse(error.message, error);
			}
			throw error;
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
		const numericId = Number(id);
		if (Number.isNaN(numericId)) {
			return formatErrorResponse(
				"Invalid ID provided.",
				new BadRequestException("Invalid ID provided."),
			);
		}

		try {
			const deletedRemaja = await this.remajaService.deleteUser({
				id: numericId,
			});
			if (!deletedRemaja) {
				throw new NotFoundException(`Remaja with ID ${numericId} not found.`);
			}
			return formatResponse(
				deletedRemaja,
				"Successfully deleted a Remaja",
				true,
				null,
			);
		} catch (error) {
			console.error("Error deleting Remaja:", error);
			if (
				error instanceof NotFoundException ||
				error instanceof BadRequestException
			) {
				return formatErrorResponse(error.message, error);
			}
			throw error;
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
		@Body() data: Prisma.RemajaUpdateInput,
	): Promise<any> {
		const numericId = Number(id);
		if (Number.isNaN(numericId)) {
			return formatErrorResponse(
				"Invalid ID provided.",
				new BadRequestException("Invalid ID provided."),
			);
		}

		if (!data || Object.keys(data).length === 0) {
			return formatErrorResponse(
				"Update data cannot be empty.",
				new BadRequestException("Update data cannot be empty."),
			);
		}

		try {
			const updatedRemaja = await this.remajaService.updateUser(
				{ id: numericId },
				data,
			);

			if (!updatedRemaja) {
				throw new NotFoundException(`Remaja with ID ${numericId} not found.`);
			}

			return formatResponse(
				updatedRemaja,
				"Successfully updated a Remaja",
				true,
				null,
			);
		} catch (error) {
			console.error("Error updating Remaja:", error);
			if (
				error instanceof NotFoundException ||
				error instanceof BadRequestException
			) {
				return formatErrorResponse(error.message, error);
			}
			throw error;
		}
	}
}
