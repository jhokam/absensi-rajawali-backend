import { ApiProperty } from "@nestjs/swagger";
import type { Log } from "../generated/client";

export class LogEntity implements Log {
	@ApiProperty({ example: "1c62176f-cf0e-44f4-bed5-adc39318f1f5" })
	id: string;

	@ApiProperty()
	created_at: Date;

	@ApiProperty({ example: "Login" })
	event: string;

	@ApiProperty({ example: "Berhasil login" })
	description: string;

	@ApiProperty({ example: "01cd039f-56db-4b0a-ab19-82ad1e54d671" })
	user_id: string;
}
