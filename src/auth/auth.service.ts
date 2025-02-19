import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { verify } from "argon2";
import { UsersService } from "../users/users.service";

@Injectable()
export class AuthService {
	private usersService: UsersService;
	private jwtService: JwtService;

	constructor(usersService: UsersService, jwtService: JwtService) {
		this.usersService = usersService;
		this.jwtService = jwtService;
	}

	async signIn(
		username: string,
		pass: string,
	): Promise<{ access_token: string }> {
		try {
			const user = await this.usersService.findOne(username);

			if (!user) {
				throw new UnauthorizedException("Invalid credentials");
			}

			const isPasswordValid = await verify(user.password, pass);

			if (!isPasswordValid) {
				throw new UnauthorizedException("Invalid credentials");
			}

			const payload = {
				sub: user.id,
				username: user.username,
				role: user.role,
			};
			return {
				access_token: await this.jwtService.signAsync(payload),
			};
		} catch (error) {
			console.error("Error during sign-in:", error);
			throw error;
		}
	}
}
