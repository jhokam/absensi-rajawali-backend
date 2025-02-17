import {
	type CallHandler,
	type ExecutionContext,
	HttpException,
	HttpStatus,
	Injectable,
	type NestInterceptor,
} from "@nestjs/common";
import { type Observable, catchError, map, throwError } from "rxjs";

export type Response<T> = {
	success: boolean;
	message: string;
	error: T | null;
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

				if (error instanceof HttpException) {
					status = error.getStatus();
					message = error.message;
				} else if (error instanceof Error) {
					message = error.message;
				}

				return throwError(() => ({
					success: false,
					message: message,
					error: error,
				}));
			}),
		);
	}
}
