import { Controller, Get, InternalServerErrorException } from "@nestjs/common";
import {
	formatErrorResponse,
	formatResponse,
} from "src/helper/response.helper";
import { KelompokService } from "./kelompok.service";

@Controller("kelompok")
export class KelompokController {
	private readonly kelompokService: KelompokService;

	constructor(kelompokService: KelompokService) {
		this.kelompokService = kelompokService;
	}

	@Get()
	async getAllKelompok() {
		// : Promise<KelompokResponseArray>
		try {
			const data = await this.kelompokService.getAllUsers();

			return formatResponse(
				true,
				"Successfully retrieved Kelompok data",
				data,
				null,
			);
		} catch (error) {
			console.error("Error retrieving Kelompok:", error);
			return formatErrorResponse(
				"Failed to retrieve Kelompok. Please try again later.",
				new InternalServerErrorException("Failed to retrieve Kelompok."),
			);
		}
	}
}
