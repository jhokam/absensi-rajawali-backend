import { ApiProperty } from "@nestjs/swagger";
import type { Kelompok } from "@prisma/client";
import { IsNumber, IsString } from "class-validator";
import { ResponseBaseWithArrayDto } from "./response.dto";

export class PublicKelompokDto
	implements Omit<Kelompok, "created_at" | "updated_at">
{
	@ApiProperty({ example: "uuid" })
	@IsString()
	id: string;

	@ApiProperty({ example: "Kelompok A" })
	@IsString()
	nama: string;

	@ApiProperty({ example: "SML" })
	@IsString()
	code: string;

	@ApiProperty({ example: 1 })
	@IsNumber()
	desa_id: number;
}

export class KelompokResponseArrayDto extends ResponseBaseWithArrayDto<PublicKelompokDto> {}
