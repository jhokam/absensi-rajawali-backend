import { Injectable, Logger, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { verify } from "argon2";
import { UsersService } from "../users/users.service";

@Injectable()
export class AuthService {
	private usersService: UsersService;
	private jwtService: JwtService;
	private logger = new Logger(AuthService.name);

	constructor(usersService: UsersService, jwtService: JwtService) {
		this.usersService = usersService;
		this.jwtService = jwtService;
	}

	async signIn(username: string, pass: string) {
		const user = await this.usersService.findOne(username);
		const message = "Username atau Password salah";
		if (!user) {
			this.logger.error(message);
			throw new UnauthorizedException(message);
		}

		const isPasswordValid = await verify(user.password, pass);

		if (!isPasswordValid) {
			throw new UnauthorizedException(message);
		}

		const payload = {
			sub: user.id,
			username: user.username,
			role: user.role,
		};
		this.logger.log(`User Login: ${username}`);
		return {
			access_token: await this.jwtService.signAsync(payload),
		};
	}
}
