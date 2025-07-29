import { ProjectEntity } from '@/server/domain/entities/project';

export interface IProjectRepository {
	createProject(project: ProjectEntity): Promise<string>;
}
