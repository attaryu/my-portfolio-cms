interface IErrorResponse {
	statusCode: number;
	status: 'error';
	message: string;
	error?: string;
}

interface ISuccessResponse<T = any> {
	statusCode: number;
	status: 'success';
	message: string;
	data?: T;
	redirect?: string;
}

interface IFailResponse {
	statusCode: number;
	status: 'fail';
	message: string;
	redirect?: string;
}

export type IResponse<T = any> =
	| ISuccessResponse<T>
	| IFailResponse
	| IErrorResponse;
