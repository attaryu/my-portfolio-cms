import type { IProjectRepository } from '@/server/app/repositories/project';
import type { IMultipleDeleteProjectsUseCase } from '../multiple-delete';

import { ProjectUseCaseErrors } from '@/server/app/errors/use-cases/project';

export class MultipleDeleteProjectsUseCase
	implements IMultipleDeleteProjectsUseCase
{
	constructor(private readonly projectRepository: IProjectRepository) {}

	async execute(projectIds: string[]): Promise<void> {
		const reduceIds = projectIds.reduce(
			(a, b) => (a.includes(b) ? a : [...a, b]),
			[] as string[]
		);

		const projects = await this.projectRepository.getProjects({
			ids: reduceIds,
		});

		if (projects.length !== reduceIds.length) {
			throw new ProjectUseCaseErrors.SomeIdsNotFound();
		}

		await this.projectRepository.deleteMany(reduceIds);
	}
}
