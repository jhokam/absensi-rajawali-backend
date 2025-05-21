import { ApiProperty } from "@nestjs/swagger";
import { Exclude } from "class-transformer";
import type { User } from "../generated/client";
import { Role } from "../generated/client/enums";

export class UsersEntity implements User {
	@ApiProperty({ example: "be36cec6-1416-4962-8d67-d945b5b6b6dc" })
	id: string;

	@Exclude()
	created_at: Date;

	@Exclude()
	updated_at: Date;

	@ApiProperty({ example: "admin", maximum: 50 })
	username: string;

	@Exclude()
	password: string;

	@ApiProperty({ example: "Admin", enum: Role })
	role: Role;
}
