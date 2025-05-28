import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import {
	IsDate,
	IsEnum,
	IsNotEmpty,
	IsOptional,
	IsString,
	MaxLength,
} from "class-validator";
import {
	JenisKelamin,
	Jenjang,
	Keterangan,
	PendidikanTerakhir,
	Sambung,
} from "../../generated/client";

export class GenerusDto {
	@IsString()
	@IsNotEmpty()
	@MaxLength(255)
	@Transform(({ value }) => value.trim())
	@ApiProperty({ example: "Abdul Aziz", maxLength: 255 })
	nama: string;

	@IsEnum(JenisKelamin)
	@IsNotEmpty()
	@ApiProperty({ example: "Laki_Laki", enum: JenisKelamin })
	jenis_kelamin: JenisKelamin;

	@IsString()
	@IsNotEmpty()
	@MaxLength(50)
	@Transform(({ value }) => value.trim())
	@ApiProperty({ example: "Jakarta", maxLength: 50 })
	tempat_lahir: string;

	@IsDate()
	@IsNotEmpty()
	@ApiProperty()
	tanggal_lahir: Date;

	@IsEnum(Jenjang)
	@IsNotEmpty()
	@ApiProperty({ example: "Paud", enum: Jenjang })
	jenjang: Jenjang;

	@IsString()
	@IsOptional()
	@Transform(({ value }) => value.trim())
	@ApiProperty({
		example: "081234567890",
		nullable: true,
		maxLength: 15,
		required: false,
	})
	nomer_whatsapp: string | null;

	@IsEnum(PendidikanTerakhir)
	@IsNotEmpty()
	@ApiProperty({ example: "S2", enum: PendidikanTerakhir })
	pendidikan_terakhir: PendidikanTerakhir;

	@IsString()
	@IsOptional()
	@MaxLength(255)
	@Transform(({ value }) => value.trim())
	@ApiProperty({ example: "", nullable: true, required: false, maxLength: 255 })
	nama_orang_tua: string | null;

	@IsString()
	@IsOptional()
	@Transform(({ value }) => value.trim())
	@ApiProperty({ example: "081234567891" })
	nomer_whatsapp_orang_tua: string | null;

	@IsEnum(Sambung)
	@ApiProperty({ example: "", enum: Sambung })
	sambung: Sambung;

	@IsString()
	@Transform(({ value }) => value.trim())
	@ApiProperty({ example: "Jl. Admin Rajawali No. 1" })
	alamat_tempat_tinggal: string;

	@IsEnum(Keterangan)
	@ApiProperty({ example: "", enum: Keterangan })
	keterangan: Keterangan;

	@IsString()
	@IsOptional()
	@Transform(({ value }) => value.trim())
	@ApiProperty({ example: "Jl. Admin Rajawali No. 2" })
	alamat_asal: string | null;

	@IsString()
	@ApiProperty({ example: "56a5eb0c-dafd-4c86-95e7-a6e4a99d156a" })
	kelompok_id: string;
}
