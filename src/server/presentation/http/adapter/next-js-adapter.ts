import type { NextRequest } from 'next/server';

import type { IController } from '@/server/presentation/http/controllers/controller';
import type { HTTPParams } from '../helper/create-http-request';

import { NextResponse } from 'next/server';

import { createHTTPRequest } from '../helper/create-http-request';
import { HttpError } from '../helper/http-error';
import { IResponse } from '../types/response';

export const nextJsAdapter =
	(controller: IController) =>
	async (request: NextRequest, params?: HTTPParams) => {
		let result: IResponse;

		try {
			result = await controller.handle(
				await createHTTPRequest(request, params)
			);
		} catch (error) {
			if (error instanceof HttpError) {
				result = {
					statusCode: error.statusCode,
					status: 'fail',
					message: error.message,
				};
			}

			result = {
				statusCode: 500,
				status: 'error',
				message: 'Internal server error',
			};
		}

		if (result.status !== 'error' && result.redirect) {
			return NextResponse.redirect(result.redirect);
		}

		if (result.statusCode === 204) {
			return new Response(null, { status: 204 });
		}

		return NextResponse.json(result, { status: result.statusCode });
	};
