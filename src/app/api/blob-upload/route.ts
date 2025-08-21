import type { HandleUploadBody } from '@vercel/blob/client';
import type { NextRequest } from 'next/server';

import { del } from '@vercel/blob';
import { handleUpload } from '@vercel/blob/client';
import { NextResponse } from 'next/server';

import { HttpError } from '@/server/presentation/http/helper/http-error';

export async function POST(request: NextRequest): Promise<NextResponse> {
	const body = (await request.json()) as HandleUploadBody;

	try {
		const jsonResponse = await handleUpload({
			body,
			request,
			onBeforeGenerateToken: async (_pathname) => {
				// implement access token check in the future

				return {
					allowedContentTypes: [
						'image/jpeg',
						'image/png',
						'image/webp',
						'image/jpg',
					],
					addRandomSuffix: true,
				};
			},
			onUploadCompleted: async () => {
				// do nothing
			},
		});

		return NextResponse.json(jsonResponse);
	} catch (error) {
		if (error instanceof HttpError) {
			return NextResponse.json(
				{
					status_code: error.statusCode,
					status: 'fail',
					message: error.message,
				},
				{ status: error.statusCode }
			);
		}

		return NextResponse.json(
			{ error: (error as Error).message },
			{ status: 400 } // The webhook will retry 5 times waiting for a 200
		);
	}
}

export async function DELETE(request: NextRequest): Promise<NextResponse> {
	const urlToDelete = request.nextUrl.searchParams.get('blob-url');
	await del(urlToDelete as string);

	return NextResponse.json({ success: true });
}
