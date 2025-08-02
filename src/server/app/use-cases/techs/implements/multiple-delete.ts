import type { ITechRepository } from '@/server/app/repositories/tech';
import type { IMultipleDeleteTechsUseCase } from '../multiple-delete';

import { TechUseCaseErrors } from '@/server/app/errors/use-cases/tech';

export class MultipleDeleteTechsUseCase implements IMultipleDeleteTechsUseCase {
	constructor(private readonly techRepository: ITechRepository) {}

	async execute(ids: string[]): Promise<void> {
		const reduceIds = ids.reduce(
			(a, b) => (a.includes(b) ? a : [...a, b]),
			[] as string[]
		);

		const techs = await this.techRepository.getTechs({ ids: reduceIds });

		if (techs.length !== reduceIds.length) {
			throw new TechUseCaseErrors.SomeIdsNotFound();
		}

		await this.techRepository.deleteMany(reduceIds);
	}
}
