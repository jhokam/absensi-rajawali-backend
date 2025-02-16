import { Controller, Get, Param } from "@nestjs/common";
import { Request } from "express";
import { RemajaService } from "./remaja.service";

@Controller("/remaja")
export class RemajaController {
	constructor(private readonly remajaService: RemajaService) {}

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
