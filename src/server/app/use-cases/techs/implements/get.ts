import type { ITechOutDTO } from '@/server/app/dtos/tech/out';
import type { ITechRepository } from '@/server/app/repositories/tech';
import type { IGetTechUseCase } from '../get';

import { TechOutDTO } from '@/server/app/dtos/tech/out';
import { TechUseCaseErrors } from '@/server/app/errors/use-cases/tech';

export class GetTechUseCase implements IGetTechUseCase {
	constructor(private readonly techRepository: ITechRepository) {}

	async execute(techId: string): Promise<ITechOutDTO> {
		const tech = await this.techRepository.getTech({ id: techId });

		if (!tech) {
			throw new TechUseCaseErrors.NotFound();
		}

		return TechOutDTO(tech);
	}
}
