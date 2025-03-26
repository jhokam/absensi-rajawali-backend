import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNumber, IsString } from "class-validator";

export class ErrorResponseDto {
	@ApiProperty({
		description: "Error response details",
		example: {
			message: "Not Found",
			error: "Resource not found",
			statusCode: 404,
		},
	})
	response: {
		message: string;
		error: string;
		statusCode: number;
	};

	@ApiProperty({ example: 404 })
	@IsNumber()
	status: number;

	@ApiProperty({ example: {} })
	options: Record<never, never>;

	@ApiProperty({ example: "Resource not found" })
	@IsString()
	message: string;

	@ApiProperty({ example: "NotFoundException" })
	@IsString()
	name: string;
}

export class ResponseBaseDto<T> {
	@ApiProperty({ example: true })
	@IsBoolean()
	success: boolean;

	@ApiProperty({ example: "Operation successful" })
	@IsString()
	message: string;

	@ApiProperty({ nullable: true })
	data: T | null;

	@ApiProperty({ nullable: true })
	error: Error | null;
}

export class ResponseBaseWithArrayDto<T> {
	@ApiProperty({ example: true })
	@IsBoolean()
	success: boolean;

	@ApiProperty({ example: "Operation successful" })
	@IsString()
	message: string;

	@ApiProperty({ nullable: true })
	error: Error | null;

	@ApiProperty({ type: Array, nullable: true })
	data: T[] | null;
}
