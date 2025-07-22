import { NextRequest } from 'next/server';

import { OwnerGetAccessTokenUseCase } from '@/server/app/use-cases/owner/implements/get-access-token';
import { OwnerRepository } from '@/server/infra/repositories/owner';

import { prisma } from '@/server/infra/databases/prisma/connection';
import { TokenManager } from '@/server/infra/services/token-manager';
import { nextJsAdapter } from '@/server/presentation/http/adapter/next-js-adapter';
import { OwnerGetAccessTokenController } from '@/server/presentation/http/controllers/owner/get-access-token';

export async function GET(request: NextRequest) {
	const useCase = new OwnerGetAccessTokenUseCase(
		new OwnerRepository(prisma),
		new TokenManager()
	);

	return await nextJsAdapter(new OwnerGetAccessTokenController(useCase))(
		request
	);
}
