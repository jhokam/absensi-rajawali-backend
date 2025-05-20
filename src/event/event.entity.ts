import { ApiProperty } from "@nestjs/swagger";
import { Exclude } from "class-transformer";
import type { Event } from "../generated/client";

export class EventEntity implements Event {
	@ApiProperty({
		example: "888099ce-4f95-471a-b07c-e7a3dd0aa772",
		required: false,
	})
	id: string;

	@Exclude()
	created_at: Date;

	@Exclude()
	updated_at: Date;

	@ApiProperty({ example: "muda-mudi November 2006" })
	title: string;

	@ApiProperty({ required: false })
	start_date: Date;

	@ApiProperty({ required: false })
	end_date: Date;

	@ApiProperty({ example: "Jakarta", required: false })
	location: string;

	@ApiProperty({ example: "muda-mudi", required: false })
	description: string;
}
