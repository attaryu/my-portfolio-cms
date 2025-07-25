import type { HTTPRequest } from '../helper/create-http-request';
import type { IResponse } from '../types/response';

export type Next = (request: HTTPRequest) => Promise<IResponse>;

export interface IMiddleware {
	handle(request: HTTPRequest, next: Next): Promise<IResponse>;
}
