import { IsNumberString, IsOptional, IsString } from "class-validator";

export class FilterKelompokDto {
	@IsString()
	nama: string;

	@IsNumberString()
	@IsOptional()
	desa_id: string;
}
