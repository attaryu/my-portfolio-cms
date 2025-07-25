import type { NextRequest } from 'next/server';

import type { HTTPParams } from '@/server/presentation/http/helper/create-http-request';

import { GetTechUseCase } from '@/server/app/use-cases/techs/implements/get';
import { prisma } from '@/server/infra/databases/prisma/connection';
import { TechRepository } from '@/server/infra/repositories/tech';
import { nextJsAdapter } from '@/server/presentation/http/adapter/next-js-adapter';
import { GetTechController } from '@/server/presentation/http/controllers/tech/get';

export async function GET(request: NextRequest, params: HTTPParams) {
	const useCase = new GetTechUseCase(new TechRepository(prisma));
	return await nextJsAdapter(new GetTechController(useCase))(request, params);
}
