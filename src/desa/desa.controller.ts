import { Controller, Get } from "@nestjs/common";
import { ApiOkResponse } from "@nestjs/swagger";
import {
	formatErrorResponse,
	formatResponse,
} from "src/helper/response.helper";
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
		try {
			const data = await this.desaService.getAllUsers();

			return formatResponse(true, "Success get all Desa", data, null);
		} catch (error) {
			return formatErrorResponse("Failed to retrieve Desa", error);
		}
	}
}
