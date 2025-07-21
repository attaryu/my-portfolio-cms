export interface IResponse<T = any> {
	status: number;
	data?: T;
	redirect?: string;
	error?: string;
}
