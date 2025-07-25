import type { NextRequest } from 'next/server';

import type { IController } from '@/server/presentation/http/controllers/controller';
import type { HTTPParams, HTTPRequest } from '../helper/create-http-request';
import type { IMiddleware } from '../middlewares/middleware';
import type { IResponse } from '../types/response';

import { NextResponse } from 'next/server';
import { ZodError, flattenError } from 'zod';

import { createHTTPRequest } from '../helper/create-http-request';
import { HttpError } from '../helper/http-error';

export const nextJsAdapter =
	(controller: IController, middlewares: IMiddleware[] = []) =>
	async (request: NextRequest, params?: HTTPParams) => {
		let result: IResponse;

		try {
			const processedRequest = await createHTTPRequest(request, params);

			const runMiddlewareChain = async (
				index: number,
				currentRequest: HTTPRequest
			): Promise<IResponse> => {
				if (index < middlewares.length) {
					return await middlewares[index].handle(
						currentRequest,
						(req: HTTPRequest) => runMiddlewareChain(index + 1, req)
					);
				} else {
					return await controller.handle(currentRequest);
				}
			};

			result = await runMiddlewareChain(0, processedRequest);
		} catch (error) {
			console.error(error);

			result = {
				status_code: 500,
				status: 'error',
				message: 'Internal server error',
			};

			if (error instanceof ZodError) {
				result = {
					status_code: 400,
					status: 'fail',
					message: 'Invalid request data',
					error: flattenError(error).fieldErrors,
				};
			}

			if (error instanceof HttpError) {
				result = {
					status_code: error.statusCode,
					status: 'fail',
					message: error.message,
				};
			}
		}

		if (result.status !== 'error' && result.redirect) {
			return NextResponse.redirect(result.redirect);
		}

		if (result.status_code === 204) {
			return new Response(null, { status: 204 });
		}

		return NextResponse.json(result, { status: result.status_code });
	};
