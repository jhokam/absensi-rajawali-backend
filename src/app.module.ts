import { Module } from "@nestjs/common";
import { AuthModule } from "./auth/auth.module";
import { PrismaModule } from "./prisma/prisma.module";
import { RemajaModule } from "./remaja/remaja.module";
import { UsersModule } from "./users/users.module";
import { ProfileService } from './profile/profile.service';
import { ProfileController } from './profile/profile.controller';
import { ProfileModule } from './profile/profile.module';

@Module({
	imports: [RemajaModule, PrismaModule, AuthModule, UsersModule, ProfileModule],
	providers: [ProfileService],
	controllers: [ProfileController],
})
export class AppModule {}
