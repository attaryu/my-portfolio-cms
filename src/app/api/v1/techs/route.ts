import type { NextRequest } from 'next/server';

import { GetAllTechsUseCase } from '@/server/app/use-cases/techs/implements/get-all';
import { prisma } from '@/server/infra/databases/prisma/connection';
import { TechRepository } from '@/server/infra/repositories/tech';
import { GetAllTechsController } from '@/server/presentation/http/controllers/tech/get-all';

import { CreateTechUseCase } from '@/server/app/use-cases/techs/implements/create';
import { nextJsAdapter } from '@/server/presentation/http/adapter/next-js-adapter';
import { CreateTechController } from '@/server/presentation/http/controllers/tech/create';

export async function GET(request: NextRequest) {
	const useCase = new GetAllTechsUseCase(new TechRepository(prisma));
	return await nextJsAdapter(new GetAllTechsController(useCase))(request);
}

export async function POST(request: NextRequest) {
	const useCase = new CreateTechUseCase(new TechRepository(prisma));
	return await nextJsAdapter(new CreateTechController(useCase))(request);
}
