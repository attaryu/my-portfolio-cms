import type { IProjectRepository } from '@/server/app/repositories/project';
import type { IClearTopProjectUseCase } from '../clear-top-project';

export class ClearTopProjectUseCase implements IClearTopProjectUseCase {
	constructor(private readonly projectRepository: IProjectRepository) {}

	async execute(): Promise<void> {
		await this.projectRepository.clearTopProjects();
	}
}
