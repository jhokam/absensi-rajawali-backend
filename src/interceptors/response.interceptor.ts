import {
	type CallHandler,
	type ExecutionContext,
	HttpException,
	HttpStatus,
	Injectable,
	type NestInterceptor,
	UnauthorizedException,
} from "@nestjs/common";
import { type Observable, catchError, map, throwError } from "rxjs";

export type Response<T> = {
	success: boolean;
	message: string;
	error: any | null; // Modified type to 'any' to accommodate different error structures
	data: T | null;
};

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, Response<T>> {
	intercept(
		context: ExecutionContext,
		next: CallHandler,
	): Observable<Response<T>> {
		return next.handle().pipe(
			map((data) => ({
				success: true,
				message: "Data successfully fetched",
				error: null,
				data: data,
			})),
			catchError((error) => {
				let message = "Internal Server Error";
				let status = HttpStatus.INTERNAL_SERVER_ERROR;
				let errorResponse: any = error; // Default error response

				if (error instanceof UnauthorizedException) {
					status = HttpStatus.UNAUTHORIZED;
					message = "Unauthorized access";
					errorResponse = {
						statusCode: HttpStatus.UNAUTHORIZED,
						message: "Unauthorized access",
						error: "Authentication failed",
					};
				} else if (error instanceof HttpException) {
					status = error.getStatus();
					message = error.message;
					errorResponse = {
						statusCode: error.getStatus(),
						message: error.message,
						error: error.name, // Include the error name
					};
				} else if (error instanceof Error) {
					message = error.message;
					errorResponse = {
						message: error.message,
						error: "Internal Server Error",
					};
				}

				return throwError(() => ({
					success: false,
					message: message,
					error: errorResponse,
					data: null, // Ensure data is null on error
				}));
			}),
		);
	}
}
