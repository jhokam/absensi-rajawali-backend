import { ApiProperty } from "@nestjs/swagger";
import { Exclude } from "class-transformer";
import type { Event } from "../generated/client";

export class EventEntity implements Event {
	@ApiProperty({
		example: "888099ce-4f95-471a-b07c-e7a3dd0aa772",
		required: false,
		uniqueItems: true,
	})
	id: string;

	@Exclude()
	created_at: Date;

	@Exclude()
	updated_at: Date;

	@ApiProperty({ example: "muda-mudi November 2006" })
	title: string;

	@ApiProperty()
	start_date: Date;

	@ApiProperty()
	end_date: Date;

	@ApiProperty({
		example: 100.0,
	})
	latitude: number;

	@ApiProperty({
		example: 100.0,
	})
	longitude: number;

	@ApiProperty({ example: "muda-mudi", required: false })
	description: string | null;
}
