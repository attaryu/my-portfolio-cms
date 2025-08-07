import type { IProjectPayloadDTO } from '@/server/app/dtos/project/create';
import type { IProjectDetailedOutDTO } from '@/server/app/dtos/project/detailed-out';
import type { IProjectRepository } from '@/server/app/repositories/project';
import type { ITechRepository } from '@/server/app/repositories/tech';
import type { IUpdateProjectUseCase } from '../update';

import { ProjectDetailedOutDTO } from '@/server/app/dtos/project/detailed-out';
import { ProjectUseCaseErrors } from '@/server/app/errors/use-cases/project';
import { TechUseCaseErrors } from '@/server/app/errors/use-cases/tech';

export class UpdateProjectUseCase implements IUpdateProjectUseCase {
	constructor(
		private readonly projectRepository: IProjectRepository,
		private readonly techRepository: ITechRepository
	) {}

	async execute(
		projectId: string,
		data: IProjectPayloadDTO
	): Promise<IProjectDetailedOutDTO> {
		const project = await this.projectRepository.getProjectById(projectId);

		if (!project) {
			throw new ProjectUseCaseErrors.NotFound();
		}

		const techs = await this.techRepository.getTechs({ ids: data.techs });

		if (techs.length !== data.techs.length) {
			throw new TechUseCaseErrors.NotFound('Some techs not found');
		}

		project.title = data.title;
		project.shortDescription = data.short_description;
		project.description = data.description;
		project.coverUrl = data.cover_url;
		project.mainLinks = data.main_links;
		project.otherLinks = data.other_links;
		project.techs = techs;

		const updatedProject = await this.projectRepository.updateProject(project);

		return ProjectDetailedOutDTO(updatedProject);
	}
}
