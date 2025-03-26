import { ApiProperty } from "@nestjs/swagger";
import type { Role, User } from "@prisma/client";
import { IsString } from "class-validator";

export class PublicUserDto
	implements Omit<User, "created_at" | "updated_at" | "password">
{
	@ApiProperty({ example: "uuid" })
	@IsString()
	id: string;

	@ApiProperty({ example: "johndoe" })
	@IsString()
	username: string;

	@ApiProperty({ example: "User" })
	role: Role;

	@ApiProperty({ example: "uuid" })
	@IsString()
	generus_id: string;
}
