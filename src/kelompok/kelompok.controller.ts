import { Controller, Get } from "@nestjs/common";
import { formatResponse } from "src/helper/response.helper";
import { KelompokService } from "./kelompok.service";

@Controller("kelompok")
export class KelompokController {
	private readonly kelompokService: KelompokService;

	constructor(kelompokService: KelompokService) {
		this.kelompokService = kelompokService;
	}

	@Get()
	async getAllKelompok() {
		const data = await this.kelompokService.getAllUsers();

		return formatResponse(
			true,
			"Successfully retrieved Kelompok data",
			data,
			null,
		);
	}
}
