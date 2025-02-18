import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";

@Controller("auth")
export class AuthController {
	private authService: AuthService;

	constructor(authService: AuthService) {
		this.authService = authService;
	}

	@HttpCode(HttpStatus.OK)
	@Post("login")
	signIn(@Body() signInDto: Record<string, any>) {
		return this.authService.signIn(signInDto.username, signInDto.password);
	}
}
