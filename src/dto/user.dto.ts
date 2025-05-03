import { ApiProperty } from "@nestjs/swagger";
import { Role, type User } from "@prisma/client";
import { IsEnum, IsString } from "class-validator";

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
	@IsEnum(Role)
	role: Role;

	@ApiProperty({ example: "5e2154a7-683e-4ce4-82e5-2537743175b3" })
	@IsString()
	generus_id: string;
}
