import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsEnum, IsOptional, IsString } from "class-validator";
import { $Enums } from "../generated/client";

export class GenerusDto {
	@IsString()
	@ApiProperty({ example: "Abdul Aziz" })
	nama: string;

	@IsEnum($Enums.JenisKelamin)
	@ApiProperty({ example: "", enum: $Enums.JenisKelamin })
	jenis_kelamin: $Enums.JenisKelamin;

	@IsString()
	@IsOptional()
	@ApiProperty({ example: "Jakarta" })
	tempat_lahir: string | null;

	@IsDate()
	@ApiProperty({})
	tanggal_lahir: Date;

	@IsEnum($Enums.Jenjang)
	@ApiProperty({ example: "", enum: $Enums.Jenjang })
	jenjang: $Enums.Jenjang;

	@IsString()
	@IsOptional()
	@ApiProperty({ example: "081234567890" })
	nomer_whatsapp: string | null;

	@IsEnum($Enums.PendidikanTerakhir)
	@ApiProperty({ example: "", enum: $Enums.PendidikanTerakhir })
	pendidikan_terakhir: $Enums.PendidikanTerakhir;

	@IsString()
	@IsOptional()
	@ApiProperty({ example: "Orang Tua Admin Rajawali" })
	nama_orang_tua: string | null;

	@IsString()
	@IsOptional()
	@ApiProperty({ example: "081234567891" })
	nomer_whatsapp_orang_tua: string | null;

	@IsEnum($Enums.Sambung)
	@ApiProperty({ example: "", enum: $Enums.Sambung })
	sambung: $Enums.Sambung;

	@IsString()
	@ApiProperty({ example: "Jl. Admin Rajawali No. 1" })
	alamat_tempat_tinggal: string;

	@IsEnum($Enums.Keterangan)
	@ApiProperty({ example: "", enum: $Enums.Keterangan })
	keterangan: $Enums.Keterangan;

	@IsString()
	@IsOptional()
	@ApiProperty({ example: "Jl. Admin Rajawali No. 2" })
	alamat_asal: string | null;

	@IsString()
	@ApiProperty({ example: "56a5eb0c-dafd-4c86-95e7-a6e4a99d156a" })
	kelompok_id: string;
}
