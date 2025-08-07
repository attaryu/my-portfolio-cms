import type { ITechPayloadDTO } from '@/server/app/dtos/tech/create';
import type { ITechOutDTO } from '@/server/app/dtos/tech/out';
import type { ITechRepository } from '@/server/app/repositories/tech';
import type { ICreateTechUseCase } from '../create';

import { TechOutDTO } from '@/server/app/dtos/tech/out';
import { TechUseCaseErrors } from '@/server/app/errors/use-cases/tech';
import { TechEntity } from '@/server/domain/entities/tech';

export class CreateTechUseCase implements ICreateTechUseCase {
	constructor(private readonly techRepository: ITechRepository) {}

	async execute(data: ITechPayloadDTO): Promise<ITechOutDTO> {
		const existingTechs = await this.techRepository.getDuplicateTech({
			name: data.name,
			logoUrl: data.logo_url,
		});

		if (existingTechs) {
			if (existingTechs.some((tech) => tech.name === data.name)) {
				throw new TechUseCaseErrors.UniqueField('name');
			}

			if (existingTechs.some((tech) => tech.logoUrl === data.logo_url)) {
				throw new TechUseCaseErrors.UniqueField('logo_url');
			}
		}

		const newTech = TechEntity.create({
			name: data.name,
			logoUrl: data.logo_url,
		});

		const createdTech = await this.techRepository.createTech(newTech);

		return TechOutDTO(createdTech);
	}
}
