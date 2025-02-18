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
	async signIn(@Body() signInDto: Record<string, any>) {
		const result = await this.authService.signIn(
			signInDto.username,
			signInDto.password,
		);
		return {
			...result,
			message: "Login successful.",
		};
	}
}
