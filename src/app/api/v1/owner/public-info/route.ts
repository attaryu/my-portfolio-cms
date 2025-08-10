import type { NextRequest } from 'next/server';

import { GetOwnerPublicInfoUseCase } from '@/server/app/use-cases/owner/implements/get-public-info';
import { OwnerPublicInfoUpdateUseCase } from '@/server/app/use-cases/owner/implements/public-info-update';

import { prisma } from '@/server/infra/databases/prisma/connection';
import { OwnerRepository } from '@/server/infra/repositories/owner';
import { TokenManager } from '@/server/infra/services/token-manager';
import { GetOwnerPublicInfoController } from '@/server/presentation/http/controllers/owner/get-public-info';
import { OwnerPublicInfoUpdateController } from '@/server/presentation/http/controllers/owner/public-info-update';
import { createCheckOwnerAccessTokenMiddleware } from '@/server/presentation/http/middlewares/composer';

import { nextJsAdapter } from '@/server/presentation/http/adapter/next-js-adapter';

export async function PUT(request: NextRequest) {
	const useCase = new OwnerPublicInfoUpdateUseCase(
		new OwnerRepository(prisma),
		new TokenManager()
	);
	const handler = nextJsAdapter(new OwnerPublicInfoUpdateController(useCase), [
		createCheckOwnerAccessTokenMiddleware(),
	]);

	return await handler(request);
}

export async function GET(request: NextRequest) {
	const useCase = new GetOwnerPublicInfoUseCase(new OwnerRepository(prisma));
	const handler = nextJsAdapter(new GetOwnerPublicInfoController(useCase));

	return await handler(request);
}
