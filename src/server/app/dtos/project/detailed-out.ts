import type { ITechOutDTO } from '../tech/out';

import { ProjectEntity } from '@/server/domain/entities/project';
import { TechOutDTO } from '../tech/out';

export interface IProjectOutDTO {
	id: string;
	title: string;
	short_description: string;
	description: string;
	cover_url: string;
	techs: ITechOutDTO[];
	main_links: {
		id: string;
		url: string;
		type: 'FEEDBACK' | 'LIVE_PRODUCTION';
	}[];
	other_links?: {
		id: string;
		title: string;
		url: string;
		order: number;
	}[];
}

export const ProjectOutDTO = (project: ProjectEntity): IProjectOutDTO => ({
	id: project.id!,
	title: project.title,
	short_description: project.short_description,
	description: project.description,
	cover_url: project.coverUrl,
	techs: project.techs.map(TechOutDTO),
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
});
