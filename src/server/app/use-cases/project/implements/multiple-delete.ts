import type { IProjectRepository } from '@/server/app/repositories/project';
import type { IMultipleDeleteProjectsUseCase } from '../multiple-delete';

import { ProjectUseCaseErrors } from '@/server/app/errors/use-cases/project';

export class MultipleDeleteProjectsUseCase
	implements IMultipleDeleteProjectsUseCase
{
	constructor(private readonly projectRepository: IProjectRepository) {}

	async execute(projectIds: string[]): Promise<void> {
		const projects = await this.projectRepository.getProjects({
			ids: projectIds,
		});

		if (projects.length !== projectIds.length) {
			throw new ProjectUseCaseErrors.SomeIdsNotFound();
		}

		const topProjectIds = await this.projectRepository
			.getProjects()
			.then((project) => project.map(({ id }) => id));

		if (projectIds.some((id) => topProjectIds.includes(id))) {
			throw new ProjectUseCaseErrors.TopProjectDeleteStrict('multiple');
		}

		await this.projectRepository.deleteMany(projectIds);
	}
}
