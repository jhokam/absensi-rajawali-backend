import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { ApiBody, ApiResponse } from "@nestjs/swagger";
import { formatResponse } from "src/helper/response.helper";
import { AuthService } from "./auth.service";

@Controller("auth")
export class AuthController {
	private authService: AuthService;

	constructor(authService: AuthService) {
		this.authService = authService;
	}

	@HttpCode(HttpStatus.OK)
	@Post("login")
	@ApiBody({
		schema: {
			type: "object",
			properties: {
				username: {
					type: "string",
					example: "admin",
				},
				password: {
					type: "string",
					example: "admin",
				},
			},
		},
	})
	@ApiResponse({
		status: 200,
		description: "Login successful.",
		schema: {
			type: "object",
			properties: {
				success: {
					type: "boolean",
					example: true,
				},
				message: {
					type: "string",
					example: "Login successful.",
				},
				error: {
					type: "string",
					nullable: true,
					example: null,
				},
				data: {
					type: "object",
					properties: {
						access_token: {
							type: "string",
							example:
								"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInVzZXJuYW1lIjoiYXppeiIsImlhdCI6MTczOTg5NjgzNSwiZXhwIjoxNzM5OTgzMjM1fQ.MyDMs-w5qhpl2hKzsFCICOmHCHQF0YODwD4Acazkc-c",
						},
					},
				},
			},
		},
	})
	@ApiResponse({
		status: 401,
		schema: {
			type: "object",
			properties: {
				success: {
					type: "boolean",
					example: false,
				},
				message: {
					type: "string",
					example: "Invalid credentials",
				},
				data: {
					type: "string",
					nullable: true,
					example: null,
				},
				error: {
					type: "object",
					properties: {
						response: {
							type: "object",
							properties: {
								message: {
									type: "string",
									example: "Invalid credentials",
								},
								statusCode: {
									type: "integer",
									example: 401,
								},
							},
						},
						status: {
							type: "integer",
							example: 401,
						},
						options: {
							type: "object",
							properties: {},
						},
						message: {
							type: "string",
							example: "Invalid credentials",
						},
						name: {
							type: "string",
							example: "UnauthorizedException",
						},
					},
				},
			},
		},
	})
	async signIn(@Body() signInDto: Record<string, string>) {
		const result = await this.authService.signIn(
			signInDto.username,
			signInDto.password,
		);
		return formatResponse(result, "Login successful.", true, null);
	}
}
