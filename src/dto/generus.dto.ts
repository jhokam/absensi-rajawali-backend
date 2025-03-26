import { ApiProperty } from "@nestjs/swagger";
import type {
	Generus,
	JenisKelamin,
	Jenjang,
	Keterangan,
	PendidikanTerakhir,
	Sambung,
} from "@prisma/client";
import { IsString } from "class-validator";
import { ResponseBaseDto, ResponseBaseWithArrayDto } from "./response.dto";

export class PublicGenerusDto
	implements Omit<Generus, "created_at" | "updated_at">
{
	@ApiProperty({ example: 1 })
	@IsString()
	id: string;

	@ApiProperty({ example: "John Doe" })
	@IsString()
	nama: string;

	@ApiProperty({ example: "Laki-Laki" })
	jenis_kelamin: JenisKelamin;

	@ApiProperty({ example: "Jakarta" })
	tempat_lahir: string | null;

	@ApiProperty({ example: "2000-01-01" })
	tanggal_lahir: Date;

	@ApiProperty({ example: "Paud" })
	jenjang: Jenjang;

	@ApiProperty({ example: "081234567890" })
	nomer_whatsapp: string | null;

	@ApiProperty({ example: "S1/D4" })
	pendidikan_terakhir: PendidikanTerakhir;

	@ApiProperty({ example: "Parent Name" })
	nama_orang_tua: string | null;

	@ApiProperty({ example: "081234567891" })
	nomer_whatsapp_orang_tua: string | null;

	@ApiProperty({ example: "Aktif" })
	sambung: Sambung;

	@ApiProperty({ example: "Jl. Example No. 123" })
	alamat_tempat_tinggal: string;

	@ApiProperty({ example: "Pribumi" })
	keterangan: Keterangan;

	@ApiProperty({ example: "Jl. Hometown No. 456" })
	alamat_asal: string | null;

	@ApiProperty({ example: 1 })
	@IsString()
	kelompok_id: string;
}

export class GenerusResponseDto extends ResponseBaseDto<PublicGenerusDto> {}
export class GenerusResponseArrayDto extends ResponseBaseWithArrayDto<PublicGenerusDto> {}
