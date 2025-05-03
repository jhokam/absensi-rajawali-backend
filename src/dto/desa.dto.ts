import { ApiProperty } from "@nestjs/swagger";
import type { Desa } from "@prisma/client";
import { IsNumber, IsString } from "class-validator";
import { ResponseBaseWithArrayDto } from "./response.dto";

export class PublicDesaDto implements Omit<Desa, "created_at" | "updated_at"> {
	@ApiProperty({ example: 1 })
	@IsNumber()
	id: number;

	@ApiProperty({ example: "Sendang Mulyo" })
	@IsString()
	nama: string;
}

export class DesaResponseArrayDto extends ResponseBaseWithArrayDto<PublicDesaDto> {}
