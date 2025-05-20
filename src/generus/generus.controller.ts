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
	Res,
	UploadedFile,
	UseGuards,
	UseInterceptors,
} from "@nestjs/common";
import {
	ApiBody,
	ApiCreatedResponse,
	ApiNotFoundResponse,
	ApiOkResponse,
	ApiResponse,
} from "@nestjs/swagger";
import type { Response } from "express";
import { AuthGuard } from "src/auth/auth.guard";
import {
	formatErrorResponse,
	formatResponse,
} from "src/helper/response.helper";
import { RolesGuard } from "src/roles/roles.guard";
import type { GenerusDto } from "./generus.dto";
import type { GenerusEntity } from "./generus.entity";
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
	async getAllGenerus(@Query("q") q: string) {
		let data: GenerusEntity[];
		let message: string;

		if (q) {
			data = await this.generusService.searchGenerus(q);
			message = "Successfully retrieved 1 Generus data";
		} else {
			data = await this.generusService.getAllGenerus();
			message = "Successfully retrieved all Generus data";
		}

		return formatResponse(true, message, data, null);
	}

	@Get("export")
	async exportToExcel(@Res() res: Response) {
		const data = await this.generusService.getAllGenerus();
		return await this.generusService.exportGenerus(res, data);
	}

	@Get(":id")
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
	async getGenerusById(@Param("id") id: string) {
		const generus = await this.generusService.getGenerusById(id);
		return formatResponse(
			true,
			"Successfully retrieved 1 Generus data",
			generus,
			null,
		);
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
	async createGenerus(@Body() input: GenerusDto) {
		const data = await this.generusService.createGenerus(input);
		return formatResponse(
			true,
			"Successfully created a new Generus",
			data,
			null,
		);
	}

	@Patch(":id")
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
	async updateGenerus(@Param("id") id: string, @Body() input: GenerusDto) {
		if (!input || Object.keys(input).length === 0) {
			return formatErrorResponse(
				"Update input cannot be empty.",
				new BadRequestException("Update input cannot be empty."),
			);
		}

		const updatedGenerus = await this.generusService.updateGenerus(id, input);

		if (!updatedGenerus) {
			throw new NotFoundException(`Generus with ID ${id} not found.`);
		}

		return formatResponse(
			true,
			"Successfully updated a Generus",
			updatedGenerus,
			null,
		);
	}

	@Delete(":id")
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
	async deleteGenerus(@Param("id") id: string) {
		const data = await this.generusService.deleteGenerus(id);
		if (!data) {
			throw new NotFoundException(`Generus with ID ${id} not found.`);
		}
		return formatResponse(true, "Successfully deleted a Generus", data, null);
	}
}
