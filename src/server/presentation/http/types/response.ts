interface IErrorResponse {
	statusCode: number;
	status: 'error';
	message: string;
}

interface ISuccessResponse<T = any> {
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
	error?: any;
}

export type IResponse<T = any> =
	| ISuccessResponse<T>
	| IFailResponse
	| IErrorResponse;
