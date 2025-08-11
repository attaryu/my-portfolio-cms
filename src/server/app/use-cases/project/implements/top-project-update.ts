import type { IUpdateTopProjectsDTO } from '@/server/app/dtos/project/top-project-update';
import type { IOwnerRepository } from '@/server/app/repositories/owner';
import type { IProjectRepository } from '@/server/app/repositories/project';
import type { ITopProjectUpdateUseCase } from '../top-project-update';

import { OwnerUseCaseErrors } from '@/server/app/errors/use-cases/owner';
import { ProjectUseCaseErrors } from '@/server/app/errors/use-cases/project';

export class TopProjectUpdateUseCase implements ITopProjectUpdateUseCase {
	constructor(
		private readonly projectRepository: IProjectRepository,
		private readonly ownerRepository: IOwnerRepository
	) {}

	async execute(topProjectEntries: IUpdateTopProjectsDTO): Promise<void> {
		const projects = await this.projectRepository.getProjects({
			ids: topProjectEntries.projects.map((project) => project.id),
		});

		if (projects.length !== topProjectEntries.projects.length) {
			throw new ProjectUseCaseErrors.SomeIdsNotFound();
		}

		const owner = await this.ownerRepository.getOwnerPublicInfo();

		if (!owner) {
			throw new OwnerUseCaseErrors.NotFound();
		}

		await this.projectRepository.updateTopProjects(owner.id, topProjectEntries);
	}
}
