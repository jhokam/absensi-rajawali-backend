import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";
import { ResponseBaseDto } from "./response.dto";

export class AuthDto {
	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	username: string;

	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	password: string;
}

export class TokenDto {
	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	accessToken: string;
}

export class AuthResponseDto extends ResponseBaseDto<TokenDto> {}
