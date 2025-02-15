import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { RemajaModule } from './remaja/remaja.module';
import { ProfileModule } from './profile/profile.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
	imports: [RemajaModule, ProfileModule, PrismaModule],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
