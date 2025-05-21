import { ApiProperty } from "@nestjs/swagger";
import type { Desa } from "../generated/client";

export class DesaEntity implements Desa {
	@ApiProperty({ example: 1 })
	id: number;

	@ApiProperty()
	created_at: Date;

	@ApiProperty({ example: "Sendang Mulyo", maximum: 50 })
	nama: string;
}
