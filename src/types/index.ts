import type { Desa, Generus, Kelompok, User } from "@prisma/client";

export type ErrorResponse = {
	response: {
		message: string;
		error: string;
		statusCode: number;
	};
	status: number;
	options: Record<never, never>;
	message: string;
	name: string;
};

export type ResponseBase<T> = {
	success: boolean;
	message: string;
	data: T | null;
	error: Error | null;
};

export type ResponseBaseWithArray<T> = {
	success: boolean;
	message: string;
	error: Error | null;
	data: T[] | null;
};
