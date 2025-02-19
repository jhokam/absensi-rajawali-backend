import { Module } from "@nestjs/common";
import { AuthModule } from "./auth/auth.module";
import { PrismaModule } from "./prisma/prisma.module";
import { RemajaModule } from "./remaja/remaja.module";
import { UsersModule } from "./users/users.module";

@Module({
	imports: [RemajaModule, PrismaModule, AuthModule, UsersModule],
})
export class AppModule {}
