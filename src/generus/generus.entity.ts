import { ApiProperty } from "@nestjs/swagger";
import { Exclude } from "class-transformer";
import { $Enums, type Generus } from "../generated/client";

export class GenerusEntity implements Generus {
	@ApiProperty({ example: "1-SML-0000" })
	id: string;

	@Exclude()
	created_at: Date;

	@Exclude()
	updated_at: Date;

	@ApiProperty({ example: "Abdul Aziz" })
	nama: string;

	@ApiProperty({ example: "", enum: $Enums.JenisKelamin })
	jenis_kelamin: $Enums.JenisKelamin;

	@ApiProperty({ example: "Jakarta" })
	tempat_lahir: string | null;

	@ApiProperty({})
	tanggal_lahir: Date;

	@ApiProperty({ example: "", enum: $Enums.Jenjang })
	jenjang: $Enums.Jenjang;

	@ApiProperty({ example: "081234567890" })
	nomer_whatsapp: string | null;

	@ApiProperty({ example: "", enum: $Enums.PendidikanTerakhir })
	pendidikan_terakhir: $Enums.PendidikanTerakhir;

	@ApiProperty({ example: "Orang Tua Admin Rajawali" })
	nama_orang_tua: string | null;

	@ApiProperty({ example: "081234567891" })
	nomer_whatsapp_orang_tua: string | null;

	@ApiProperty({ example: "", enum: $Enums.Sambung })
	sambung: $Enums.Sambung;

	@ApiProperty({ example: "Jl. Admin Rajawali No. 1" })
	alamat_tempat_tinggal: string;

	@ApiProperty({ example: "", enum: $Enums.Keterangan })
	keterangan: $Enums.Keterangan;

	@ApiProperty({ example: "Jl. Admin Rajawali No. 2" })
	alamat_asal: string | null;

	@ApiProperty({ example: "56a5eb0c-dafd-4c86-95e7-a6e4a99d156a" })
	kelompok_id: string;
}
