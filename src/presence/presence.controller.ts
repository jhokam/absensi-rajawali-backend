import { Controller, Get } from "@nestjs/common";
import { formatResponse } from "../helper/response.helper";
import { PresenceService } from "./presence.service";

@Controller("presence")
export class PresenceController {
	private readonly presenceService: PresenceService;

	constructor(presenceService: PresenceService) {
		this.presenceService = presenceService;
	}

	@Get()
	async getAllLogs() {
		const data = await this.presenceService.getAllPresences();
		return formatResponse(
			true,
			"Berhasil mendapatkan data Presence",
			data,
			null,
		);
	}
}
