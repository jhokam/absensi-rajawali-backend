import { JenisKelamin, Jenjang, Role, Sambung } from "@prisma/client";
import { IsEnum, IsString } from "class-validator";

export class RemajaDto {
	// @IsString()
	nama: string;

	// @IsString()
	username: string;

	// @IsEnum(JenisKelamin)
	jenis_kelamin: JenisKelamin;

	// @IsEnum(Jenjang)
	jenjang: Jenjang;

	// @IsString()
	alamat: string;

	// @IsEnum(Sambung)
	sambung: Sambung;

	// @IsEnum(Role)
	role: Role;

	// @IsString()
	password: string;
}
