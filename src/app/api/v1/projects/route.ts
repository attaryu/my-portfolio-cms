import type { NextRequest } from 'next/server';

import { CreateProjectUseCase } from '@/server/app/use-cases/project/implements/create';

import { prisma } from '@/server/infra/databases/prisma/connection';
import { ProjectRepository } from '@/server/infra/repositories/project';
import { TechRepository } from '@/server/infra/repositories/tech';

import { nextJsAdapter } from '@/server/presentation/http/adapter/next-js-adapter';
import { CreateProjectController } from '@/server/presentation/http/controllers/project/create';
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
