export interface ApiResponse<T> {
	success: boolean;
	message: string;
	data: T | null;
	error: any | null;
}

export function formatResponse<T>(
	data: T | null,
	message: string,
	success: boolean,
	error: any | null = null,
): ApiResponse<T> {
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
): ApiResponse<null> {
	return formatResponse(null, message, false, error);
}
