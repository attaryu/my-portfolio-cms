import type { NextRequest } from 'next/server';

import { ClearTopProjectUseCase } from '@/server/app/use-cases/project/implements/clear-top-project';
import { GetTopProjectUseCase } from '@/server/app/use-cases/project/implements/get-top-project';
import { TopProjectUpdateUseCase } from '@/server/app/use-cases/project/implements/top-project-update';

import { prisma } from '@/server/infra/databases/prisma/connection';
import { OwnerRepository } from '@/server/infra/repositories/owner';
import { ProjectRepository } from '@/server/infra/repositories/project';

import { ClearTopProjectController } from '@/server/presentation/http/controllers/project/clear-top-project';
import { GetTopProjectController } from '@/server/presentation/http/controllers/project/get-top-project';
import { TopProjectUpdateController } from '@/server/presentation/http/controllers/project/top-project-update';

import { nextJsAdapter } from '@/server/presentation/http/adapter/next-js-adapter';
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

export async function GET(request: NextRequest) {
	const useCase = new GetTopProjectUseCase(new ProjectRepository(prisma));
	const handle = nextJsAdapter(new GetTopProjectController(useCase));

	return await handle(request);
}

export async function DELETE(request: NextRequest) {
	const useCase = new ClearTopProjectUseCase(new ProjectRepository(prisma));
	const handle = nextJsAdapter(new ClearTopProjectController(useCase), [
		createCheckOwnerAccessTokenMiddleware(),
	]);

	return await handle(request);
}
