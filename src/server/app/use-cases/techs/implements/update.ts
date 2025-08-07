import type { ITechPayloadDTO } from '@/server/app/dtos/tech/create';
import type { ITechOutDTO } from '@/server/app/dtos/tech/out';
import type { ITechRepository } from '@/server/app/repositories/tech';
import type { IUpdateTechUseCase } from '../update';

import { TechOutDTO } from '@/server/app/dtos/tech/out';
import { TechUseCaseErrors } from '@/server/app/errors/use-cases/tech';

export class UpdateTechUseCase implements IUpdateTechUseCase {
	constructor(private readonly techRepository: ITechRepository) {}

	async execute(techId: string, data: ITechPayloadDTO): Promise<ITechOutDTO> {
		const tech = await this.techRepository.getTech({ id: techId });

		if (!tech) {
			throw new TechUseCaseErrors.NotFound();
		}

		const existingTechName = await this.techRepository.getDuplicateTech(
			{ name: data.name, logoUrl: data.logo_url },
			techId
		);

		if (existingTechName) {
			if (existingTechName.some((tech) => tech.name === data.name)) {
				throw new TechUseCaseErrors.UniqueField('name');
			}

			if (existingTechName.some((tech) => tech.logoUrl === data.logo_url)) {
				throw new TechUseCaseErrors.UniqueField('logo_url');
			}
		}

		tech.name = data.name;
		tech.logoUrl = data.logo_url;

		const updatedTech = await this.techRepository.updateTech(tech);

		return TechOutDTO(updatedTech);
	}
}
