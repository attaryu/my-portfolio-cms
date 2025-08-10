import type { NextRequest } from 'next/server';

import { OwnerPublicInfoUpdateUseCase } from '@/server/app/use-cases/owner/implements/public-info-update';

import { prisma } from '@/server/infra/databases/prisma/connection';
import { OwnerRepository } from '@/server/infra/repositories/owner';
import { TokenManager } from '@/server/infra/services/token-manager';

import { nextJsAdapter } from '@/server/presentation/http/adapter/next-js-adapter';
import { OwnerPublicInfoUpdateController } from '@/server/presentation/http/controllers/owner/public-info-update';
import { createCheckOwnerAccessTokenMiddleware } from '@/server/presentation/http/middlewares/composer';

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
