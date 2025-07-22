import { NextRequest } from 'next/server';

import { OwnerLogoutUseCase } from '@/server/app/use-cases/owner/implements/logout';

import { prisma } from '@/server/infra/databases/prisma/connection';
import { OwnerRepository } from '@/server/infra/repositories/owner';
import { TokenManager } from '@/server/infra/services/token-manager';

import { nextJsAdapter } from '@/server/presentation/http/adapter/next-js-adapter';
import { OwnerLogoutController } from '@/server/presentation/http/controllers/owner/logout';

export async function POST(request: NextRequest) {
	const useCase = new OwnerLogoutUseCase(
		new OwnerRepository(prisma),
		new TokenManager()
	);

	return await nextJsAdapter(new OwnerLogoutController(useCase))(request);
}
