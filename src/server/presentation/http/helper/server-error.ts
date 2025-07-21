import { IResponse } from '../types/response';

export const serverError = (message?: string): IResponse => ({
	status: 500,
	error: message ?? 'An unexpected error occurred',
});
