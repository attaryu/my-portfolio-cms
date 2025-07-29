import type { IProjectRepository } from '@/server/app/repositories/project';
import type { PrismaClient } from '../databases/prisma/generated';

import { ProjectEntity } from '@/server/domain/entities/project';

export class ProjectRepository implements IProjectRepository {
	constructor(private readonly prisma: PrismaClient) {}

	async createProject(project: ProjectEntity): Promise<string> {
		const createdProject = await this.prisma.project.create({
			data: {
				id: project.id,
				title: project.title,
				short_description: project.short_description,
				description: project.description,
				cover_url: project.coverUrl,
				techs: {
					createMany: {
						data: project.techs.map(({ id }) => ({ tech_id: id! })),
					},
				},
				main_link: {
					createMany: {
						data: project.mainLinks.map((link) => ({
							type: link.type,
							url: link.url,
						})),
					},
				},
				...(project.otherLinks
					? {
							other_links: {
								createMany: {
									data: project.otherLinks.map((link) => ({
										title: link.title,
										url: link.url,
										domain: link.domain,
										order: link.order,
									})),
								},
							},
					  }
					: undefined),
			},
		});

		return createdProject.id;
	}
}
