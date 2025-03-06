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

export type PublicDesa = Omit<Desa, "created_at" | "updated_at">;
export type PublicKelompok = Omit<Kelompok, "created_at" | "updated_at">;
export type PublicGenerus = Omit<Generus, "created_at" | "updated_at">;
export type PublicUser = Omit<User, "created_at" | "updated_at" | "password">;

export type GenerusResponse = ResponseBase<PublicGenerus>;
export type GenerusResponseArray = ResponseBaseWithArray<PublicGenerus>;
