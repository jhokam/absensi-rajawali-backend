import { Controller, Get } from "@nestjs/common";
import { ApiOkResponse } from "@nestjs/swagger";
import { formatResponse } from "src/helper/response.helper";
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
	async getAllDesa() {
		const data = await this.desaService.getAllUsers();

		return formatResponse(
			true,
			"Berhasil mendapatkan semua data Desa",
			data,
			null,
		);
	}
}
