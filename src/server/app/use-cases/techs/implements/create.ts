import type { ITechCreate } from '@/server/app/dtos/tech/create';
import type { ITechOut } from '@/server/app/dtos/tech/out';
import type { ITechRepository } from '@/server/app/repositories/tech';
import type { ICreateTechUseCase } from '../create';

import { TechUseCaseErrors } from '@/server/app/errors/use-cases/tech';
import { TechEntity } from '@/server/domain/entities/tech';

export class CreateTechUseCase implements ICreateTechUseCase {
	constructor(private readonly techRepository: ITechRepository) {}

	async execute(data: ITechCreate): Promise<ITechOut> {
		const existingTechName = await this.techRepository.getTech({
			name: data.name,
		});

		if (existingTechName) {
			throw new TechUseCaseErrors.TechNameAlreadyExists();
		}

		const existingTechLogoUrl = await this.techRepository.getTech({
			logoUrl: data.logo_url,
		});

		if (existingTechLogoUrl) {
			throw new TechUseCaseErrors.TechLogoUrlAlreadyExists();
		}

		const newTech = TechEntity.create({
			name: data.name,
			logoUrl: data.logo_url,
		});

		const createdTech = await this.techRepository.createTech(newTech);

		return {
			id: createdTech.id!,
			name: createdTech.name,
			logo_url: createdTech.logoUrl,
			created_at: createdTech.createdAt!.toISOString(),
			updated_at: createdTech.updatedAt!.toISOString(),
		};
	}
}
