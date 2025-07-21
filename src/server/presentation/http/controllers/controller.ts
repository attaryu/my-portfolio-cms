import type { HTTPRequest } from '../helper/create-http-request';
import type { IResponse } from '../types/response';

export interface IController {
	handle(request: HTTPRequest): Promise<IResponse>;
}
