import type { NextRequest } from 'next/server';

import { CreateProjectUseCase } from '@/server/app/use-cases/project/implements/create';
import { GetAllProjectsUseCase } from '@/server/app/use-cases/project/implements/get-all';

import { prisma } from '@/server/infra/databases/prisma/connection';
import { ProjectRepository } from '@/server/infra/repositories/project';
import { TechRepository } from '@/server/infra/repositories/tech';

import { nextJsAdapter } from '@/server/presentation/http/adapter/next-js-adapter';
import { CreateProjectController } from '@/server/presentation/http/controllers/project/create';
import { GetAllProjectsController } from '@/server/presentation/http/controllers/project/get-all';
import { createCheckOwnerAccessTokenMiddleware } from '@/server/presentation/http/middlewares/composer';

export async function POST(request: NextRequest) {
	const userCase = new CreateProjectUseCase(
		new ProjectRepository(prisma),
		new TechRepository(prisma)
	);

	return await nextJsAdapter(new CreateProjectController(userCase), [
		createCheckOwnerAccessTokenMiddleware(),
	])(request);
}

export async function GET(request: NextRequest) {
	const useCase = new GetAllProjectsUseCase(new ProjectRepository(prisma));
	return await nextJsAdapter(new GetAllProjectsController(useCase))(request);
}
