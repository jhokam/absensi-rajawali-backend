import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import {
	IsDate,
	IsNotEmpty,
	IsNumber,
	IsOptional,
	IsString,
	MaxLength,
} from "class-validator";

export class EventDto {
	@IsString()
	@IsNotEmpty()
	@MaxLength(255)
	@Transform(({ value }) => value.trim())
	@ApiProperty({
		example: "Muda Mudi April 2025",
		maximum: 255,
	})
	title: string;

	@IsDate()
	@IsNotEmpty()
	@ApiProperty()
	start_date: Date;

	@IsDate()
	@IsNotEmpty()
	@ApiProperty()
	end_date: Date;

	@IsNumber()
	@IsNotEmpty()
	@ApiProperty({
		example: 33.8475,
	})
	latitude: number;

	@IsNumber()
	@IsNotEmpty()
	@ApiProperty({
		example: -170.5953,
	})
	longitude: number;

	@IsString()
	@IsOptional()
	@Transform(({ value }) => value.trim())
	@ApiProperty({
		example: "Muda Mudi April 2025",
		required: false,
		nullable: true,
	})
	description: string | null;
}
