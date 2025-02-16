import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "./auth/auth.module";
import { PrismaModule } from "./prisma/prisma.module";
import { RemajaModule } from "./remaja/remaja.module";
import { UsersModule } from "./users/users.module";

@Module({
	imports: [RemajaModule, PrismaModule, AuthModule, UsersModule],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
