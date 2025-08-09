import type { ITechOutDTO } from '../tech/out';

import { ProjectEntity } from '@/server/domain/entities/project';
import { TechOutDTO } from '../tech/out';
import { IMainLink } from '@/server/domain/value-objects/main-link';

export interface IProjectDetailedOutDTO {
	id: string;
	title: string;
	short_description: string;
	description: string;
	cover_url: string;
	techs: ITechOutDTO[];
	created_at: string;
	updated_at: string;
	main_links: {
		id: string;
		url: string;
		type: IMainLink['type'];
	}[];
	other_links: {
		id: string;
		title: string;
		url: string;
		order: number;
	}[];
}

export const ProjectDetailedOutDTO = (
	project: ProjectEntity
): IProjectDetailedOutDTO => ({
	id: project.id!,
	title: project.title,
	short_description: project.short_description,
	cover_url: project.coverUrl,
	description: project.description!,
	techs: project.techs!.map(TechOutDTO),
	created_at: project.createdAt!.toISOString(),
	updated_at: project.updatedAt!.toISOString(),
	main_links: project.mainLinks!.map((link) => ({
		id: link.id!,
		url: link.url,
		type: link.type as IMainLink['type'],
	})),
	other_links: project.otherLinks!.map((link) => ({
		id: link.id!,
		title: link.title,
		url: link.url,
		order: link.order,
	})),
});
