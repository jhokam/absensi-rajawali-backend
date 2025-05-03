import { ApiProperty } from "@nestjs/swagger";
import type { Kelompok } from "@prisma/client";
import { IsNumber, IsString } from "class-validator";
import { ResponseBaseWithArrayDto } from "./response.dto";

export class PublicKelompokDto
	implements Omit<Kelompok, "created_at" | "updated_at">
{
	@ApiProperty({ example: "02a17f23-ca41-45a4-ab12-44652bb0b63d" })
	@IsString()
	id: string;

	@ApiProperty({ example: "Kanguru" })
	@IsString()
	nama: string;

	@ApiProperty({ example: "KGR" })
	@IsString()
	code: string;

	@ApiProperty({ example: 3 })
	@IsNumber()
	desa_id: number;
}

export class KelompokResponseArrayDto extends ResponseBaseWithArrayDto<PublicKelompokDto> {}
