import { Module } from "@nestjs/common";
import { AuthModule } from "./auth/auth.module";
import { DesaModule } from "./desa/desa.module";
import { GenerusModule } from "./generus/generus.module";
import { KelompokModule } from "./kelompok/kelompok.module";
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
		DesaModule,
		KelompokModule,
	],
	providers: [ProfileService],
	controllers: [ProfileController],
})
export class AppModule {}
