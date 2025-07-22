import type { NextRequest } from 'next/server';

import type { IController } from '@/server/presentation/http/controllers/controller';
import type { HTTPParams } from '../helper/create-http-request';

import { NextResponse } from 'next/server';

import { createHTTPRequest } from '../helper/create-http-request';

export const nextJsAdapter =
	(controller: IController) =>
	async (request: NextRequest, params?: HTTPParams) => {
		const result = await controller.handle(
			await createHTTPRequest(request, params)
		);

		if (result.redirect) {
			return NextResponse.redirect(result.redirect);
		}

		if (result.status === 204) {
			return new Response(null, { status: 204 });
		}

		return NextResponse.json(result, { status: result.status });
	};
