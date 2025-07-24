import type { MiddlewareConfig, NextRequest } from 'next/server';

import { errors, jwtVerify } from 'jose';
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

			const { payload } = await jwtVerify(
				accessToken,
				new TextEncoder().encode(process.env.JWT_SECRET ?? '')
			);

			if (payload.token_type !== 'access') {
				return NextResponse.json(
					{
						statusCode: 401,
						status: 'fail',
						message: 'Invalid access token',
					},
					{ status: 401 }
				);
			}
		} catch (error) {
			console.error(error);

			if (error instanceof errors.JWSInvalid) {
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
