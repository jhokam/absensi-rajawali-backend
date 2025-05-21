import { Controller, Get, Param, Query } from "@nestjs/common";
import { ApiOkResponse } from "@nestjs/swagger";
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
	async getAllDesa(@Query("q") searchQuery: string) {
		let data: DesaEntity[];
		let message: string;

		if (searchQuery) {
			data = await this.desaService.searchDesa(searchQuery);
			message = `Berhasil mendapatkan data Desa dengan nama: ${searchQuery}`;
		} else {
			data = await this.desaService.getAllUsers();
			message = "Berhasil mendapatkan semua data Desa";
		}

		return formatResponse(true, message, data, null);
	}

	@Get(":id")
	async getDesaById(@Param("id") id: number) {
		return await this.desaService.getDesaById(id);
	}
}
