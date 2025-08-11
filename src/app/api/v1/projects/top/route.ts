import type { NextRequest } from 'next/server';

import { TopProjectUpdateUseCase } from '@/server/app/use-cases/project/implements/top-project-update';

import { prisma } from '@/server/infra/databases/prisma/connection';
import { OwnerRepository } from '@/server/infra/repositories/owner';
import { ProjectRepository } from '@/server/infra/repositories/project';

import { nextJsAdapter } from '@/server/presentation/http/adapter/next-js-adapter';
import { TopProjectUpdateController } from '@/server/presentation/http/controllers/project/top-project-update';
import { createCheckOwnerAccessTokenMiddleware } from '@/server/presentation/http/middlewares/composer';

export async function PUT(request: NextRequest) {
	const useCase = new TopProjectUpdateUseCase(
		new ProjectRepository(prisma),
		new OwnerRepository(prisma)
	);

	const handle = nextJsAdapter(new TopProjectUpdateController(useCase), [
		createCheckOwnerAccessTokenMiddleware(),
	]);

	return await handle(request);
}
