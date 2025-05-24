import { Controller, Get, ParseIntPipe, Query } from "@nestjs/common";
import { ApiQuery } from "@nestjs/swagger";
import { formatResponse } from "src/helper/response.helper";
import { FilterKelompokDto } from "./filter-kelompok.dto";
import type { KelompokEntity } from "./kelompok.entity";
import { KelompokService } from "./kelompok.service";

@Controller("kelompok")
export class KelompokController {
	private readonly kelompokService: KelompokService;

	constructor(kelompokService: KelompokService) {
		this.kelompokService = kelompokService;
	}

	@Get()
	@ApiQuery({
		name: "q",
		required: false,
		type: String,
		description: "Search Kelompok by Nama",
		example: "Kanguru",
	})
	@ApiQuery({
		name: "desa_id",
		required: false,
		type: Number,
		description: "Search Kelompok by Desa ID",
		example: 1,
	})
	async getAllKelompok(
		@Query("q") nama,
		@Query("desa_id", ParseIntPipe) desa_id,
	) {
		let data: KelompokEntity[];

		if (nama || desa_id) {
			data = await this.kelompokService.getAllKelompok();
		} else {
			data = await this.kelompokService.filterKelompok(nama, desa_id);
		}

		return formatResponse(
			true,
			"Berhasil mendapatkan data Kelompok",
			data,
			null,
		);
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
