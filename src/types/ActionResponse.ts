import { ZodError } from 'zod';

export type ActionResponse<TData, TPayload> = {
	message: string;
	data?: TData;
	errors?: ZodError<TPayload> | string;
	statusCode?: number;
};
