import type { Remaja } from "@prisma/client";

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

export type PublicRemaja = Omit<Remaja, "password" | "createdAt" | "updatedAt">;

export type RemajaResponse = ResponseBase<PublicRemaja>;
export type RemajaResponseArray = ResponseBaseWithArray<PublicRemaja>;
