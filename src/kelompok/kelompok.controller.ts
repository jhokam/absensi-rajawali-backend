import { Controller, Get, InternalServerErrorException } from "@nestjs/common";
import { Res } from "@nestjs/common";
import type { Response } from "express";
import {
	formatErrorResponse,
	formatResponse,
} from "src/helper/response.helper";
import { utils, write } from "xlsx";
import { KelompokService } from "./kelompok.service";

@Controller("kelompok")
export class KelompokController {
	private readonly kelompokService: KelompokService;

	constructor(kelompokService: KelompokService) {
		this.kelompokService = kelompokService;
	}

	@Get("export")
	async exportToExcel(@Res() res: Response) {
		try {
			const data = await this.kelompokService.getAllUsers();

			const workbook = utils.book_new();
			const worksheet = utils.json_to_sheet(data);
			utils.book_append_sheet(workbook, worksheet, "Kelompok Data");

			const excelBuffer = write(workbook, {
				type: "buffer",
				bookType: "xlsx",
			});

			res.set({
				"Content-Type":
					"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
				"Content-Disposition": 'attachment; filename="kelompok_data.xlsx"',
				"Content-Length": excelBuffer.length,
			});

			return res.send(excelBuffer);
		} catch (error) {
			throw new InternalServerErrorException("Failed to generate Excel file");
		}
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
