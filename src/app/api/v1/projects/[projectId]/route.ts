import type { NextRequest } from 'next/server';

import type { HTTPParams } from '@/server/presentation/http/helper/create-http-request';

import { DeleteProjectUseCase } from '@/server/app/use-cases/project/implements/delete';
import { GetProjectUseCase } from '@/server/app/use-cases/project/implements/get';
import { UpdateProjectUseCase } from '@/server/app/use-cases/project/implements/update';

import { prisma } from '@/server/infra/databases/prisma/connection';
import { ProjectRepository } from '@/server/infra/repositories/project';
import { TechRepository } from '@/server/infra/repositories/tech';

import { nextJsAdapter } from '@/server/presentation/http/adapter/next-js-adapter';
import { DeleteProjectController } from '@/server/presentation/http/controllers/project/delete';
import { GetProjectController } from '@/server/presentation/http/controllers/project/get';
import { UpdateProjectController } from '@/server/presentation/http/controllers/project/update';
import { createCheckOwnerAccessTokenMiddleware } from '@/server/presentation/http/middlewares/composer';

export async function GET(request: NextRequest, params: HTTPParams) {
	const useCase = new GetProjectUseCase(new ProjectRepository(prisma));
	return await nextJsAdapter(new GetProjectController(useCase))(
		request,
		params
	);
}

export async function PUT(request: NextRequest, params: HTTPParams) {
	const useCase = new UpdateProjectUseCase(
		new ProjectRepository(prisma),
		new TechRepository(prisma)
	);

	return await nextJsAdapter(new UpdateProjectController(useCase), [
		createCheckOwnerAccessTokenMiddleware(),
	])(request, params);
}

export async function DELETE(request: NextRequest, params: HTTPParams) {
	const useCase = new DeleteProjectUseCase(new ProjectRepository(prisma));

	return await nextJsAdapter(new DeleteProjectController(useCase), [
		createCheckOwnerAccessTokenMiddleware(),
	])(request, params);
}
