import {
	type ArgumentsHost,
	Catch,
	type ExceptionFilter,
} from "@nestjs/common";
import { formatErrorResponse } from "./helper/response.helper";
import type { ErrorResponse } from "./types/remaja";

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
	catch(exception: ErrorResponse, host: ArgumentsHost) {
		const ctx = host.switchToHttp();
		const response = ctx.getResponse();
		response.json(formatErrorResponse(exception.message, exception));
	}
}
