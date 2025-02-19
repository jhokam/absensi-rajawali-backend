import {
	Controller,
	Get,
	NotFoundException,
	Req,
	UseGuards,
} from "@nestjs/common";
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

		return formatResponse(user, "Profile retrieved successfully", true, null);
	}
}
