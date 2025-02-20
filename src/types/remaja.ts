import type { Remaja } from "@prisma/client";

export type ResponseBase<T> = {
	success: boolean;
	message: string;
	errors: any | null;
	data: T;
};

export type ResponseBaseWithArray<T> = {
	success: boolean;
	message: string;
	errors: any | null;
	data: T[];
};

export type PublicRemaja = Omit<Remaja, "password" | "createdAt" | "updatedAt">;

export type RemajaResponse = ResponseBase<Remaja>;
export type RemajaResponseArray = ResponseBaseWithArray<Remaja>;
