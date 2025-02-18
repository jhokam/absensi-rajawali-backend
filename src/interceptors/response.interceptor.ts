import {
	type CallHandler,
	type ExecutionContext,
	Injectable,
	type NestInterceptor,
} from "@nestjs/common";
import { type Observable, catchError, map, throwError } from "rxjs";

export interface Response<T> {
	success: boolean;
	message: string;
	error: any | null;
	data: T | null;
}

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, Response<T>> {
	intercept(
		_context: ExecutionContext,
		next: CallHandler,
	): Observable<Response<T>> {
		return next.handle().pipe(
			map((response) => {
				let data = response;
				let message = "Data successfully fetched"; // Default message

				if (
					response &&
					typeof response === "object" &&
					"access_token" in response
				) {
					data = { access_token: response.access_token };
					if (response.message) {
						message = response.message; // Use custom message
					}
				}

				return {
					success: true,
					message: message,
					error: null,
					data: data,
				};
			}),
			catchError((error) => {
				return throwError(() => ({
					success: false,
					message: error.message || "Internal Server Error",
					error: error,
					data: null,
				}));
			}),
		);
	}
}
