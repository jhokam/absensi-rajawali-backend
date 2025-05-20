import { log } from "console";
import {
	type ArgumentsHost,
	Catch,
	type ExceptionFilter,
	HttpException,
	HttpStatus,
} from "@nestjs/common";
import { formatErrorResponse } from "./helper/response.helper";

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
	catch(exception: any, host: ArgumentsHost) {
		const ctx = host.switchToHttp();
		const response = ctx.getResponse();
		const status =
			exception instanceof HttpException
				? exception.getStatus()
				: HttpStatus.INTERNAL_SERVER_ERROR;

		// Handle nested validation error messages
		const message = exception.response?.message || exception.message;
		const formattedMessage = Array.isArray(message)
			? message.join(", ")
			: message;

		log(exception);
		return response
			.status(status)
			.json(formatErrorResponse(formattedMessage, exception));
	}
}
