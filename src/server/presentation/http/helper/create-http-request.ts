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
		body: await request.json(),
		params: await params,
		cookies: await cookies(),
	};
	
	return processedRequest;
}

export type HTTPRequest = Awaited<ReturnType<typeof createHTTPRequest>>;
