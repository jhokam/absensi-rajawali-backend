import { ApiProperty } from "@nestjs/swagger";
import { Exclude } from "class-transformer";
import {
	type Generus,
	JenisKelamin,
	Jenjang,
	Keterangan,
	PendidikanTerakhir,
	Sambung,
} from "../generated/client";

export class GenerusEntity implements Generus {
	@ApiProperty({ example: "1-SML-0000" })
	id: string;

	@Exclude()
	created_at: Date;

	@Exclude()
	updated_at: Date;

	@ApiProperty({ example: "Abdul Aziz", maximum: 50 })
	nama: string;

	@ApiProperty({ example: "", enum: JenisKelamin })
	jenis_kelamin: JenisKelamin;

	@ApiProperty({
		example: "Jakarta",
		maximum: 50,
	})
	tempat_lahir: string;

	@ApiProperty({})
	tanggal_lahir: Date;

	@ApiProperty({ example: "", enum: Jenjang })
	jenjang: Jenjang;

	@ApiProperty({
		example: "081234567890",
		maximum: 14,
		nullable: true,
		required: false,
	})
	nomer_whatsapp: string | null;

	@ApiProperty({ example: "", enum: PendidikanTerakhir })
	pendidikan_terakhir: PendidikanTerakhir;

	@ApiProperty({
		example: "Orang Tua Admin Rajawali",
		maximum: 50,
		nullable: true,
		required: false,
	})
	nama_orang_tua: string | null;

	@ApiProperty({
		example: "081234567891",
		maximum: 14,
		nullable: true,
		required: false,
	})
	nomer_whatsapp_orang_tua: string | null;

	@ApiProperty({ example: "", enum: Sambung })
	sambung: Sambung;

	@ApiProperty({ example: "Jl. Admin Rajawali No. 1", maximum: 255 })
	alamat_tempat_tinggal: string;

	@ApiProperty({ example: "", enum: Keterangan })
	keterangan: Keterangan;

	@ApiProperty({
		example: "Jl. Admin Rajawali No. 2",
		nullable: true,
		required: false,
		maximum: 255,
	})
	alamat_asal: string | null;

	@ApiProperty({ example: "56a5eb0c-dafd-4c86-95e7-a6e4a99d156a" })
	kelompok_id: string;
}
