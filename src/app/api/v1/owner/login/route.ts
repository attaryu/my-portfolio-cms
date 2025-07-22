import type { NextRequest } from 'next/server';

import { OwnerLoginUseCase } from '@/server/app/use-cases/owner/implements/login';

import { prisma } from '@/server/infra/databases/prisma/connection';
import { OwnerRepository } from '@/server/infra/repositories/owner';
import { Hashing } from '@/server/infra/services/hashing';
import { TokenManager } from '@/server/infra/services/token-manager';

import { nextJsAdapter } from '@/server/presentation/http/adapter/next-js-adapter';
import { OwnerLoginController } from '@/server/presentation/http/controllers/owner/login';

export async function POST(request: NextRequest) {
	const useCase = new OwnerLoginUseCase(
		new OwnerRepository(prisma),
		new TokenManager(),
		new Hashing()
	);

	return await nextJsAdapter(new OwnerLoginController(useCase))(request);
}
