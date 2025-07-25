import type { ITechRepository } from '@/server/app/repositories/tech';
import type { IMultipleDeleteTechsUseCase } from '../multiple-delete';

export class MultipleDeleteTechsUseCase implements IMultipleDeleteTechsUseCase {
	constructor(private readonly techRepository: ITechRepository) {}

	async execute(ids: string[]): Promise<void> {
		await this.techRepository.deleteMany(ids);
	}
}
