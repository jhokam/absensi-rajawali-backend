import { Module } from "@nestjs/common";
import { AuthModule } from "./auth/auth.module";
import { DesaModule } from "./desa/desa.module";
import { EventModule } from "./event/event.module";
import { GenerusModule } from "./generus/generus.module";
import { KelompokModule } from "./kelompok/kelompok.module";
import { LogModule } from "./log/log.module";
import { PresentionModule } from "./presention/presention.module";
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
		LogModule,
		PresentionModule,
		EventModule,
	],
	providers: [ProfileService],
	controllers: [ProfileController],
})
export class AppModule {}
