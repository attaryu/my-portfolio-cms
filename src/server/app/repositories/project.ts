import { ProjectEntity } from '@/server/domain/entities/project';

export interface IProjectRepository {
	createProject(project: ProjectEntity): Promise<ProjectEntity>;
	getProjectById(projectId: string): Promise<ProjectEntity | null>;
}
