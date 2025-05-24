import { Controller, Get, Param, Query } from "@nestjs/common";
import { ApiOkResponse, ApiQuery } from "@nestjs/swagger";
import { formatResponse } from "src/helper/response.helper";
import type { DesaEntity } from "./desa.entity";
import { DesaService } from "./desa.service";

@Controller("desa")
export class DesaController {
	private readonly desaService: DesaService;

	constructor(desaService: DesaService) {
		this.desaService = desaService;
	}

	@Get()
	@ApiOkResponse({
		description: "Successfully get all Desa",
		schema: {
			type: "object",
			properties: {
				success: {
					type: "boolean",
					example: true,
				},
				message: {
					type: "string",
					example: "Successfully get all Desa",
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
								example: "Sendang Mulyo",
							},
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
	@ApiQuery({
		name: "q",
		required: false,
		type: String,
		description: "Search Desa by Nama",
		example: "Sendang Mulyo",
	})
	async getAllDesa(@Query("q") nama: string) {
		let data: DesaEntity[];

		if (nama) {
			data = await this.desaService.filterDesa(nama);
		} else {
			data = await this.desaService.getAllUsers();
		}

		return formatResponse(true, "Berhasil mendapatkan data Desa", data, null);
	}

	@Get(":id")
	async getDesaById(@Param("id") id: number) {
		return await this.desaService.getDesaById(id);
	}
}
