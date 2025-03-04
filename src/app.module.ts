import { Module } from "@nestjs/common";
import { AuthModule } from "./auth/auth.module";
import { GenerusModule } from "./generus/generus.module";
import { PrismaModule } from "./prisma/prisma.module";
import { ProfileController } from "./profile/profile.controller";
import { ProfileModule } from "./profile/profile.module";
import { ProfileService } from "./profile/profile.service";
import { UsersModule } from "./users/users.module";

@Module({
	imports: [
		GenerusModule,
		PrismaModule,
		AuthModule,
		UsersModule,
		ProfileModule,
	],
	providers: [ProfileService],
	controllers: [ProfileController],
})
export class AppModule {}
