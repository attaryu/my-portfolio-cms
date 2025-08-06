import type { ICreateProjectDTO } from '@/server/app/dtos/project/create';
import type { IProjectOutDTO } from '@/server/app/dtos/project/out';
import type { IProjectRepository } from '@/server/app/repositories/project';
import type { ITechRepository } from '@/server/app/repositories/tech';
import type { ICreateProjectUseCase } from '../create';

import { TechUseCaseErrors } from '@/server/app/errors/use-cases/tech';
import { ProjectEntity } from '@/server/domain/entities/project';

export class CreateProjectUseCase implements ICreateProjectUseCase {
	constructor(
		private projectRepository: IProjectRepository,
		private techRepository: ITechRepository
	) {}

	async execute(newProject: ICreateProjectDTO): Promise<IProjectOutDTO> {
		// check tech ids
		const techs = await this.techRepository.getTechs({ ids: newProject.techs });

		if (techs.length !== newProject.techs.length) {
			throw new TechUseCaseErrors.NotFound('Some techs not found');
		}

		// transform project data to acceptable format with project entity
		const projectEntity = ProjectEntity.create(
			newProject.title,
			newProject.short_description,
			newProject.description,
			newProject.cover_url,
			techs,
			newProject.main_links,
			newProject.other_links
		);

		// save project to database
		const project = await this.projectRepository.createProject(projectEntity);

		return {
			id: project.id!,
			title: project.title,
			short_description: project.short_description,
			description: project.description,
			cover_url: project.coverUrl,
			techs: project.techs.map((tech) => ({
				id: tech.id!,
				name: tech.name,
				logo_url: tech.logoUrl,
				created_at: tech.createdAt!.toISOString(),
				updated_at: tech.updatedAt!.toISOString(),
			})),
			main_links: project.mainLinks.map((link) => ({
				id: link.id!,
				url: link.url,
				type: link.type,
			})),
			other_links: project.otherLinks?.map((link) => ({
				id: link.id!,
				title: link.title,
				url: link.url,
				order: link.order,
			})),
		};
	}
}
