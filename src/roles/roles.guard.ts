import {
	type CanActivate,
	type ExecutionContext,
	Injectable,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Role } from "@prisma/client";
import type { Observable } from "rxjs";

@Injectable()
export class RolesGuard implements CanActivate {
	private reflector: Reflector;

	constructor(reflector: Reflector) {
		this.reflector = reflector;
	}

	canActivate(
		context: ExecutionContext,
	): boolean | Promise<boolean> | Observable<boolean> {
		const requiredRoles = this.reflector.get<Role[]>(
			"roles",
			context.getHandler(),
		);
		if (!requiredRoles) {
			return true;
		}
		const request = context.switchToHttp().getRequest();
		const user = request.user;

		return requiredRoles.some((role) => user.role === role);
	}
}
