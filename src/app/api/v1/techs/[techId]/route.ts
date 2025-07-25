import type { NextRequest } from 'next/server';

import type { HTTPParams } from '@/server/presentation/http/helper/create-http-request';

import { GetTechUseCase } from '@/server/app/use-cases/techs/implements/get';
import { UpdateTechUseCase } from '@/server/app/use-cases/techs/implements/update';
import { prisma } from '@/server/infra/databases/prisma/connection';
import { TechRepository } from '@/server/infra/repositories/tech';
import { GetTechController } from '@/server/presentation/http/controllers/tech/get';
import { UpdateTechController } from '@/server/presentation/http/controllers/tech/update';

import { nextJsAdapter } from '@/server/presentation/http/adapter/next-js-adapter';

export async function GET(request: NextRequest, params: HTTPParams) {
	const useCase = new GetTechUseCase(new TechRepository(prisma));
	return await nextJsAdapter(new GetTechController(useCase))(request, params);
}

export async function PUT(request: NextRequest, params: HTTPParams) {
	const useCase = new UpdateTechUseCase(new TechRepository(prisma));

	return await nextJsAdapter(new UpdateTechController(useCase))(
		request,
		params
	);
}
