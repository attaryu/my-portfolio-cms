interface IErrorResponse {
	statusCode: number;
	status: 'error';
	message: string;
}

interface ISuccessResponse<T> {
	statusCode: number;
	status: 'success';
	message: string;
	data?: T;
	redirect?: string;
	pagination?: {
		page: number;
		limit: number;
		total: number;
		pages: number;
	};
}

interface IFailResponse {
	statusCode: number;
	status: 'fail';
	message: string;
	redirect?: string;
	error?: unknown;
}

export type IResponse<T = unknown> =
	| ISuccessResponse<T>
	| IFailResponse
	| IErrorResponse;
