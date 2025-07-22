export interface IResponse<T = any> {
	status: number;
	message?: string;
	data?: T;
	redirect?: string;
	error?: string;
}
