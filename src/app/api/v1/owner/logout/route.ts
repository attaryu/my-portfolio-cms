import { NextRequest, NextResponse } from 'next/server';

import { OwnerLogoutUseCase } from '@/server/app/use-cases/owner/implements/logout';

import { prisma } from '@/server/infra/databases/prisma/connection';
import { OwnerRepository } from '@/server/infra/repositories/owner';
import { TokenManager } from '@/server/infra/services/token-manager';

import { OwnerLogoutController } from '@/server/presentation/http/controllers/owner/logout';
import { createHTTPRequest } from '@/server/presentation/http/helper/create-http-request';

export async function POST(request: NextRequest) {
	const useCase = new OwnerLogoutUseCase(
		new OwnerRepository(prisma),
		new TokenManager()
	);
	const controller = new OwnerLogoutController(useCase);

	const processedRequest = await createHTTPRequest(request);
	const result = await controller.handle(processedRequest);

	if (result.redirect) {
		return NextResponse.redirect(result.redirect);
	}

	if (result.status === 204) {
		return new Response(null, { status: 204 });
	}

	return NextResponse.json(result, { status: result.status });
}
