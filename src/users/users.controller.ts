import { Controller, Get } from "@nestjs/common";
import { UsersService } from "./users.service";

@Controller("users")
export class UsersController {
	private readonly usersService: UsersService;

	constructor(usersService: UsersService) {
		this.usersService = usersService;
	}

	@Get()
	async getAllUsers() {
		return await this.usersService.getAllUsers();
	}
}
