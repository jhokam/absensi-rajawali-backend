import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsEnum, IsOptional, IsString } from "class-validator";
import {
	JenisKelamin,
	Jenjang,
	Keterangan,
	PendidikanTerakhir,
	Sambung,
} from "../../generated/client";

export class GenerusDto {
	@IsString()
	@ApiProperty({ example: "Abdul Aziz" })
	nama: string;

	@IsEnum(JenisKelamin)
	@ApiProperty({ example: "", enum: JenisKelamin })
	jenis_kelamin: JenisKelamin;

	@IsString()
	@IsOptional()
	@ApiProperty({ example: "Jakarta" })
	tempat_lahir: string | null;

	@IsDate()
	@ApiProperty({})
	tanggal_lahir: Date;

	@IsEnum(Jenjang)
	@ApiProperty({ example: "", enum: Jenjang })
	jenjang: Jenjang;

	@IsString()
	@IsOptional()
	@ApiProperty({ example: "081234567890" })
	nomer_whatsapp: string | null;

	@IsEnum(PendidikanTerakhir)
	@ApiProperty({ example: "", enum: PendidikanTerakhir })
	pendidikan_terakhir: PendidikanTerakhir;

	@IsString()
	@IsOptional()
	@ApiProperty({ example: "Orang Tua Admin Rajawali" })
	nama_orang_tua: string | null;

	@IsString()
	@IsOptional()
	@ApiProperty({ example: "081234567891" })
	nomer_whatsapp_orang_tua: string | null;

	@IsEnum(Sambung)
	@ApiProperty({ example: "", enum: Sambung })
	sambung: Sambung;

	@IsString()
	@ApiProperty({ example: "Jl. Admin Rajawali No. 1" })
	alamat_tempat_tinggal: string;

	@IsEnum(Keterangan)
	@ApiProperty({ example: "", enum: Keterangan })
	keterangan: Keterangan;

	@IsString()
	@IsOptional()
	@ApiProperty({ example: "Jl. Admin Rajawali No. 2" })
	alamat_asal: string | null;

	@IsString()
	@ApiProperty({ example: "56a5eb0c-dafd-4c86-95e7-a6e4a99d156a" })
	kelompok_id: string;
}
