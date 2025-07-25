import type { NextRequest } from 'next/server';

import { cookies, headers } from 'next/headers';

export interface HTTPParams {
	params: Promise<Record<string, string>>;
}

export async function createHTTPRequest(
	request: NextRequest,
	{ params }: HTTPParams = {
		params: Promise.resolve({}),
	}
) {
	const processedRequest = {
		...request,
		headers: await headers(),
		params: await params,
		cookies: await cookies(),
		body: {} as any,
		url: request.nextUrl,
	};

	if (
		request.method === 'POST' ||
		request.method === 'PUT' ||
		request.method === 'PATCH' ||
		request.method === 'DELETE'
	) {
		const body = await request.json().catch(() => ({}));
		processedRequest.body = body;
	}

	return processedRequest;
}

export type HTTPRequest = Awaited<ReturnType<typeof createHTTPRequest>>;
