import type { NextRequest } from 'next/server';

import { errors, jwtVerify } from 'jose';
import { NextResponse } from 'next/server';

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

const protectedRoutes: [string, HttpMethod[]][] = [['/api/v1/techs', ['POST']]];

export default async function middleware(request: NextRequest) {
	if (
		protectedRoutes.some(([route, methods]) => {
			return (
				request.nextUrl.pathname.startsWith(route) &&
				methods.includes(request.method as HttpMethod)
			);
		})
	) {
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
