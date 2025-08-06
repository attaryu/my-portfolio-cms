import type { IProjectOutDTO } from '@/server/app/dtos/project/out';
import type { IProjectRepository } from '@/server/app/repositories/project';
import type { IGetProjectUseCase } from '../get';

import { ProjectOutDTO } from '@/server/app/dtos/project/out';
import { ProjectUseCaseErrors } from '@/server/app/errors/use-cases/project';

export class GetProjectUseCase implements IGetProjectUseCase {
	constructor(private projectRepository: IProjectRepository) {}

	async execute(projectId: string): Promise<IProjectOutDTO> {
		const project = await this.projectRepository.getProjectById(projectId);

		if (!project) {
			throw new ProjectUseCaseErrors.NotFound();
		}

		return ProjectOutDTO(project);
	}
}
