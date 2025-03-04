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
import {
	ApiBody,
	ApiCreatedResponse,
	ApiNotFoundResponse,
	ApiOkResponse,
	ApiResponse,
} from "@nestjs/swagger";
import type { Prisma } from "@prisma/client";
import { AuthGuard } from "src/auth/auth.guard";
import type { GenerusDto } from "src/dto/generus.dto";
import {
	formatErrorResponse,
	formatResponse,
} from "src/helper/response.helper";
import { RolesGuard } from "src/roles/roles.guard";
import type { GenerusResponse, GenerusResponseArray } from "../types";
import { GenerusService } from "./generus.service";

@Controller("/generus")
@UseGuards(AuthGuard, RolesGuard)
export class GenerusController {
	private readonly generusService: GenerusService;

	constructor(generusService: GenerusService) {
		this.generusService = generusService;
	}

	@Get()
	@ApiOkResponse({
		description: "Successfully retrieved all Generus data",
		schema: {
			type: "object",
			properties: {
				success: {
					type: "boolean",
					example: true,
				},
				message: {
					type: "string",
					example: "Successfully retrieved all Generus data",
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
								example: "Generus",
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
	async getAllGenerus(@Query("id") id?: string): Promise<GenerusResponseArray> {
		try {
			let data;

			if (id) {
				if (!/^\d+$/.test(id)) {
					throw new BadRequestException("Invalid ID format. Must be a number.");
				}
				// Fetch users where ID contains the provided number (e.g., searching "5" returns 5, 15, 25)
				data = await this.generusService.getUsersByPartialId(id);
			} else {
				// Fetch all users if no ID is provided
				data = await this.generusService.getAllUsers();
			}

			return formatResponse(
				true,
				"Successfully retrieved Generus data",
				data,
				null,
			);
		} catch (error) {
			console.error("Error retrieving Generus:", error);
			return formatErrorResponse(
				"Failed to retrieve Generus. Please try again later.",
				new InternalServerErrorException("Failed to retrieve Generus."),
			);
		}
	}

	@Get("/:id")
	@ApiOkResponse({
		description: "Successfully retrieved 1 Generus data",
		schema: {
			type: "object",
			properties: {
				success: {
					type: "boolean",
					example: true,
				},
				message: {
					type: "string",
					example: "Successfully retrieved 1 Generus data",
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
							example: "Generus",
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
	@ApiNotFoundResponse({
		description: "Generus not found",
		schema: {
			type: "object",
			properties: {
				success: {
					type: "boolean",
					example: false,
				},
				message: {
					type: "string",
					example: "Generus with ID 3 not found.",
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
									example: "Generus with ID 3 not found.",
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
							example: "Generus with ID 3 not found.",
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
	async getGenerusById(@Param("id") id: string): Promise<GenerusResponse> {
		const numericId = Number(id);
		if (Number.isNaN(numericId)) {
			throw new BadRequestException("Invalid ID provided.");
		}

		try {
			const generus = await this.generusService.getUserById(id);
			if (!generus) {
				throw new NotFoundException(`Generus with ID ${numericId} not found.`);
			}
			return formatResponse(
				true,
				"Successfully retrieved 1 Generus data",
				generus,
				null,
			);
		} catch (error) {
			console.error("Error retrieving Generus:", error);
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
					example: "Generus",
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
	@ApiCreatedResponse({
		description: "Successfully created a new Generus",
		schema: {
			type: "object",
			properties: {
				success: {
					type: "boolean",
					example: true,
				},
				message: {
					type: "string",
					example: "Successfully created a new Generus",
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
							example: "Generus",
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
		description: "Failed to create a new Generus",
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
	async createGenerus(@Body() data: GenerusDto): Promise<GenerusResponse> {
		try {
			const createdGenerus = await this.generusService.createUser(data);
			return formatResponse(
				true,
				"Successfully created a new Generus",
				createdGenerus,
				null,
			);
		} catch (error) {
			console.error("Error creating Generus:", error);
			if (error instanceof BadRequestException) {
				return formatErrorResponse(error.message, error);
			}
			throw error;
		}
	}

	@Delete("/:id")
	@ApiOkResponse({
		description: "Successfully deleted a Generus",
		schema: {
			type: "object",
			properties: {
				success: {
					type: "boolean",
					example: true,
				},
				message: {
					type: "string",
					example: "Successfully deleted a Generus",
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
							example: "Generus",
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
	async deleteGenerus(@Param("id") id: string): Promise<GenerusResponse> {
		const numericId = Number(id);
		if (Number.isNaN(numericId)) {
			return formatErrorResponse(
				"Invalid ID provided.",
				new BadRequestException("Invalid ID provided."),
			);
		}

		try {
			const deletedGenerus = await this.generusService.deleteUser({
				id: numericId,
			});
			if (!deletedGenerus) {
				throw new NotFoundException(`Generus with ID ${numericId} not found.`);
			}
			return formatResponse(
				true,
				"Successfully deleted a Generus",
				deletedGenerus,
				null,
			);
		} catch (error) {
			console.error("Error deleting Generus:", error);
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
	@ApiOkResponse({
		description: "Successfully updated a Generus",
		schema: {
			type: "object",
			properties: {
				success: {
					type: "boolean",
					example: true,
				},
				message: {
					type: "string",
					example: "Successfully updated a Generus",
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
							example: "Generus",
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
	async updateGenerus(
		@Param("id") id: string,
		@Body() data: Prisma.GenerusUpdateInput,
	): Promise<GenerusResponse> {
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
			const updatedGenerus = await this.generusService.updateUser(
				{ id: numericId },
				data,
			);

			if (!updatedGenerus) {
				throw new NotFoundException(`Generus with ID ${numericId} not found.`);
			}

			return formatResponse(
				true,
				"Successfully updated a Generus",
				updatedGenerus,
				null,
			);
		} catch (error) {
			console.error("Error updating Generus:", error);
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
