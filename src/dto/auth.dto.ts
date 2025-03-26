import { IsNotEmpty, IsString } from "class-validator";
import { ResponseBaseDto } from "./response.dto";

export class AuthDto {
	@IsNotEmpty()
	@IsString()
	username: string;

	@IsNotEmpty()
	@IsString()
	password: string;
}

export class TokenDto {
	@IsNotEmpty()
	@IsString()
	accessToken: string;
}

export class AuthResponseDto extends ResponseBaseDto<TokenDto> {}
