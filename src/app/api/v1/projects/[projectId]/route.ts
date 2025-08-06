import type { NextRequest } from 'next/server';

import type { HTTPParams } from '@/server/presentation/http/helper/create-http-request';

import { GetProjectUseCase } from '@/server/app/use-cases/project/implements/get';

import { prisma } from '@/server/infra/databases/prisma/connection';
import { ProjectRepository } from '@/server/infra/repositories/project';

import { nextJsAdapter } from '@/server/presentation/http/adapter/next-js-adapter';
import { GetProjectController } from '@/server/presentation/http/controllers/project/get';

export async function GET(request: NextRequest, params: HTTPParams) {
	const useCase = new GetProjectUseCase(new ProjectRepository(prisma));
	return await nextJsAdapter(new GetProjectController(useCase))(
		request,
		params
	);
}
