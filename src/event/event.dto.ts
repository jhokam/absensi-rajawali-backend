import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsNotEmpty, IsString } from "class-validator";

export class EventDto {
	@IsString()
	@IsNotEmpty()
	@ApiProperty({
		description: "The title of the event",
		example: "Event Title",
	})
	title: string;

	@IsDate()
	@ApiProperty({
		description: "The start date of the event",
		example: "2021-01-01T00:00:00.000Z",
		required: false,
	})
	start_date: Date;

	@IsDate()
	@ApiProperty({
		description: "The end date of the event",
		example: "2021-01-01T00:00:00.000Z",
		required: false,
	})
	end_date: Date;

	@IsString()
	@ApiProperty({
		description: "The description of the event",
		example: "Event Description",
		required: false,
	})
	location: string;

	@IsString()
	@ApiProperty({
		description: "The description of the event",
		example: "Event Description",
		required: false,
	})
	description: string;
}
