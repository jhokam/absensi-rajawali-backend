import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsOptional, IsString } from "class-validator";
import {
	JenisKelamin,
	Jenjang,
	Keterangan,
	PendidikanTerakhir,
	Sambung,
} from "../../generated/client";

export class FilterGenerusDto {
	@IsString()
	@IsOptional()
	@ApiProperty({ required: false, example: "Abdul Aziz" })
	nama: string;

	@IsEnum(JenisKelamin)
	@IsOptional()
	@ApiProperty({ required: false, enum: JenisKelamin })
	jenis_kelamin: JenisKelamin;

	@IsEnum(Jenjang)
	@IsOptional()
	@ApiProperty({ required: false, enum: Jenjang })
	jenjang: Jenjang;

	@IsEnum(PendidikanTerakhir)
	@IsOptional()
	@ApiProperty({ required: false, enum: PendidikanTerakhir })
	pendidikan_terakhir: PendidikanTerakhir;

	@IsEnum(Sambung)
	@IsOptional()
	@ApiProperty({ required: false, enum: Sambung })
	sambung: Sambung;

	@IsEnum(Keterangan)
	@IsOptional()
	@ApiProperty({ required: false, enum: Keterangan })
	keterangan: Keterangan;
}
