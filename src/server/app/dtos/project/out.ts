import { ProjectEntity } from '@/server/domain/entities/project';

export interface IProjectOutDTO {
	id: string;
	title: string;
	short_description: string;
	cover_url: string;
	created_at: string;
	updated_at: string;
}

export const ProjectOutDTO = (project: ProjectEntity): IProjectOutDTO => ({
	id: project.id!,
	title: project.title,
	short_description: project.short_description,
	cover_url: project.coverUrl,
	created_at: project.createdAt!.toISOString(),
	updated_at: project.updatedAt!.toISOString(),
});
