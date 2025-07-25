import type { NextRequest } from 'next/server';

import { prisma } from '@/server/infra/databases/prisma/connection';

import { TechRepository } from '@/server/infra/repositories/tech';

import { nextJsAdapter } from '@/server/presentation/http/adapter/next-js-adapter';

import { GetAllTechsUseCase } from '@/server/app/use-cases/techs/implements/get-all';
import { GetAllTechsController } from '@/server/presentation/http/controllers/tech/get-all';

import { CreateTechUseCase } from '@/server/app/use-cases/techs/implements/create';
import { CreateTechController } from '@/server/presentation/http/controllers/tech/create';

import { MultipleDeleteTechsUseCase } from '@/server/app/use-cases/techs/implements/multiple-delete';
import { MultipleDeleteTechsController } from '@/server/presentation/http/controllers/tech/multiple-delete';
import { createCheckOwnerAccessTokenMiddleware } from '@/server/presentation/http/middlewares/composer';

export async function GET(request: NextRequest) {
	const useCase = new GetAllTechsUseCase(new TechRepository(prisma));
	return await nextJsAdapter(new GetAllTechsController(useCase))(request);
}

export async function POST(request: NextRequest) {
	const useCase = new CreateTechUseCase(new TechRepository(prisma));

	return await nextJsAdapter(new CreateTechController(useCase), [
		createCheckOwnerAccessTokenMiddleware(),
	])(request);
}

export async function DELETE(request: NextRequest) {
	const useCase = new MultipleDeleteTechsUseCase(new TechRepository(prisma));

	return await nextJsAdapter(new MultipleDeleteTechsController(useCase), [
		createCheckOwnerAccessTokenMiddleware(),
	])(request);
}
