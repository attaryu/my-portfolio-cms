import type { ITechRepository } from '@/server/app/repositories/tech';
import type { IDeleteTechUseCase } from '../delete';

import { TechUseCaseErrors } from '@/server/app/errors/use-cases/tech';

export class DeleteTechUseCase implements IDeleteTechUseCase {
	constructor(private readonly techRepository: ITechRepository) {}

	async execute(id: string): Promise<void> {
		const tech = await this.techRepository.getTech({ id });

		if (!tech) {
			throw new TechUseCaseErrors.NotFound();
		}

		await this.techRepository.deleteMany([id]);
	}
}
