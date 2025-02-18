import { Module } from "@nestjs/common";
import { APP_INTERCEPTOR } from "@nestjs/core";
import { AuthModule } from "./auth/auth.module";
import { ResponseInterceptor } from "./interceptors/response.interceptor";
import { PrismaModule } from "./prisma/prisma.module";
import { RemajaModule } from "./remaja/remaja.module";
import { UsersModule } from "./users/users.module";

@Module({
	imports: [RemajaModule, PrismaModule, AuthModule, UsersModule],
	providers: [
		{
			provide: APP_INTERCEPTOR,
			useClass: ResponseInterceptor,
		},
	],
})
export class AppModule {}
