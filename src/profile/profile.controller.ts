import {
	Controller,
	Get,
	NotFoundException,
	Req,
	UseGuards,
} from "@nestjs/common";
import {
	ApiOkResponse,
	ApiResponse,
	ApiUnauthorizedResponse,
} from "@nestjs/swagger";
import { AuthGuard } from "../auth/auth.guard";
import { formatResponse } from "../helper/response.helper";
import { PrismaService } from "../prisma/prisma.service";
import { ProfileService } from "./profile.service";

interface RequestWithUser extends Request {
	user: {
		sub: number;
		username: string;
		role: string;
	};
}

@Controller("profile")
@UseGuards(AuthGuard)
export class ProfileController {
	private profileService: ProfileService;
	private prismaService: PrismaService;

	constructor(profileService: ProfileService, prismaService: PrismaService) {
		this.profileService = profileService;
		this.prismaService = prismaService;
	}

	@ApiOkResponse({
		description: "Profile retrieved successfully",
		schema: {
			type: "object",
			properties: {
				success: {
					type: "boolean",
					example: true,
				},
				message: {
					type: "string",
					example: "Profile retrieved successfully",
				},
				data: {
					type: "object",
					properties: {
						id: {
							type: "integer",
							example: 1,
						},
						nama: {
							type: "string",
							example: "Jane Doe",
						},
						username: {
							type: "string",
							example: "abdul",
						},
						jenis_kelamin: {
							type: "string",
							example: "Laki_Laki",
						},
						alamat: {
							type: "string",
							example: "Jl. Sendangsari Utara XV No. 27",
						},
						jenjang: {
							type: "string",
							example: "Remaja",
						},
						role: {
							type: "string",
							example: "User",
						},
						sambung: {
							type: "string",
							example: "Aktif",
						},
					},
				},
				error: {
					type: "string",
					nullable: true,
					example: null,
				},
			},
		},
	})
	@ApiUnauthorizedResponse({
		schema: {
			type: "object",
			properties: {
				success: {
					type: "boolean",
					example: false,
				},
				message: {
					type: "string",
					example: "Unauthorized",
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
									example: "Unauthorized",
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
							example: "Unauthorized",
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
					example: "User not found",
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
									example: "User not found",
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
							example: "User not found",
						},
						name: {
							type: "string",
							example: "NotFoundException",
						},
					},
				},
			},
		},
	})
	@Get()
	async getProfile(@Req() req: RequestWithUser) {
		const user = await this.prismaService.remaja.findUnique({
			where: {
				id: req.user.sub,
			},
			select: {
				id: true,
				nama: true,
				username: true,
				jenis_kelamin: true,
				alamat: true,
				jenjang: true,
				role: true,
				sambung: true,
			},
		});

		if (!user) {
			throw new NotFoundException("User not found");
		}

		return formatResponse(true, "Profile retrieved successfully", user, null);
	}
}
