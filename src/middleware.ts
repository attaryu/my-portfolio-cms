import { NextRequest, NextResponse } from 'next/server';

import { TokenManager } from './server/infra/services/token-manager';

const tokenManager = new TokenManager();

export default async function middleware(req: NextRequest) {
	const path = req.nextUrl.pathname;

	if (path.startsWith('/dashboard')) {
		const token = req.cookies.get('REFRESH_TOKEN')?.value;

		if (token) {
			try {
				const isValid = await tokenManager.verifyToken(token);

				if (isValid) {
					return NextResponse.next();
				}
			} catch (error) {
				console.error('Token verification failed:', error);
			}
		}

		return NextResponse.redirect(new URL('/login', req.url));
	}

	return NextResponse.next();
}

export const config = {
	matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
