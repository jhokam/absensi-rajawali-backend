import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { AppModule } from "./app.module";
import { HttpExceptionFilter } from "./http-exception.filter";

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	const config = new DocumentBuilder()
		.setTitle("Website Rajawali")
		.setDescription("API Documentation")
		.setVersion("0.1")
		.addServer("http://localhost:8080", "Local Environment")
		.build();
	const documentFactory = () => SwaggerModule.createDocument(app, config);
	SwaggerModule.setup("api", app, documentFactory);

	app.setGlobalPrefix("api");
	app.enableCors();
	app.useGlobalFilters(new HttpExceptionFilter());
	await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
