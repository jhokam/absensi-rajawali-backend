import { Controller, Get } from "@nestjs/common";
import { formatResponse } from "../helper/response.helper";
import { UsersService } from "./users.service";

@Controller("users")
export class UsersController {
	private readonly usersService: UsersService;

	constructor(usersService: UsersService) {
		this.usersService = usersService;
	}

	@Get()
	async getAllUsers() {
		const data = await this.usersService.getAllUsers();

		return formatResponse(true, "Success fetch all Users", data, null);
	}
}
