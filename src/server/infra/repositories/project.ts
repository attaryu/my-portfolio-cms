import type { IProjectRepository } from '@/server/app/repositories/project';
import type { $Enums, PrismaClient } from '../databases/prisma/generated';

import { IQuery } from '@/server/app/dtos/query';
import { ProjectEntity } from '@/server/domain/entities/project';
import { TechEntity } from '@/server/domain/entities/tech';
import { MainLink } from '@/server/domain/value-objects/main-link';
import { OtherLink } from '@/server/domain/value-objects/other-link';

type IMapper = {
	id: string;
	title: string;
	short_description: string;
	cover_url: string;
	created_at: Date;
	updated_at: Date;
	description?: string;
	techs?: {
		tech: {
			id: string;
			created_at: Date;
			updated_at: Date;
			name: string;
			logo_url: string;
		};
	}[];
	main_link?: {
		id: string;
		url: string;
		type: $Enums.LinkType;
	}[];
	other_links?: {
		id: string;
		title: string;
		url: string;
		domain: string;
		order: number;
	}[];
};

export class ProjectRepository implements IProjectRepository {
	private readonly detailedSelect = {
		id: true,
		title: true,
		short_description: true,
		description: true,
		cover_url: true,
		created_at: true,
		updated_at: true,
		techs: {
			select: {
				tech: {
					select: {
						id: true,
						name: true,
						logo_url: true,
						created_at: true,
						updated_at: true,
					},
				},
			},
		},
		main_link: {
			select: {
				id: true,
				type: true,
				url: true,
			},
		},
		other_links: {
			select: {
				id: true,
				title: true,
				url: true,
				domain: true,
				order: true,
			},
			orderBy: { order: 'asc' as const },
		},
	};

	constructor(private readonly prisma: PrismaClient) {}

	async createProject(project: ProjectEntity): Promise<ProjectEntity> {
		const createdProject = await this.prisma.project.create({
			data: {
				id: project.id,
				title: project.title,
				short_description: project.short_description,
				description: project.description!,
				cover_url: project.coverUrl,
				techs: {
					createMany: {
						data: project.techs!.map((tech) => ({ tech_id: tech.id! })),
					},
				},
				main_link: {
					createMany: {
						data: project.mainLinks.map((link) => ({
							type: link.type as $Enums.LinkType,
							url: link.url,
						})),
					},
				},
				other_links: {
					createMany: {
						data:
							project.otherLinks?.map((link) => ({
								title: link.title,
								url: link.url,
								domain: link.domain!,
								order: link.order,
							})) ?? [],
					},
				},
			},
			select: this.detailedSelect,
		});

		return this.mapper(createdProject);
	}

	async getProjectById(projectId: string): Promise<ProjectEntity | null> {
		const project = await this.prisma.project.findUnique({
			where: { id: projectId },
			select: this.detailedSelect,
		});

		return project ? this.mapper(project) : null;
	}

	async getRowCount(query?: IQuery): Promise<number> {
		return await this.prisma.project.count(this.queryBuilder(query));
	}

	async getProjects(query?: IQuery): Promise<ProjectEntity[]> {
		const projects = await this.prisma.project.findMany({
			...this.queryBuilder(query),
			select: {
				id: true,
				title: true,
				short_description: true,
				cover_url: true,
				created_at: true,
				updated_at: true,
			},
		});

		return projects.map((project) => this.mapper(project));
	}

	async updateProject(project: ProjectEntity): Promise<ProjectEntity> {
		const updatedProject = await this.prisma.project.update({
			where: { id: project.id },
			data: {
				id: project.id,
				title: project.title,
				short_description: project.short_description,
				description: project.description!,
				cover_url: project.coverUrl,
				techs: {
					deleteMany: { project_id: project.id },
					createMany: {
						data: project.techs!.map((tech) => ({ tech_id: tech.id! })),
					},
				},
				main_link: {
					deleteMany: { project_id: project.id },
					createMany: {
						data: project.mainLinks.map((link) => ({
							type: link.type as $Enums.LinkType,
							url: link.url,
						})),
					},
				},
				other_links: {
					deleteMany: { project_id: project.id },
					createMany: {
						data:
							project.otherLinks?.map((link) => ({
								title: link.title,
								url: link.url,
								domain: link.domain!,
								order: link.order,
							})) ?? [],
					},
				},
			},
			select: this.detailedSelect,
		});

		return this.mapper(updatedProject);
	}

	private queryBuilder(query?: IQuery) {
		return {
			skip: query?.skip,
			take: query?.limit,
			where: {
				...(query?.search ? { name: { contains: query?.search } } : undefined),
				...(query?.ids ? { id: { in: query.ids } } : undefined),
			},
			orderBy: {
				[query?.orderBy ?? 'updated_at']: query?.sort ?? 'desc',
			},
		};
	}

	private mapper(project: IMapper): ProjectEntity {
		return new ProjectEntity(
			project.id,
			project.title,
			project.short_description,
			project.cover_url,
			project.description,
			project.techs?.map(
				({ tech }) =>
					new TechEntity(
						tech.id,
						tech.name,
						tech.logo_url,
						tech.created_at,
						tech.updated_at
					)
			),
			project.main_link?.map(
				(link) => new MainLink(link.id, link.url, link.type)
			),
			project.other_links?.map(
				(link) =>
					new OtherLink(link.id, link.title, link.url, link.domain, link.order)
			),
			project.created_at,
			project.updated_at
		);
	}
}
