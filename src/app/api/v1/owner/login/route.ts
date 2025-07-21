import type { NextRequest } from 'next/server';

import { NextResponse } from 'next/server';

import { OwnerLoginUseCase } from '@/server/app/use-cases/owner/implements/login';

import { prisma } from '@/server/infra/databases/prisma/connection';
import { OwnerRepository } from '@/server/infra/repositories/owner';
import { Hashing } from '@/server/infra/services/hashing';
import { TokenManager } from '@/server/infra/services/token-manager';

import { OwnerLoginController } from '@/server/presentation/http/controllers/owner/login';
import { createHTTPRequest } from '@/server/presentation/http/helper/create-http-request';

export async function POST(request: NextRequest) {
	const useCase = new OwnerLoginUseCase(
		new OwnerRepository(prisma),
		new TokenManager(),
		new Hashing()
	);
	const controller = new OwnerLoginController(useCase);

	const processedRequest = await createHTTPRequest(request);
	const result = await controller.handle(processedRequest);

	if (result.redirect) {
		return NextResponse.redirect(result.redirect);
	}

	return NextResponse.json(result, { status: result.status });
}
