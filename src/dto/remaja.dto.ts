import { JenisKelamin, Jenjang, Role } from "@prisma/client";
import { IsBoolean, IsEnum, IsString } from "class-validator";

export class Remaja {
	@IsString()
	nama!: string;

	@IsString()
	username!: string;

	@IsEnum(JenisKelamin)
	jenis_kelamin!: JenisKelamin;

	@IsEnum(Jenjang)
	jenjang!: Jenjang;

	@IsString()
	alamat!: string;

	@IsBoolean()
	sambung!: boolean;

	@IsEnum(Role)
	role: Role;

	@IsString()
	password!: string;
}
