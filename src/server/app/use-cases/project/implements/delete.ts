import type { IProjectRepository } from '@/server/app/repositories/project';
import type { IDeleteProjectUseCase } from '../delete';

import { ProjectUseCaseErrors } from '@/server/app/errors/use-cases/project';

export class DeleteProjectUseCase implements IDeleteProjectUseCase {
	constructor(private readonly projectRepository: IProjectRepository) {}

	async execute(id: string): Promise<void> {
		const project = await this.projectRepository.getProjectById(id);

		if (!project) {
			throw new ProjectUseCaseErrors.NotFound();
		}

		const topProjectIds = await this.projectRepository
			.getProjects()
			.then((project) => project.map(({ id }) => id));

		if (topProjectIds.some((topId) => topId === id)) {
			throw new ProjectUseCaseErrors.TopProjectDeleteStrict('single');
		}

		await this.projectRepository.deleteMany([id]);
	}
}
