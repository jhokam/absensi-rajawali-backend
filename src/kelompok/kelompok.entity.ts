import { ApiProperty } from "@nestjs/swagger";
import { Exclude } from "class-transformer";
import type { Kelompok } from "../generated/client";

export class KelompokEntity implements Kelompok {
	@ApiProperty({
		example: "FTM",
		required: false,
	})
	id: string;

	@Exclude()
	created_at: Date;

	@ApiProperty({ example: "Fatmawati", maximum: 50 })
	nama: string;

	@ApiProperty({ example: 1 })
	desa_id: number;
}
