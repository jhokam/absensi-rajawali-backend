import { Controller, Get, Query } from "@nestjs/common";
import { formatResponse } from "src/helper/response.helper";
import type { KelompokEntity } from "./kelompok.entity";
import { KelompokService } from "./kelompok.service";

@Controller("kelompok")
export class KelompokController {
	private readonly kelompokService: KelompokService;

	constructor(kelompokService: KelompokService) {
		this.kelompokService = kelompokService;
	}

	@Get()
	async getAllKelompok(@Query("q") searchQuery: string) {
		let data: KelompokEntity[];
		let message: string;

		if (searchQuery) {
			data = await this.kelompokService.searchKelompok(searchQuery);
			message = `Berhasil mencari Kelompok: ${searchQuery}`;
		} else {
			data = await this.kelompokService.getAllKelompok();
			message = "Berhasil mendapatkan semua data Kelompok";
		}

		return formatResponse(true, message, data, null);
	}

	@Get(":id")
	async getKelompokById(id: string) {
		const data = await this.kelompokService.getKelompokById(id);
		return formatResponse(
			true,
			`Berhasil mendapatkan Kelompok dengan ID: ${id}`,
			data,
			null,
		);
	}
}
