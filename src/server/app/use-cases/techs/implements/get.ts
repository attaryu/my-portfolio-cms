import type { ITechOut } from '@/server/app/dtos/tech/out';
import type { ITechRepository } from '@/server/app/repositories/tech';
import type { IGetTechUseCase } from '../get';

import { TechUseCaseErrors } from '@/server/app/errors/use-cases/tech';

export class GetTechUseCase implements IGetTechUseCase {
	constructor(private readonly techRepository: ITechRepository) {}

	async execute(techId: string): Promise<ITechOut> {
		const tech = await this.techRepository.getTech({ id: techId });

		if (!tech) {
			throw new TechUseCaseErrors.NotFound();
		}

		return {
			id: tech.id!,
			name: tech.name,
			logo_url: tech.logoUrl,
			created_at: tech.createdAt!.toISOString(),
			updated_at: tech.updatedAt!.toISOString(),
		};
	}
}
