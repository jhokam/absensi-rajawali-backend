import { JenisKelamin, Jenjang, Role, Sambung } from "@prisma/client";
import { IsEnum, IsNotEmpty, IsString } from "class-validator";

export class RemajaDto {
	@IsString()
	@IsNotEmpty()
	nama: string;

	@IsString()
	@IsNotEmpty()
	username: string;

	@IsEnum(JenisKelamin)
	@IsNotEmpty()
	jenis_kelamin: JenisKelamin;

	@IsEnum(Jenjang)
	@IsNotEmpty()
	jenjang: Jenjang;

	@IsString()
	@IsNotEmpty()
	alamat: string;

	@IsEnum(Sambung)
	@IsNotEmpty()
	sambung: Sambung;

	@IsEnum(Role)
	@IsNotEmpty()
	role: Role;
}
