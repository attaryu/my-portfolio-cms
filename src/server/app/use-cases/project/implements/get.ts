import type { IProjectDetailedOutDTO } from '@/server/app/dtos/project/detailed-out';
import type { IProjectRepository } from '@/server/app/repositories/project';
import type { IGetProjectUseCase } from '../get';

import { ProjectDetailedOutDTO } from '@/server/app/dtos/project/detailed-out';
import { ProjectUseCaseErrors } from '@/server/app/errors/use-cases/project';

export class GetProjectUseCase implements IGetProjectUseCase {
	constructor(private projectRepository: IProjectRepository) {}

	async execute(projectId: string): Promise<IProjectDetailedOutDTO> {
		const project = await this.projectRepository.getProjectById(projectId);

		if (!project) {
			throw new ProjectUseCaseErrors.NotFound();
		}

		return ProjectDetailedOutDTO(project);
	}
}
