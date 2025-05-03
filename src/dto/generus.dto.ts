import { ApiProperty } from "@nestjs/swagger";
import {
	type Generus,
	JenisKelamin,
	Jenjang,
	Keterangan,
	PendidikanTerakhir,
	Sambung,
} from "@prisma/client";
import { IsDate, IsEnum, IsString } from "class-validator";
import { ResponseBaseDto, ResponseBaseWithArrayDto } from "./response.dto";

export class PublicGenerusDto
	implements Omit<Generus, "created_at" | "updated_at">
{
	@ApiProperty({ example: "5e2154a7-683e-4ce4-82e5-2537743175b3" })
	@IsString()
	id: string;

	@ApiProperty({ example: "Admin Rajawali" })
	@IsString()
	nama: string;

	@ApiProperty({ example: "Laki_Laki" })
	@IsEnum(JenisKelamin)
	jenis_kelamin: JenisKelamin;

	@ApiProperty({ example: "Jakarta" })
	tempat_lahir: string | null;

	@ApiProperty({ example: "1990-01-01" })
	@IsDate()
	tanggal_lahir: Date;

	@ApiProperty({ example: "Remaja" })
	@IsEnum(Jenjang)
	jenjang: Jenjang;

	@ApiProperty({ example: "081234567890" })
	nomer_whatsapp: string | null;

	@ApiProperty({ example: "S1/D4" })
	@IsEnum(PendidikanTerakhir)
	pendidikan_terakhir: PendidikanTerakhir;

	@ApiProperty({ example: "Parent Name" })
	nama_orang_tua: string | null;

	@ApiProperty({ example: "081234567891" })
	nomer_whatsapp_orang_tua: string | null;

	@ApiProperty({ example: "Aktif" })
	@IsEnum(Sambung)
	sambung: Sambung;

	@ApiProperty({ example: "Jl. Example No. 123" })
	@IsString()
	alamat_tempat_tinggal: string;

	@ApiProperty({ example: "Pribumi" })
	@IsEnum(Keterangan)
	keterangan: Keterangan;

	@ApiProperty({ example: "Jl. Hometown No. 456" })
	alamat_asal: string | null;

	@ApiProperty({ example: 1 })
	@IsString()
	kelompok_id: string;
}

export class GenerusResponseDto extends ResponseBaseDto<PublicGenerusDto> {}
export class GenerusResponseArrayDto extends ResponseBaseWithArrayDto<PublicGenerusDto> {}
