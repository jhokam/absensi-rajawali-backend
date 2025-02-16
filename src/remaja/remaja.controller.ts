import { Controller, Get, Param } from "@nestjs/common";
import { RemajaService } from "./remaja.service";

@Controller("/remaja")
export class RemajaController {
	private readonly remajaService: RemajaService;

	constructor(remajaService: RemajaService) {
		this.remajaService = remajaService
	}

	@Get()
	async getRemaja() {
		const users = await this.remajaService.getAllUsers();
		return { users };
	}

	@Get("/:id")
	async getRemajaById(@Param("id") id: string) {
		return await this.remajaService.remaja({
			id: id,
		});
	}
}
