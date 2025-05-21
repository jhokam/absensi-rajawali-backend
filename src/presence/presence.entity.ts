import { ApiProperty } from "@nestjs/swagger";
import { Exclude } from "class-transformer";
import type { Presence } from "../generated/client";
import { Status } from "../generated/client/enums";

export class PresenceEntity implements Presence {
	@ApiProperty({ example: "3ad6433d-b627-4c60-85f1-a8099b41eded" })
	id: string;

	@Exclude({})
	created_at: Date;

	@ApiProperty({ example: "Hadir", enum: Status })
	status: Status;

	@ApiProperty({ example: "", nullable: true })
	description: string | null;

	@ApiProperty({ example: "70bd4de0-76ff-4a91-9fb5-a51e229ebb94" })
	event_id: string;

	@ApiProperty({ example: "1-SML-0000" })
	generus_id: string;
}
