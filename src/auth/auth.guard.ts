import {
	type CanActivate,
	type ExecutionContext,
	Injectable,
	UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import type { Request } from "express";

@Injectable()
export class AuthGuard implements CanActivate {
	private jwtService: JwtService;

	constructor(jwtService: JwtService) {
		this.jwtService = jwtService;
	}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const request = context.switchToHttp().getRequest();
		const token = this.extractTokenFromHeader(request);
		if (!token) {
			throw new UnauthorizedException();
		}
		try {
			const payload = await this.jwtService.verifyAsync(token, {
				secret: process.env.JWT_SECRET,
			});
			request.user = payload;
		} catch {
			throw new UnauthorizedException();
		}
		return true;
	}

	private extractTokenFromHeader(request: Request): string | undefined {
		const [type, token] = request.headers.authorization?.split(" ") ?? [];
		return type === "Bearer" ? token : undefined;
	}
}
