import { Controller, Get } from "@nestjs/common";
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
	async getAllDesa() {
		try {
			const data = await this.desaService.getAllUsers();

			return formatResponse(true, "Success get all Desa", data, null);
		} catch (error) {
			return formatErrorResponse("Failed to retrieve Desa", error);
		}
	}
}
