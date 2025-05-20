import { ApiProperty } from "@nestjs/swagger";
import { Exclude } from "class-transformer";
import type { Kelompok } from "../generated/client";

export class KelompokEntity implements Kelompok {
	@ApiProperty({
		example: "22e35e15-c8c3-42f6-8267-ec1f9a57b7dd",
		required: false,
	})
	id: string;

	@Exclude()
	created_at: Date;

	@ApiProperty({ example: "Fatmawati" })
	nama: string;

	@ApiProperty({ example: "FTM" })
	code: string;

	@ApiProperty({ example: 1 })
	desa_id: number;
}
