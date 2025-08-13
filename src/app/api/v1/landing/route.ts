import type { NextRequest } from 'next/server';

import { GetLandingUseCase } from '@/server/app/use-cases/landing/implements/get';

import { LandingRepository } from '@/server/infra/repositories/landing';

import { nextJsAdapter } from '@/server/presentation/http/adapter/next-js-adapter';
import { GetLandingController } from '@/server/presentation/http/controllers/landing/get';

import { prisma } from '@/server/infra/databases/prisma/connection';

export async function GET(request: NextRequest) {
	const useCase = new GetLandingUseCase(new LandingRepository(prisma));
	return await nextJsAdapter(new GetLandingController(useCase))(request);
}
