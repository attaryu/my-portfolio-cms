import type { ITechCreate } from '@/server/app/dtos/tech/create';
import type { ITechOut } from '@/server/app/dtos/tech/out';
import type { ITechRepository } from '@/server/app/repositories/tech';
import type { IUpdateTechUseCase } from '../update';

import { TechUseCaseErrors } from '@/server/app/errors/use-cases/tech';

export class UpdateTechUseCase implements IUpdateTechUseCase {
	constructor(private readonly techRepository: ITechRepository) {}

	async execute(techId: string, data: ITechCreate): Promise<ITechOut> {
		const existingTechName = await this.techRepository.getDuplicateTech(
			techId,
			{ name: data.name, logoUrl: data.logo_url }
		);

		if (existingTechName) {
			if (existingTechName.some((tech) => tech.name === data.name)) {
				throw new TechUseCaseErrors.UniqueField('name');
			}

			if (existingTechName.some((tech) => tech.logoUrl === data.logo_url)) {
				throw new TechUseCaseErrors.UniqueField('logo_url');
			}
		}

		const tech = await this.techRepository.getTech({ id: techId });

		if (!tech) {
			throw new TechUseCaseErrors.NotFound();
		}

		tech.name = data.name;
		tech.logoUrl = data.logo_url;

		const updatedTech = await this.techRepository.updateTech(tech);

		return {
			id: updatedTech.id!,
			name: updatedTech.name,
			logo_url: updatedTech.logoUrl,
			created_at: updatedTech.createdAt?.toISOString() || '',
			updated_at: updatedTech.updatedAt?.toISOString() || '',
		};
	}
}
