import { log } from "console";
import { ClassSerializerInterceptor, ValidationPipe } from "@nestjs/common";
import { NestFactory, Reflector } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { AppModule } from "./app.module";
import { HttpExceptionFilter } from "./http-exception.filter";

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	const port = process.env.PORT ?? 3000;
	log(process.env.PORT);
	const config = new DocumentBuilder()
		.setTitle("Website Rajawali")
		.setDescription("API Documentation")
		.setVersion("0.1")
		.addServer(`http://localhost:${port}`, "Local Environment")
		.addBearerAuth()
		.build();
	const documentFactory = () => SwaggerModule.createDocument(app, config);
	SwaggerModule.setup("api", app, documentFactory);

	app.setGlobalPrefix("api");
	app.enableCors();
	app.useGlobalFilters(new HttpExceptionFilter());
	app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
	app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
	await app.listen(port);
}
bootstrap();
