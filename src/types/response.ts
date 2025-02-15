interface ApiResponse<T> {
	message: string;
	success: boolean;
	errors: string[] | null;
	data: T;
}
