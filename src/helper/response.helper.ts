import type { ResponseBase } from "src/types";

export function formatResponse<T>(
	success: boolean,
	message: string,
	data: T | null,
	error: any | null = null,
): ResponseBase<T> {
	return {
		success,
		message,
		data,
		error,
	};
}

export function formatErrorResponse(
	message: string,
	error: any = null,
): ResponseBase<null> {
	return formatResponse(false, message, null, error);
}
