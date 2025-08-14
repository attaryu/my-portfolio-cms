import type { NextRequest } from 'next/server';

import { UpdateOwnerCredentialUseCase } from '@/server/app/use-cases/owner/implements/update-credential';

import { prisma } from '@/server/infra/databases/prisma/connection';
import { OwnerRepository } from '@/server/infra/repositories/owner';
import { Hashing } from '@/server/infra/services/hashing';

import { IUpdateOwnerCredentialController } from '@/server/presentation/http/controllers/owner/update-credential';

import { nextJsAdapter } from '@/server/presentation/http/adapter/next-js-adapter';
import { createCheckOwnerAccessTokenMiddleware } from '@/server/presentation/http/middlewares/composer';

export async function PATCH(request: NextRequest) {
	const useCase = new UpdateOwnerCredentialUseCase(
		new OwnerRepository(prisma),
		new Hashing()
	);
	const handler = nextJsAdapter(new IUpdateOwnerCredentialController(useCase), [
		createCheckOwnerAccessTokenMiddleware(),
	]);

	return await handler(request);
}
