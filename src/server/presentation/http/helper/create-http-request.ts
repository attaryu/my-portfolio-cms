import type { NextRequest } from 'next/server';

import { cookies, headers } from 'next/headers';

export async function createHTTPRequest(
	request: NextRequest,
	{ params }: { params: Promise<Record<string, string>> } = {
		params: Promise.resolve({}),
	}
) {
	const processedRequest = {
		...request,
		headers: await headers(),
		params: await params,
		cookies: await cookies(),
		body: {} as any,
	};

	if (
		request.method === 'POST' ||
		request.method === 'PUT' ||
		request.method === 'PATCH'
	) {
		const body = await request.json().catch(() => ({}));
		processedRequest.body = body;
	}

	return processedRequest;
}

export type HTTPRequest = Awaited<ReturnType<typeof createHTTPRequest>>;
