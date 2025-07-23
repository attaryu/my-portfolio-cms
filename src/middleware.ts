import type { MiddlewareConfig, NextRequest } from 'next/server';

import { jwtVerify } from 'jose';
import { NextResponse } from 'next/server';

export default async function middleware(request: NextRequest) {
	if (request.nextUrl.pathname.startsWith('/api/v1/owner/test')) {
		try {
			const accessToken = request.cookies.get('ACCESS_TOKEN')?.value;

			if (!accessToken) {
				return NextResponse.json(
					{
						statusCode: 401,
						status: 'fail',
						message: 'Access token is missing',
					},
					{ status: 401 }
				);
			}

			await jwtVerify(
				accessToken,
				new TextEncoder().encode(process.env.JWT_SECRET ?? '')
			);
		} catch (error) {
			console.error('JWT verification error:', error);

			if (error instanceof Error && error.message.includes('invalid')) {
				return NextResponse.json(
					{
						statusCode: 401,
						status: 'fail',
						message: 'Invalid access token',
					},
					{ status: 401 }
				);
			}

			return NextResponse.json(
				{
					statusCode: 500,
					status: 'error',
					message: 'Internal server error',
				},
				{ status: 500 }
			);
		}
	}

	return NextResponse.next();
}

export const config: MiddlewareConfig = {
	matcher: ['/api/v1/owner/test'],
};
