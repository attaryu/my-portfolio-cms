import type { HTTPParams } from '@/server/presentation/http/helper/create-http-request';
import type { NextRequest } from 'next/server';

import { prisma } from '@/server/infra/databases/prisma/connection';
import { TechRepository } from '@/server/infra/repositories/tech';
import { nextJsAdapter } from '@/server/presentation/http/adapter/next-js-adapter';

import { GetTechUseCase } from '@/server/app/use-cases/techs/implements/get';
import { GetTechController } from '@/server/presentation/http/controllers/tech/get';

import { UpdateTechUseCase } from '@/server/app/use-cases/techs/implements/update';
import { UpdateTechController } from '@/server/presentation/http/controllers/tech/update';

import { DeleteTechUseCase } from '@/server/app/use-cases/techs/implements/delete';
import { DeleteTechController } from '@/server/presentation/http/controllers/tech/delete';

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

export async function DELETE(request: NextRequest, params: HTTPParams) {
	const useCase = new DeleteTechUseCase(new TechRepository(prisma));

	return await nextJsAdapter(new DeleteTechController(useCase))(
		request,
		params
	);
}
